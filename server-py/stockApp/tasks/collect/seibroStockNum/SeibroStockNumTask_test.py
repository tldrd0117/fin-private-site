import luigi
from tasks.collect.seibroStockNum.SeibroStockNumTask import CrawlingAndInsertByStockTask, CrawlingAllSeibroStockNumTask, CrawlingAndInsertTask
from datetime import date, datetime

def test_CrawlingAndInsertTask():
    date = datetime.strptime("20230801", "%Y%m%d")
    luigi.build([CrawlingAndInsertTask(date=date)], workers=1, detailed_summary=True)

def test_CrawlingAndInsertByStockTask():
    luigi.build([CrawlingAndInsertByStockTask(name="삼성전자", code="005930")], workers=1, detailed_summary=True)

def test_CrawlingAllSeibroDividendTask():
    luigi.build([CrawlingAllSeibroStockNumTask(endDate=date(2023, 9, 10))], workers=5, detailed_summary=True)