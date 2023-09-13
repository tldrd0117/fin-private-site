
from datetime import date, datetime


def parseDartFinancialStatements(textFile):
    # Read the text file
    with open(textFile, 'r') as f:
        text = f.read()

    # Split the text file by the line break
    text = text.split('\n')
    columns = text[0].split("\t")
    results = {}
    for t in text[1:]:
        m = [trimString(x) for x in t.split("\t")]
        r = {}
        for idx, col in enumerate(columns):
            if len(m) > idx:
                r[col] = m[idx]
        if len(list(r.keys())) <= 4:
            continue
        r["file"] = textFile
        r["createAt"] = datetime.today()
        hash = str(r.values())
        results[hash] = r
    return list(results.values())

def trimString(string):
    return string.replace(",", "").replace("]", "").replace("[", "").strip()