
from tasks.utils.dateUtils.dateUtils import getDateRange


def test_getDateRange():
    startDate = "20211221"
    endDate = "20220102"
    dateRange = getDateRange(startDate, endDate)
    assert len(dateRange) == 13