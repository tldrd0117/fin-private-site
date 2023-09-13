from dataSource.mongoClient import getCollection
import tasks.utils.fileUtils.fileUtils as fileUtils
import tasks.utils.parseUtils.dartFinStatementsParser as parser


def extractDartZips(li):
    for zipFilePath in li:
        print(zipFilePath)
        fileUtils.unzip(zipFilePath)
        print(zipFilePath + " is extracted.")

def extractDartZip(zipFilePath):
    fileUtils.unzip(zipFilePath)
    print(zipFilePath + " is extracted.")

def addDartFinancilStatement(file):
    print(file)
    result = parser.parseDartFinancialStatements(file)
    collection = getCollection("collectService_dartFinancialStatements")
    return collection.insert_many(result)

def getUnzipPathTarget():
    cursor = getCollection("collectTask_ListPathTask").find({})
    result = []
    for doc in cursor:
        result.extend(doc["dir"])
    return result

def getInsertTarget():
    targets = getUnzipPathTarget()
    result = []
    for target in targets:
        li = fileUtils.getZipFileMemberName(target)
        li = list(map(lambda x: target.replace(".zip", "") + "/" + x, li))
        result.extend(li)
    return result

def addListTarget(path):
    dirs = fileUtils.listZipFilePathStrNotExtractedFromDirs(path)
    collection = getCollection("collectTask_ListPathTask")
    collection.insert_one({"_id": path, "dir": dirs})