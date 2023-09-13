import codeUtil

def test_isPreferedStock():
    assert codeUtil.isPreferedStock("삼성전자우") == True
    assert codeUtil.isPreferedStock("삼성전자") == False
    assert codeUtil.isPreferedStock("두산2우B") == True
    assert codeUtil.isPreferedStock("두산(2우B)") == True
    assert codeUtil.isPreferedStock("두산2우적") == False