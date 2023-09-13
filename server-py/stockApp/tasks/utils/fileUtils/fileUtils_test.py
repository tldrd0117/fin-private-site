import fileUtils
from pathlib import Path
import os

def test_unzip():
    zippath = "tasks/utils/testfile/2015_4Q_BS_20230503040109.zip"
    fileUtils.unzip(zippath)
    assert fileUtils.existDir(fileUtils.createUnzipDirPath(zippath))
    members = fileUtils.getZipFileMemberPath(zippath)
    print(members)
    for member in members:
        assert fileUtils.existFile(member)

def test_getUnzipFilePath():
    zippath = "tasks/utils/testfile/2015_4Q_BS_20230503040109.zip"
    fileUtils.getUnzipFilePath(zippath)

def test_createUnzipDirPath():
    zippath = "tasks/utils/testfile/2015_4Q_BS_20230503040109.zip"
    print(fileUtils.createUnzipDirPath(zippath))



def test_list():
    print(fileUtils.listNameNotExtractedFromDir("tasks/utils/testfile"))

def test_validateOneLineFile():
    path = "tasks/utils/testfile/2015_4Q_BS_20230503040109"
    paths = fileUtils.listPathStrFromDir(path)
    for path in paths:
        assert fileUtils.validateOneLineFile(path, "재무제표종류")


def test_createDir():
    fileUtils.createDir("../hello")