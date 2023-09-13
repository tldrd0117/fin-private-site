from dataSource.mongoClient import getCollection
from DartFinancialStatementTask import ExtractZipFiles, ClearTasks, InsertDartFinancialStatementTask, ListPathTask
import luigi

def test_DartFinancialStatementTask():
    # task.required = ExtractZipFiles()
    luigi.build([InsertDartFinancialStatementTask()], workers=1, detailed_summary=True)


def test_getListPathTask():
    targets = getCollection("collectTask_ListPathTask").find({})
    for doc in targets:
        print(doc)

def test_addListPathTask():
    task = ListPathTask()
    luigi.build([task], workers=1, detailed_summary=True)

class PrintPickleOutputTask(luigi.Task):
    required = None
    def requires(self):
        return ExtractZipFiles()

    def run(self):
        print("run")
        print("read",self.input().read())