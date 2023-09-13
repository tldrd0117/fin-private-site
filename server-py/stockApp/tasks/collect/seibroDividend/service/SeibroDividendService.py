
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


@retry(stop=stop_after_attempt(3), wait=wait_fixed(1), reraise=True) # 1초 간격으로 3번 재시도
def crawlingOne(startDate, endDate, code = ""):
    driver = None
    try:
        time.sleep(0.5)
        driver = getConnection("seibroDividend")
        
        driver.get("https://seibro.or.kr/websquare/control.jsp?w2xPath=/IPORTAL/user/company/BIP_CNTS01041V.xml&menuNo=285")
        WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.element_to_be_clickable((By.ID, "Com_ISIN_input_0")))
        if code != "":
            driver.execute_script('$("#Com_ISIN_input_0").val("종목")')
            driver.execute_script(f'$("#INPUT_SN2").val("{code}")')
            driver.execute_script('$("#cc_image1").click()')
            WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.visibility_of_element_located((By.ID, "iframe1")))
            driver.switch_to.frame("iframe1")
            WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.presence_of_element_located((By.ID, "P_isinList_none")))
            time.sleep(1)
            isNone = driver.execute_script("return document.getElementById('P_isinList_none').style.display == 'none'")
            if not isNone:
                return None
            WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.element_to_be_clickable((By.ID, "P_isinList_0_P_ISIN_ROW")))
            driver.execute_script('document.getElementById("P_isinList_0_P_ISIN_ROW").click()')
            driver.switch_to.default_content()
        driver.execute_script(f'$("#inputCalendar1_input").val("{startDate}")')
        driver.execute_script(f'$("#inputCalendar2_input").val("{endDate}")')
        driver.execute_script('$("#image1").click()')
        WebDriverWait(driver, timeout=20, poll_frequency=1).until(EC.invisibility_of_element((By.ID, "___processbar2")))
        beforePage = driver.execute_script('return $(".w2pageList_label_selected").text()')
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
            data = parseData(driver)
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
    except Exception as e:
        print(str(e))
        raise e
    finally:
        if driver != None:
            driver.quit()
        print("end")

def parseData(driver: WebDriver):
    html = driver.execute_script('return $("#grid1_body_table")[0].outerHTML')
    dfpd = pd.read_html(html)[0]
    dfpd["createAt"] = datetime.today()
    dfpd.columns = list(map(lambda c: c[0] if c[0] == c[1] else c[0] + "_" + c[1] , dfpd.columns))
    df = pl.DataFrame(dfpd)
    return df.to_dicts()

def insertData(data):
    collection = getCollection("collectService_seibroDividend")
    collection.insert_many(data)
    print(data)
