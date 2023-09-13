from dotenv import load_dotenv, dotenv_values
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver

load_dotenv(verbose=True)
config = dotenv_values(".env")
address = config["WEB_DRIVER_ADDRESS"]

def getConnection(fileName, isProxy = False):
    print(address)
    chrome_options = webdriver.ChromeOptions()
    prefs = {
        'profile.default_content_setting_values.automatic_downloads': 1,
        'download.default_directory': f"/home/seluser/Downloads/{fileName}"
    }
    chrome_options.add_experimental_option("prefs", prefs)
    if isProxy:
        chrome_options.add_argument("--proxy-server=socks5://host.docker.internal:9050")
    driver = webdriver.Remote(
        command_executor=address,
        options=chrome_options,
    )
    driver.set_page_load_timeout(60)
    driver.set_script_timeout(60)
    return driver