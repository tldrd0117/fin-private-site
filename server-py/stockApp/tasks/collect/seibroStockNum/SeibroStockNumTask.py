import luigi
import service.SeibroStockNumService as SeibroStockNumService
from tasks.utils.dateUtils.dateUtils import getDateMonthRange
from dataSource.mongoClient import getClient, getDB, getDBName
from tasks.targets.MongoFindTarget import MongoFindTarget
from datetime import datetime, timedelta, date
from dateutil.relativedelta import relativedelta

class CrawlingAndInsertByStockTask(luigi.Task):
    code = luigi.Parameter()
    name = luigi.Parameter()
    firstDate = luigi.DateParameter(default=date(1997, 7, 1))
    endDate = luigi.DateParameter(default=date.today())
    def makeId(self):
        firstDate = datetime.fromordinal(self.firstDate.toordinal())
        endDate = datetime.fromordinal(self.endDate.toordinal())
        return firstDate.strftime("%Y%m%d") + '_' + endDate.strftime("%Y%m%d") + "_" + self.code + "_" + self.name

    def run(self):
        firstDate = datetime.fromordinal(self.firstDate.toordinal())
        endDate = datetime.fromordinal(self.endDate.toordinal())
        size = SeibroStockNumService.crawlingOne(firstDate.strftime("%Y%m%d"), endDate.strftime("%Y%m%d"), self.code, self.name)
        id = self.makeId()
        self.output().write({id: size})
    
    def output(self):
        ids = [self.makeId()]
        return MongoFindTarget(getClient(), getDBName(), "SeibroStockNumTask_CrawlingAndInsertByStockTask", ids, "date")

class CrawlingAndInsertTask(luigi.Task):
    date = luigi.DateParameter()

    def makeId(self):
        firstDate = datetime.fromordinal(self.date.toordinal()).replace(day=1)
        return firstDate.strftime("%Y%m%d")

    def run(self):
        firstDate = datetime.fromordinal(self.date.toordinal()).replace(day=1)
        endDate = firstDate + relativedelta(day=31)
        stocks = SeibroStockNumService.getAllStocks()
        print(firstDate.strftime("%Y%m%d"), endDate.strftime("%Y%m%d"))
        size = 0
        for stock in stocks:
            size = size + SeibroStockNumService.crawlingOne(firstDate.strftime("%Y%m%d"), endDate.strftime("%Y%m%d"), stock["종목코드"], stock["종목명"])
        id = self.makeId()
        self.output().write({id: size})
    
    def output(self):
        ids = [self.makeId()]
        return MongoFindTarget(getClient(), getDBName(), "SeibroStockNumTask_CrawlingAndInsertTask", ids, "date")

class CrawlingAllSeibroStockNumTask(luigi.WrapperTask):
    firstDate = luigi.DateParameter(default=date(1997, 7, 1))
    endDate = luigi.DateParameter(default=date.today())
    def requires(self):
        tasks = []
        stocks = SeibroStockNumService.getAllStocks()
        stockList = list(stocks)
        print(str(len(stockList)))
        for stock in stockList:
            tasks.append(CrawlingAndInsertByStockTask(code=stock["종목코드"], name=stock["종목명"], firstDate=self.firstDate, endDate=self.endDate))
        return tasks
