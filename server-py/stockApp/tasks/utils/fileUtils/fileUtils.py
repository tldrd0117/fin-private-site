import zipfile
from pathlib import Path
import codecs
import os
import json
import shutil
from bson.objectid import ObjectId
from hashlib import md5
import time

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
print(BASE_DIR.as_posix())

def listNameFromDir(dirPathStr, ext = "", dir = False):
    dirPath = resolveBaseDir(dirPathStr)
    return list(filter(lambda x: x.endswith(ext) and dir == Path(dirPath+"/"+x).is_dir(), os.listdir(dirPath)))

def listPathStrFromDir(dirPathStr, ext = "", dir = False):
    return [ Path(dirPathStr+"/"+n).as_posix() for n in listNameFromDir(dirPathStr, ext, dir)]

def listNameNotExtractedFromDir(dirPathStr):
    extractedDir = listNameFromDir(dirPathStr, "", True)
    zipFiles = listNameFromDir(dirPathStr, ".zip")
    return list(filter(lambda x: x.replace(".zip", "") not in extractedDir, zipFiles))

def listPathStrNotExtractedFromDir(dirPathStr):
    return [ Path(dirPathStr+"/"+n).as_posix().replace(".zip", "") for n in listNameNotExtractedFromDir(dirPathStr)]

def listZipFilePathStrNotExtractedFromDirs(dirPathStr):
   return [ Path(dirPathStr+"/"+n).as_posix() for n in listNameNotExtractedFromDir(dirPathStr)]

def removeDirTree(dirPathStr):
    dirPath = resolveBaseDir(dirPathStr)
    shutil.rmtree(dirPath)

def getFileName(filePathStr):
    filePath = resolveBaseDir(filePathStr)
    return Path(filePath).stem

def getFileNames(filePathStrList):
    return list(map(lambda x: getFileName(x), filePathStrList))

def getObjectIdByPath(filePathStr):
    filePath = resolveBaseDir(filePathStr)
    p = Path(filePath).stem
    enc = md5()
    enc.update(p.encode('utf-8'))
    return ObjectId(enc.hexdigest())

def getObjectIdByPaths(filePathStrList):
    return list(map(lambda x: getObjectIdByPath(x), filePathStrList))

def validateOneLineFile(filePathStr, word = ""):
    filePath = resolveBaseDir(filePathStr)
    with open(filePath, 'r') as f:
        line = f.readline()
        return line.startswith(word)

def unzip(filePathStr):
    filePath = resolveBaseDir(filePathStr)
    unzipPath = createUnzipDirPath(filePath)
    with zipfile.ZipFile(filePath, 'r') as zf:
        zipInfo = zf.infolist()
        for member in zipInfo:
            member.filename = member.filename.encode('cp437').decode('euc-kr') +"_origin_"
            p = zf.extract(member, unzipPath)
            convertFileEncoding(p)

def resolveBaseDir(filePathStr):
    if not filePathStr.startswith(BASE_DIR.as_posix()):
        filePath = BASE_DIR.as_posix() + "/" + filePathStr
    else:
        filePath = filePathStr
    return filePath

def resolveBaseDirList(filePathStrList):
    return list(map(lambda x: resolveBaseDir(x), filePathStrList))

def createUnzipDirPath(filePathStr):
    filePath = resolveBaseDir(filePathStr)
    unzipPath = Path(filePath).parent
    unzipStem = Path(filePath).stem
    return Path(unzipPath.resolve().as_posix() + "/" + unzipStem).as_posix()

def toJsonFile(filePathStr, dict):
    filePath = resolveBaseDir(filePathStr)
    with open(filePath, 'w') as f:
        json.dump(dict, f, indent=2, ensure_ascii=False)

def getZipFileMemberPath(filePathStr):
    filePath = resolveBaseDir(filePathStr)
    memberPathStrList = []
    unzipPath = createUnzipDirPath(filePath)
    with zipfile.ZipFile(filePath, 'r') as zf:
        zipInfo = zf.infolist()
        for member in zipInfo:
            memberPathStrList.append(unzipPath + "/" + member.filename.encode('cp437').decode('euc-kr'))
    return resolveBaseDirList(memberPathStrList)


def getZipFileMemberName(filePathStr):
    filePath = resolveBaseDir(filePathStr)
    result = []
    with zipfile.ZipFile(filePath, 'r') as zf:
        zipInfo = zf.infolist()
        for member in zipInfo:
            result.append(member.filename.encode('cp437').decode('euc-kr'))
    return result

def existFile(filePathStr):
    filePath = resolveBaseDir(filePathStr)
    targetPath = Path(filePath)
    return targetPath.is_file()

def existDir(filePathStr):
    filePath = resolveBaseDir(filePathStr)
    targetPath = Path(filePath)
    return targetPath.is_dir()


def convertFileEncoding(pathStr):
    BLOCKSIZE = 1048576 # or some other, desired size in bytes
    try:
        with codecs.open(pathStr, "r", "euc-kr") as sourceFile:
            with codecs.open(pathStr.replace("_origin_", ""), "w", "utf-8") as targetFile:
                while True:
                    contents = sourceFile.read(BLOCKSIZE)
                    if not contents:
                        break
                    targetFile.write(contents)
        os.remove(pathStr)
    except UnicodeDecodeError as e:
        with codecs.open(pathStr, "r", "cp949") as sourceFile:
            with codecs.open(pathStr.replace("_origin_", ""), "w", "utf-8") as targetFile:
                while True:
                    contents = sourceFile.read(BLOCKSIZE)
                    if not contents:
                        break
                    targetFile.write(contents)
        os.remove(pathStr)

def createDir(dirPathStr):
    dirPath = resolveBaseDir(dirPathStr)
    Path(dirPath).mkdir(parents=True, exist_ok=True)