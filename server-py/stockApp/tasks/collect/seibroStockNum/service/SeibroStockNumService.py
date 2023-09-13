from datetime import date, datetime
import time
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.by import By
from dataSource.seleniumWebDriver import getConnection
import polars as pl
from lxml import etree
import pandas as pd
from tenacity import retry, stop_after_attempt, wait_fixed
from dataSource.mongoClient import getDBAddress, getClient, getCollection
from tasks.utils.parseUtils.codeUtil import isPreferedStock

def getAllStocks():
    collection = getCollection("collectService_krxMarcap")
    pipe = [{
        "$group": {
            "_id": { "종목코드": "$종목코드", "종목명": "$종목명" },
            "count": { "$sum": 1 }
        }
    }, {
        "$match": {
            "count": { "$gt": 1 }
        }
    },
    {
        "$project": {
        "_id": 0,
            "종목코드": "$_id.종목코드",
            "종목명": "$_id.종목명"
        }
    }]
    return collection.aggregate(pipe)

@retry(stop=stop_after_attempt(1), wait=wait_fixed(1), reraise=True) # 1초 간격으로 3번 재시도
def crawlingOne(startDate, endDate, code, name):
    driver = None
    try:
        time.sleep(0.5)
        driver = getConnection("seibroStockNum")
        driver.get("https://seibro.or.kr/websquare/control.jsp?w2xPath=/IPORTAL/user/company/BIP_CNTS01012V.xml&menuNo=53#")
        WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.element_to_be_clickable((By.ID, "INPUT_SN2")))
        driver.execute_script(f'$("#INPUT_SN2").val("{code}")')
        driver.execute_script('$("#comN_image1").click()')
        WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.invisibility_of_element((By.ID, "___processbar2")))
        WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.visibility_of_element_located((By.ID, "iframe1")))
        driver.switch_to.frame("iframe1")
        WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.presence_of_element_located((By.ID, "P_isinList_none")))
        time.sleep(1)
        isNone = driver.execute_script("return document.getElementById('P_isinList_none').style.display == 'none'")
        if not isNone:
            return 0
        WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.element_to_be_clickable((By.ID, "P_isinList_0_P_ISIN_ROW")))
        driver.execute_script('document.getElementById("P_isinList_0_P_ISIN_ROW").click()')
        driver.switch_to.default_content()
        driver.execute_script(f'$("#sd1_inputCalendar1_input").val("{startDate}")')
        driver.execute_script(f'$("#sd1_inputCalendar2_input").val("{endDate}")')
        driver.execute_script('$("#image12").click()')
        time.sleep(1)
        beforePage = driver.execute_script('return $(".w2pageList_label_selected").text()')
        if beforePage is None or beforePage == "":
            return 0
        while True:
            driver.execute_script(f"$(\"*[alt='마지막 페이지'],*[alt='last page']\").click()")
            WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.invisibility_of_element((By.ID, "___processbar2")))
            lastPage = driver.execute_script('return $(".w2pageList_label_selected").text()')
            if beforePage == lastPage:
                break
            beforePage = lastPage
        if lastPage == "":
            return None
        lastPage = int(lastPage)
        print(f"allPage size:{str(lastPage)}")
        WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.invisibility_of_element((By.ID, "___processbar2")))
        while True:
            currentPage = driver.execute_script('return $(".w2pageList_label_selected").text()')
            currentPage = int(currentPage)
            time.sleep(0.5)
            data = parseData(driver, code, name)
            if currentPage == lastPage:
                if len(data) != 0:
                    insertData(data)
                else:
                    lastPage = lastPage - 1
            else:
                insertData(data)
            if currentPage == 1:
                break
            driver.execute_script(f"$(\"*[alt='이전 페이지'],*[alt='previous page']\").click()")
            WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.invisibility_of_element((By.ID, "___processbar2")))
            nextPage = driver.execute_script('return $(".w2pageList_label_selected").text()')
            nextPage = int(nextPage)
            if currentPage - 1 != nextPage:
                raise Exception("page error")
        return lastPage
    finally:
        if driver != None:
            driver.quit()
        print("end")

def parseData(driver: WebDriver, code: str, name: str):
    html = driver.execute_script('return $("#grid1_body_table")[0].outerHTML')
    dfPd: pd.DataFrame = pd.read_html(html)[0]
    dfPd["종목코드"] = code
    dfPd["종목명"] = name
    dfPd["createAt"] = datetime.today()
    df = pl.from_pandas(dfPd)
    filter = "보통주"
    if isPreferedStock(name):
        filter = "우선주"
    df = df.filter(pl.col("주식종류") == filter)
    return df.to_dicts()

def insertData(data):
    collection = getCollection("collectService_seibroStockNum")
    collection.insert_many(data)
    print(data)