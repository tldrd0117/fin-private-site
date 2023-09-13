import pymongo
from dotenv import load_dotenv, dotenv_values

load_dotenv(verbose=True)
config = dotenv_values(".env")

mc = pymongo.MongoClient(config["DB_ADDRESS"])
def getDBName():
    return config["DB_NAME"]

def makeIndex():
    mc[getDBName()]["collectService_dartFinancialStatements"].create_index(["재무제표종류", "항목코드", "항목명", "결산기준일", "보고서종류", "종목코드", "file"], unique=True)
makeIndex()


def getDBAddress():
    return config["DB_ADDRESS"]

def getClient():
    return mc

def getDB():
    return mc[getDBName()]

def getCollection(collection):
    return getDB()[collection]