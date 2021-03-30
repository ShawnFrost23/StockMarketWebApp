import yfinance as yf

def overview(ticker):
    # TODO must connect with Dan's ticker validation or this will 500
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
