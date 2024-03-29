import yfinance as yf
import psycopg2

from .watchlist import *
from .prediction import *

def connect():
    con = psycopg2.connect(database="iteration1", user="diamond_hands", password="1234", host="127.0.0.1", port="5432")
    cur = con.cursor()
    return con, cur

def overview(asset_id):
    con, cur = connect()
    cur.execute(f"SELECT * FROM assets WHERE asset_id = '{asset_id}';")
    result = cur.fetchone()
    ticker = result[2]

    return overview_public(ticker)

def overview_public(ticker):
    ticker = ticker.upper()
    stock = yf.Ticker(f"{ticker}.AX")
    company_name = validate(ticker)['company_name']
    last_price = stock.history(period="1d", interval="1m").iloc[-1]["Close"]

    start_price = stock.history(period="2d", interval="1d").iloc[0]["Close"]
    daily_nominal_change = round((last_price - start_price), 2)
    daily_percentage_change = "{:.2%}".format(((last_price - start_price)/start_price))

    start_price = stock.history(period="6d", interval="1d").iloc[0]["Close"]
    weekly_nominal_change = round((last_price - start_price), 2)
    weekly_percentage_change = "{:.2%}".format(((last_price - start_price)/start_price))

    start_price = stock.history(period="1mo", interval="1d").iloc[0]["Close"]
    monthly_nominal_change = round((last_price - start_price), 2)
    monthly_percentage_change = "{:.2%}".format(((last_price - start_price)/start_price))

    start_price = stock.history(period="1y", interval="1d").iloc[0]["Close"]
    yearly_nominal_change = round((last_price - start_price), 2)
    yearly_percentage_change = "{:.2%}".format(((last_price - start_price)/start_price))

    payout_ratio = round(stock.info["payoutRatio"], 2)
    dividend_yield = "{:.2%}".format(stock.info["dividendYield"])
    forward_PE = round(stock.info["forwardPE"], 2)
    trailing_PE = round(stock.info["trailingPE"], 2)

    predictions = predict(ticker)

    return { "last_price": round(last_price, 2),
             "daily_nominal_change": daily_nominal_change,
             "daily_percentage_change": daily_percentage_change,
             "weekly_nominal_change": weekly_nominal_change,
             "weekly_percentage_change": weekly_percentage_change,
             "monthly_nominal_change": monthly_nominal_change,
             "monthly_percentage_change": monthly_percentage_change,
             "yearly_nominal_change": yearly_nominal_change,
             "yearly_percentage_change": yearly_percentage_change,
             "volume": stock.info["volume"],
             "market_cap": stock.info["marketCap"],
             "ticker": ticker,
             "company_name": company_name,
             "payout_ratio": payout_ratio,
             "dividend_yield": dividend_yield,
             "forward_PE": forward_PE,
             "trailing_PE": trailing_PE,
             "predictions_signal": predictions["signal"],
             "predictions_buy": predictions["buy"],
             "predictions_sell": predictions["sell"],
             "predictions_hold": predictions["hold"],
           }
