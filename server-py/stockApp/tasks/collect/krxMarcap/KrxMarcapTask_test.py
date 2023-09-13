import luigi
from tasks.collect.krxMarcap.KrxMarcapTask import DeleteDuplicateDataTask, ClearFileTask, CrawlingTask, ClearFilesTask, InsertKrxMarcapTask, KrxMarcapRangeTask, KrxMarcapAllMarketRangeTask
from datetime import datetime


def test_ClearFilesTask():
    luigi.build([ClearFilesTask()], workers=1, detailed_summary=True)


def test_CrawlingTask():
    luigi.build([CrawlingTask(datetime.strptime("20211221", "%Y%m%d"), "kospi")], 
                workers=1, detailed_summary=True)
def test_InsertKrxMarcapTask():
    luigi.build([InsertKrxMarcapTask(datetime.strptime("20211221", "%Y%m%d"), "kospi")], 
                workers=1, detailed_summary=True)

def test_InsertKrxMarcapTask_2():
    luigi.build([InsertKrxMarcapTask(datetime.strptime("20190523", "%Y%m%d"), "kospi"),
                 InsertKrxMarcapTask(datetime.strptime("20190523", "%Y%m%d"), "kosdaq")], 
                workers=2, detailed_summary=True)

def test_InsertKrxMarcapTask_3():
    targets = [["20130801","kospi"],
    ["20000222","kosdaq"],
    ["20221101","kospi"],
    ["20140321","kospi"],
    ["19990528","kospi"],
    ["20161006","kospi"],
    ["20141019","kospi"],
    ["20130407","kosdaq"],
    ["20161103","kosdaq"],
    ["20141017","kosdaq"],
    ["20180806","kospi"],
    ["20100827","kospi"],
    ["20160912","kosdaq"],
    ["20000106","kosdaq"],
    ["20180903","kosdaq"],
    ["20040315","kosdaq"],
    ["20021204","kospi"],
    ["19980910","kosdaq"],
    ["20110822","kospi"],
    ["20201215","kosdaq"],
    ["20140210","kospi"],
    ["20110722","kospi"],
    ["20210609","kosdaq"],
    ["20210629","kosdaq"],
    ["20160913","kosdaq"],
    ["20161121","kospi"],
    ["20130111","kospi"],
    ["20201117","kosdaq"],
    ["20160926","kosdaq"],
    ["20130412","kospi"],
    ["20230207","kosdaq"],
    ["20140916","kospi"],
    ["20220729","kosdaq"],
    ["20210422","kosdaq"],
    ["19970901","kosdaq"],
    ["20230426","kosdaq"],
    ["20050502","kosdaq"],
    ["20160211","kosdaq"],
    ["20161111","kosdaq"]]
    tasks = []
    for target in targets:
        tasks.append(InsertKrxMarcapTask(datetime.strptime(target[0], "%Y%m%d"), target[1]))

    luigi.build(tasks, workers=5, detailed_summary=True)

def test_ClearOneDir():
    targets = [["20130801","kospi"],
    ["20000222","kosdaq"],
    ["20221101","kospi"],
    ["20140321","kospi"],
    ["19990528","kospi"],
    ["20161006","kospi"],
    ["20141019","kospi"],
    ["20130407","kosdaq"],
    ["20161103","kosdaq"],
    ["20141017","kosdaq"],
    ["20180806","kospi"],
    ["20100827","kospi"],
    ["20160912","kosdaq"],
    ["20000106","kosdaq"],
    ["20180903","kosdaq"],
    ["20040315","kosdaq"],
    ["20021204","kospi"],
    ["19980910","kosdaq"],
    ["20110822","kospi"],
    ["20201215","kosdaq"],
    ["20140210","kospi"],
    ["20110722","kospi"],
    ["20210609","kosdaq"],
    ["20210629","kosdaq"],
    ["20160913","kosdaq"],
    ["20161121","kospi"],
    ["20130111","kospi"],
    ["20201117","kosdaq"],
    ["20160926","kosdaq"],
    ["20130412","kospi"],
    ["20230207","kosdaq"],
    ["20140916","kospi"],
    ["20220729","kosdaq"],
    ["20210422","kosdaq"],
    ["19970901","kosdaq"],
    ["20230426","kosdaq"],
    ["20050502","kosdaq"],
    ["20160211","kosdaq"],
    ["20161111","kosdaq"]]
    tasks = []
    for target in targets:
        tasks.append(ClearFileTask(datetime.strptime(target[0], "%Y%m%d"), target[1]))

    luigi.build(tasks, workers=1, detailed_summary=True)

def test_CrawlingAllTasks():
    luigi.build([KrxMarcapRangeTask(
        startDate=datetime.strptime("20230101", "%Y%m%d"),
        endDate=datetime.strptime("20230827", "%Y%m%d"),
        market="kospi")], workers=5, detailed_summary=True)

def test_CrawlingAllMarketTasks():
    luigi.build([KrxMarcapAllMarketRangeTask(
        startDate=datetime.strptime("20230101", "%Y%m%d"),
        endDate=datetime.strptime("20230101", "%Y%m%d"))], workers=5, detailed_summary=True)
    

def test_CrawlingAllMarketAllTasks():
    luigi.build([KrxMarcapAllMarketRangeTask(
        startDate=datetime.strptime("19960701", "%Y%m%d"),
        endDate=datetime.strptime("20230902", "%Y%m%d"))], workers=5, detailed_summary=True)

def test_DeleteDuplicateData():
    luigi.build([DeleteDuplicateDataTask()], workers=1, detailed_summary=True)
