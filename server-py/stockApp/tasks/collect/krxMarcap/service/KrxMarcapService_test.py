from tasks.utils.dateUtils.dateUtils import getDateRange
import KrxMarcapService
from datetime import datetime, timedelta

def test_downloadOneFile():
    path = KrxMarcapService.downloadOneFile(datetime.strptime("20211221", "%Y%m%d"), "kospi")
    print("result path: "+path)

def test_downloadOneEmptyFile():
    KrxMarcapService.downloadOneFile(datetime.strptime("20230826", "%Y%m%d"), "kospi")


def test_downloadOneFileRange():
    dateRange = getDateRange("20211221", "20220102")
    for date in dateRange:
        KrxMarcapService.downloadOneFile(date, "kospi")

def test_addCrawlingData():
    path = KrxMarcapService.downloadDirPath.joinpath(KrxMarcapService.makeDirName("kospi", datetime.strptime("20211221", "%Y%m%d"))+"/"+"data_3352_20230826.csv")
    KrxMarcapService.addCrawlingData(path.resolve().as_posix(), datetime.strptime("20211221", "%Y%m%d"), "kospi")

def test_countKrxMarcapData():
    count = KrxMarcapService.countKrxMarcapData()
    print("count: "+str(count))

def test_deleteDuplicateData():
    KrxMarcapService.deleteDuplicateData()

def test_find():
    collection = KrxMarcapService.getCollection("collectService_krxMarcap")
    # collection.delete_many({"date": datetime.strptime("20190523", "%Y%m%d")})
    # temp = KrxMarcapService.getCollection("temp")
    # data = collection.find({})
    # i = 0
    # tempArr = []
    # for one in data:
    #     tempArr.append(one)
    #     if i % 10000 == 0:
    #         temp.insert_many(tempArr)
    #         tempArr = []
    #         print(i)
    #     i+=1
    # if len(tempArr) > 0:
    #     temp.insert_many(tempArr)
    
    