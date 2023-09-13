

from dataSource.seleniumWebDriver import getConnection
import tasks.utils.fileUtils.fileUtils as fileUtils
from datetime import datetime, timedelta
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
import uuid
import time
from pathlib import Path
from tenacity import retry, stop_after_attempt, wait_fixed
import polars as pl
from dataSource.mongoClient import getDBAddress, getClient, getCollection

downloadDirPath = Path(fileUtils.resolveBaseDir("../webdriver/downloads"))
EXCEPTION_FILE_ALREADY_EXISTS = "file already exists"
EXCEPTION_TIMEOUT = "timeout"

def clearDownloadDir():
    fileUtils.removeDirTree(downloadDirPath.as_posix())
    fileUtils.createDir(downloadDirPath.as_posix())

def clearDownloadOneDir(path):
    fileUtils.removeDirTree(downloadDirPath.joinpath(path).as_posix())

def deleteDuplicateData():
    collection = getCollection("collectService_krxMarcap")
    data = collection.aggregate([
    {
        "$group": {
            "_id": {
                "종목코드": "$종목코드",
                "date": "$date"
            },
            "dups": {
                "$addToSet": "$_id"
            },
            "count": {
                "$sum": 1
            }
        }
    },
    {
        "$match": {
            "count": {
                "$gt": 1
            }
        }
    }], allowDiskUse=True )
    li = list(data)
    print("size:" + str(li))
    for one in li:
        one["dups"].pop(0)
        collection.delete_many({"_id": {"$in": one["dups"]}})

def getDownloadFileInfo(driver: WebDriver, dirName: str):
    driver.get(f"file:///home/seluser/Downloads/{dirName}")
    downloadFiles = driver.execute_script(f"return Array.prototype.slice.call(document.querySelectorAll('.icon.file')).map(v=>'/usr/src/downloads/{dirName}/'+v.text)")
    downloadFiles = list(filter(lambda x: x.endswith(".csv"), downloadFiles))
    return {"files": downloadFiles, "count":len(downloadFiles)}

def addCrawlingData(path: Path, date: datetime, market: str):
    path = downloadDirPath.joinpath(path)
    df = pl.read_csv(path, dtypes={"종목코드": pl.Categorical})
    df = df.with_columns(date=pl.lit(date), market=pl.lit(market))
    df["createAt"] = datetime.today()
    result = df.to_dicts()
    collection = getCollection("collectService_krxMarcap")
    return collection.insert_many(result)

def countKrxMarcapData():
    collection = getCollection("collectService_krxMarcap")
    count = collection.count_documents({})
    collection = getCollection("counts")
    collection.update_one({"_id": "collectService_krxMarcap"}, {"$set": {"count": count}}, upsert=True)
    return count

def makeDirName(market: str, date: datetime):
    return str("krxMarcap_"+market + "_" +date.strftime("%Y%m%d"))

@retry(stop=stop_after_attempt(3), wait=wait_fixed(1), reraise=True) # 1초 간격으로 3번 재시도
def downloadOneFile(date: datetime, market: str):
    filePath = ""
    driver = None
    dirName = makeDirName(market, date)
    dirPath = downloadDirPath.joinpath(dirName)
    dirPathStr = dirPath.as_posix()
    try:
        if(fileUtils.existDir(dirPathStr)):
            raise Exception(EXCEPTION_FILE_ALREADY_EXISTS)
        fileUtils.createDir(dirPathStr)
        dateStr = date.strftime("%Y%m%d")
        driver: WebDriver = getConnection(dirName, True)
        beforeFilesLength = getDownloadFileInfo(driver, dirName)["count"]
        driver.get("http://data.krx.co.kr/contents/MDC/MDI/mdiLoader/index.cmd?menuId=MDC0201020101")
        try:
            alert = WebDriverWait(driver, timeout=3).until(EC.alert_is_present())
            alert.accept()
        except Exception as e:
            print("예외발생:"+str(e))
        WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "#mktId_0_1")))
        # pymitter
        before = driver.execute_script("return $('.CI-MDI-UNIT-TIME').text()")
        if market == "kospi":
            driver.execute_script('$("#mktId_0_1").click()')
        elif market == "kosdaq":
            driver.execute_script('$("#mktId_0_2").click()')
        elif market == "konex":
            driver.execute_script('$("#mktId_0_3").click()')
        #     driver.implicitly_wait(1)
        driver.execute_script(f'$("#trdDd")[0].value = "{dateStr}"')
        #     driver.implicitly_wait(1)
        driver.execute_script('$(".btn_component_search").click()')
        #     driver.implicitly_wait(1)
        after = before
        while before == after:
            after = driver.execute_script('return $(".CI-MDI-UNIT-TIME").text()')
            time.sleep(0.5)
        print("before:"+before)
        print("after:"+after)
        # time.sleep(3)
        WebDriverWait(driver, timeout=10, poll_frequency=1).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "*[class='CI-MDI-UNIT-DOWNLOAD']")))
        driver.execute_script("$('[class=\"CI-MDI-UNIT-DOWNLOAD\"]').click()")
        WebDriverWait(driver, timeout=10, poll_frequency=1).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "*[data-type='csv']")))
        driver.execute_script("$(\"[data-type='csv']\").click()")
        time.sleep(2)

        # queue: asyncio.Queue = asyncio.Queue(maxsize=1, loop=loop)
        isWaiting = True
        timeout = 0
        print(str(isWaiting))
        print(str(timeout))
        while isWaiting and timeout < 5:
            afterFilesInfo = getDownloadFileInfo(driver, dirName)
            afterFilesLength = afterFilesInfo["count"]
            afterFiles = afterFilesInfo["files"]
            print(f"timeout: {timeout} afterFileLength: {afterFilesLength}")
            if afterFilesLength > 0 and beforeFilesLength != afterFilesLength:
                p = readMarcapFile(afterFiles[0])
                filePath = dirName + "/" + p.name
                isWaiting = False
                break
            timeout = timeout + 1
            time.sleep(0.5)
        
        if isWaiting:
            raise Exception(EXCEPTION_TIMEOUT)
    except Exception as e:
        print("error:"+str(e))
        if str(e) != EXCEPTION_FILE_ALREADY_EXISTS and fileUtils.existDir(dirPathStr):
            fileUtils.removeDirTree(dirPathStr)
        raise e
    finally:
        if driver is not None:
            driver.quit()
    return filePath

def readMarcapFile(webdriverPath):
    path = Path(fileUtils.resolveBaseDir(webdriverPath.replace("/usr/src/downloads", "../webdriver/downloads")))
    lines = []
    with open(path, "r", encoding="euc-kr") as f:
        lines = f.readlines()
        print(lines)
    with open(path, 'w', encoding="utf-8") as f:
        f.writelines(lines)
    return path

