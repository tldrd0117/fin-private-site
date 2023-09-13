from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

def getDateRange(startDate, endDate):
    startDate = datetime.strptime(startDate, "%Y%m%d")
    endDate = datetime.strptime(endDate, "%Y%m%d")
    dateRange = []
    while startDate <= endDate:
        dateRange.append(startDate)
        startDate = startDate + timedelta(days=1)
    return dateRange

def getDateMonthRange(startDate, endDate):
    startDate = datetime.strptime(startDate, "%Y%m%d")
    endDate = datetime.strptime(endDate, "%Y%m%d")
    dateRange = []
    while startDate <= endDate:
        dateRange.append(startDate)
        startDate = startDate + relativedelta(months=1)
    return dateRange