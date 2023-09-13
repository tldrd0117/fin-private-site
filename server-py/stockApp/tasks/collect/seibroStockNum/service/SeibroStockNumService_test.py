import SeibroStockNumService

def test_getAllStocks():
    result = SeibroStockNumService.getAllStocks()
    print(str(len(list(result))))
    # for item in result:
    #     print(item)

def test_crawlingOneStockNum():
    startDate = "20000101"
    endDate = "20230902"
    code = "005930"
    name = "삼성전자"
    result = SeibroStockNumService.crawlingOne(startDate, endDate, code, name)
    print(result)