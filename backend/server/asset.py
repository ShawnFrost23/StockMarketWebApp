import yfinance as yf
import psycopg2

def connect():
    con = psycopg2.connect(database="iteration1", user="diamond_hands", password="1234", host="127.0.0.1", port="5432")
    cur = con.cursor()
    return con, cur

def overview(asset_id):
    # TODO must connect with Dan's ticker validation or this will 500

    con, cur = connect()
    cur.execute(f"SELECT * FROM assets WHERE asset_id = '{asset_id}';")
    result = cur.fetchone()
    ticker = result[2]

    stock = yf.Ticker(f"{ticker}.AX")
    last_price = stock.history(period="1d", interval="1m").iloc[-1]["Close"]
    last_close = stock.history(period="2d", interval="1d").iloc[-2]["Close"]
    return { "last_price": last_price,
             "change": last_price - last_close,
             "change_percent": (last_price - last_close) * 100 / last_close,
             "volume": stock.info["volume"],
             "market_cap": stock.info["marketCap"],
             "fiftyTwoWeekHigh": stock.info["fiftyTwoWeekHigh"],
             "fiftyTwoWeekLow": stock.info["fiftyTwoWeekLow"],
           }
