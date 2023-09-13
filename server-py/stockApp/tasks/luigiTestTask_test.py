from luigiTestTask import TestTask, TestProgressTask
import luigi

def test_testTask():
    task = TestTask()
    luigi.build([task], workers=1, detailed_summary=True)

def test_testProgressTask():
    task = TestProgressTask()
    luigi.build([task], workers=1, detailed_summary=True)