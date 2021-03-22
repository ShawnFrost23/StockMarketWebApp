import csv
import json

# Adding asx equities to tickers table 
def add_asx_tickers(cur):
    with open('./backend/server/data/asx-listed-companies.csv') as csvfile:
        csvReader = csv.reader(csvfile, delimiter=',')
        for row in csvReader:
            cur.execute(f"INSERT INTO TICKERS VALUES('{row[0]}', '{row[1]}', '{row[2]}', 'ASX')") 