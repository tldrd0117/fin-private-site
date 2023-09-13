from DartFinancialService import extractDartZips, getInsertTarget, addDartFinancilStatement, getUnzipPathTarget
import tasks.utils.fileUtils.fileUtils as fileUtils
import os

def test_extractDartZips():
    dirPath = "resources/opendart"
    li = fileUtils.listZipFilePathStrNotExtractedFromDirs(dirPath)
    extractDartZips(li)
    dirs = fileUtils.listPathStrFromDir(dirPath, "", True)
    results = []
    for dir in dirs:
        files = fileUtils.listPathStrFromDir(dir, ".txt")
        for file in files:
            ret = fileUtils.validateOneLineFile(file, "재무제표종류")
            assert ret
            results.append(ret)
    print(results)

def test_removeDirs():
    dirPath = "resources/opendart"
    dirs = fileUtils.listPathStrFromDir(dirPath, "", True)
    for dir in dirs:
        fileUtils.removeDirTree(dir)

def test_addDartFinancilStatement():
    dirPath = "resources/opendart"
    dirs = fileUtils.listPathStrFromDir(dirPath, "", True)
    files = fileUtils.listPathStrFromDir(dirs[0], ".txt")
    assert files[0] != None
    addDartFinancilStatement(files[0])

def test_getUnzipPathTarget():
    target = getUnzipPathTarget()
    print(target)

def test_getInsertTarget():
    target = getInsertTarget()
    print(target)



