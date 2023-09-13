import SeibroDividendService

def test_crawlingOne():
    startDate = "20220802"
    endDate = "20230902"
    result = SeibroDividendService.crawlingOne(startDate, endDate)
    print(result)