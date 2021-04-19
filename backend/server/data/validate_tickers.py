import csv
import json

# Check if this script has already been run
def script_already_run(cur, ticker):
    cur.execute(f"SELECT * FROM tickers WHERE ticker = '{ticker}';")
    result = cur.fetchone()
    if result:
        return True
    else:
        return False


# Adding asx equities to tickers table 
def add_asx_tickers(cur):
    with open('server/data/asx-listed-companies.csv') as csvfile:
        csvReader = csv.reader(csvfile, delimiter=',')
        for row in csvReader:
            if script_already_run(cur, row[0]):
                return 
            cur.execute(f"INSERT INTO TICKERS VALUES('{row[0]}', '{row[1]}', '{row[2]}', 'ASX')") 
