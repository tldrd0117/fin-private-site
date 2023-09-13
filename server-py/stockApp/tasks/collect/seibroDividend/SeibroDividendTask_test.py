import luigi
from tasks.collect.seibroDividend.SeibroDividendTask import ClearDataTask, CrawlingAndInsertTask, CrawlingAllSeibroDividendTask
from datetime import datetime

def test_ClearDataTask():
    luigi.build([ClearDataTask()], workers=1, detailed_summary=True)

def test_crawlingOne():
    date = datetime.strptime("20071201", "%Y%m%d")
    luigi.build([CrawlingAndInsertTask(date=date)], workers=1, detailed_summary=True)

def test_CrawlingAllSeibroDividendTask():
    luigi.build([CrawlingAllSeibroDividendTask(
        startDate=datetime.strptime("19960701", "%Y%m%d"),
        endDate=datetime.strptime("20230902", "%Y%m%d"))], workers=5, detailed_summary=True)