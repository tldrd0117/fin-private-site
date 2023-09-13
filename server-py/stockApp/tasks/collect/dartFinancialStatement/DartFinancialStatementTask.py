import luigi
from tasks.targets.MongoFindTarget import MongoFindTarget
import service.DartFinancialService as DartFinancialService
import tasks.utils.fileUtils.fileUtils as fileUtils
from dataSource.mongoClient import getClient, getDB, getDBName
import itertools

def flattenDictValues(dict):
    return list(itertools.chain(*dict.values()))

class ClearTasks(luigi.Task):
    task_complete = False
    def run(self):
        print("ClearTasks run")
        getDB().collectTask_ListPathTask.delete_many({})
        self.task_complete = True
    def complete(self):
        return  self.task_complete

class ClearAllTasks(luigi.Task):
    task_complete = False
    def run(self):
        getDB().collectTask_ListPathTask.delete_many({})
        getDB().collectTask_ExtractZipFiles.delete_many({})
        getDB().collectTask_InsertDartFinancialStatementTask.delete_many({})
        getDB().collectService_dartFinancialStatements.delete_many({})
        self.task_complete = True
    def complete(self):
        return  self.task_complete

class ListPathTask(luigi.Task):
    task_complete = False
    path = luigi.Parameter(default="resources/opendart")
    def requires(self):
        return ClearAllTasks()

    def run(self):
        print("ListPathTask run")
        DartFinancialService.addListTarget(self.path)
        self.task_complete = True
    def complete(self):
        return  self.task_complete

class ExtractZipFiles(luigi.Task):
    path = luigi.Parameter(default="resources/opendart")
    def requires(self):
        return ListPathTask()
    
    def run(self):
        print("ExtractZipFiles run")
        zipPaths = DartFinancialService.getUnzipPathTarget()
        for zipPath in zipPaths:
            DartFinancialService.extractDartZip(zipPath)
            dir = zipPath.replace(".zip", "")
            files = fileUtils.listPathStrFromDir(dir, ".txt")
            ret = True
            for file in files:
                oneRet = fileUtils.validateOneLineFile(file, "재무제표종류")
                ret = ret and oneRet
            if ret:
                self.output().write({zipPath: files})

    def output(self):
        targets = DartFinancialService.getUnzipPathTarget()
        return MongoFindTarget(getClient(), getDBName(), "collectTask_ExtractZipFiles", targets, "file")

class InsertDartFinancialStatementTask(luigi.Task):
    path = luigi.Parameter(default="resources/opendart")
    def requires(self):
        return ExtractZipFiles(path=self.path)

    def run(self):
        files = flattenDictValues(self.input().read())
        results = {}
        for file in files:
            result = DartFinancialService.addDartFinancilStatement(file)
            results[file] = len(result.inserted_ids)
            self.output().write({file: results[file]})

    def output(self):
        files = DartFinancialService.getInsertTarget()
        return MongoFindTarget(getClient(), getDBName(), "collectTask_InsertDartFinancialStatementTask", files, "file")