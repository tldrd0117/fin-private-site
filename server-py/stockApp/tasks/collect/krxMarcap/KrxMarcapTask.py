import luigi
from datetime import datetime, timedelta

from tasks.utils.dateUtils.dateUtils import getDateRange

from dataSource.mongoClient import getClient, getDB, getDBName
from tasks.targets.MongoFindTarget import MongoFindTarget
import service.KrxMarcapService as KrxMarcapService
from tenacity import retry, stop_after_attempt, wait_fixed

class DeleteDuplicateDataTask(luigi.Task):
    task_complete = False
    def run(self):
        KrxMarcapService.deleteDuplicateData()
        self.task_complete = True
    def complete(self):
        return  self.task_complete

class ClearFilesTask(luigi.Task):
    task_complete = False
    def run(self):
        getDB().krxMarcapTask_CrawlingTask.delete_many({})
        getDB().krxMarcapTask_InsertKrxMarcapTask.delete_many({})
        KrxMarcapService.clearDownloadDir()
        self.task_complete = True
    def complete(self):
        return  self.task_complete

class ClearFileTask(luigi.Task):
    date = luigi.DateParameter()
    market = luigi.Parameter(default="kospi")
    task_complete = False
    def run(self):
        name = KrxMarcapService.makeDirName(self.market, self.date)
        getDB().krxMarcapTask_CrawlingTask.delete_one({"_id":name})
        getDB().krxMarcapTask_InsertKrxMarcapTask.delete_one({"_id":name})
        KrxMarcapService.clearDownloadOneDir(name)
        self.task_complete = True
    def complete(self):
        return  self.task_complete


class CrawlingTask(luigi.Task):
    date = luigi.DateParameter()
    market = luigi.Parameter(default="kospi")

    def run(self):
        id = KrxMarcapService.makeDirName(self.market, self.date)
        path = KrxMarcapService.downloadOneFile(self.date, self.market)
        self.output().write({id: path})
    
    def output(self):
        ids = [KrxMarcapService.makeDirName(self.market, self.date)]
        return MongoFindTarget(getClient(), getDBName(), "krxMarcapTask_CrawlingTask", ids, "file")

class InsertKrxMarcapTask(luigi.Task):
    date = luigi.DateParameter()
    market = luigi.Parameter(default="kospi")
    def requires(self):
        return CrawlingTask(self.date, self.market)
    
    def run(self):
        ids = self.input().read()
        for id in ids:
            path = ids[id]
            result = KrxMarcapService.addCrawlingData(path, datetime.combine(self.date, datetime.min.time()), self.market)
            self.output().write({id: len(result.inserted_ids)})
    
    def output(self):
        ids = [KrxMarcapService.makeDirName(self.market, self.date)]
        return MongoFindTarget(getClient(), getDBName(), "krxMarcapTask_InsertKrxMarcapTask", ids, "file")


class KrxMarcapRangeTask(luigi.WrapperTask):
    startDate = luigi.DateParameter()
    endDate = luigi.DateParameter()
    market = luigi.Parameter(default="kospi")
    def requires(self):
        tasks = []
        dateRange = getDateRange(self.startDate.strftime("%Y%m%d"), self.endDate.strftime("%Y%m%d"))
        for date in dateRange:
            print(date)
            tasks.append(InsertKrxMarcapTask(date, self.market))
        return tasks

class KrxMarcapAllMarketRangeTask(luigi.WrapperTask):
    startDate = luigi.DateParameter()
    endDate = luigi.DateParameter()
    def requires(self):
        tasks = []
        dateRange = getDateRange(self.startDate.strftime("%Y%m%d"), self.endDate.strftime("%Y%m%d"))
        for date in dateRange:
            print(date)
            for market in ["kospi", "kosdaq"]:
                tasks.append(InsertKrxMarcapTask(date, market))
        return tasks

