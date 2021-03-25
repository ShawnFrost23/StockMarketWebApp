import yfinance as yf

def overview(ticker):
    # TODO must connect with Dan's ticker validation or this will 500
    stock = yf.Ticker(f"{ticker}.AX")
    last_price = stock.history(period="1d", interval="1m").iloc[-1]["Close"]
    return { "last_price": last_price,
             "fiftyTwoWeekHigh": stock.info["fiftyTwoWeekHigh"],
             "fiftyTwoWeekLow": stock.info["fiftyTwoWeekLow"],
             "volume": stock.info["volume"],
             "market_cap": stock.info["marketCap"]}