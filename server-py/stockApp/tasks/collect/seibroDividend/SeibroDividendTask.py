import luigi
import service.SeibroDividendService as SeibroDividendService
from tasks.utils.dateUtils.dateUtils import getDateMonthRange
from dataSource.mongoClient import getClient, getDB, getDBName
from tasks.targets.MongoFindTarget import MongoFindTarget
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

class ClearDataTask(luigi.Task):
    task_complete = False
    def run(self):
        getDB().SeibroDividendTask_CrawlingAndInsertTask.delete_many({})
        getDB().collectService_seibroDividend.delete_many({})
    def complete(self):
        return  self.task_complete

class CrawlingAndInsertTask(luigi.Task):
    date = luigi.DateParameter()

    def makeId(self):
        firstDate = datetime.fromordinal(self.date.toordinal()).replace(day=1)
        return firstDate.strftime("%Y%m%d")

    def run(self):
        firstDate = datetime.fromordinal(self.date.toordinal()).replace(day=1)
        endDate = firstDate + relativedelta(day=31)
        print(firstDate.strftime("%Y%m%d"), endDate.strftime("%Y%m%d"))
        size = SeibroDividendService.crawlingOne(firstDate.strftime("%Y%m%d"), endDate.strftime("%Y%m%d"))
        id = self.makeId()
        self.output().write({id: size})
    
    def output(self):
        ids = [self.makeId()]
        return MongoFindTarget(getClient(), getDBName(), "SeibroDividendTask_CrawlingAndInsertTask", ids, "date")

class CrawlingAllSeibroDividendTask(luigi.WrapperTask):
    startDate = luigi.DateParameter()
    endDate = luigi.DateParameter()
    def requires(self):
        tasks = []
        dateRange = getDateMonthRange(self.startDate.strftime("%Y%m%d"), self.endDate.strftime("%Y%m%d"))
        for date in dateRange:
            tasks.append(CrawlingAndInsertTask(date))
        return tasks