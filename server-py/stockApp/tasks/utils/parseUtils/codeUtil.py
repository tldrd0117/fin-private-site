import re
def isPreferedStock(name):
    return re.match(r'^.*우[A-Za-z]?[)]?$', name) is not None