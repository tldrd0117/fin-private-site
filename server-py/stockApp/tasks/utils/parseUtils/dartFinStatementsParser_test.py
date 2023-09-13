import dartFinStatementsParser as parser
import tasks.utils.fileUtils.fileUtils as fileUtils
import json

def test_parser():
    zippath = "tasks/utils/testfile/2015_4Q_BS_20230503040109.zip"
    jsonPath = "tasks/utils/testfile/2015_4Q_BS_20230503040109/2015_4Q_BS_20230503040109.json"
    fileUtils.unzip(zippath)
    members = fileUtils.getZipFileMemberPath(zippath)
    dict = parser.parseDartFinancialStatements(members[0])
    fileUtils.toJsonFile(jsonPath, dict)
