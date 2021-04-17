from numpy.lib.index_tricks import AxisConcatenator
from numpy.testing._private.utils import tempdir
import yfinance as yf
import pandas as pd
import talib 


buy_signal_list = {
    "Hammer": "CDLHAMMER",
    "Inverted Hammer": "CDLINVERTEDHAMMER",
    "Piercing Pattern": "CDLPIERCING",
    "Morning Star": "CDLMORNINGSTAR",
    "Three Advancing White Soldiers": "CDL3WHITESOLDIERS"
}

sell_signal_list = {
    "Two Crows": "CDL2CROWS",
    "Hanging Man": "CDLHANGINGMAN",
    "Shooting Star": "CDLSHOOTINGSTAR",
    "Evening Star": "CDLEVENINGSTAR",
    "Three Black Crows":"CDL3BLACKCROWS"
}



def stock_price(ticker):

    stock = yf.Ticker(f"{ticker}.AX")
    price = stock.history(period="1y", interval="1d")

    return price 


def buy_signal(price):
    result = []

    for pattern in buy_signal_list:
        data = eval("talib." + buy_signal_list[pattern] + "(price['Open'], price['High'], price['Low'], price['Close'])")
        data = data[data != 0]
        
        if (len(data) > 0):
            print(pattern)
            print(data)
            result.append(data.index.tolist())
    

    result.sort(reverse=True)
    return result

def sell_signal(price):

    result = []

    for pattern in sell_signal_list:
        data = eval("talib." + sell_signal_list[pattern] + "(price['Open'], price['High'], price['Low'], price['Close'])")
        data = data[data != 0]
        
        if (len(data) > 0):
            print(pattern)
            print(data)
            result.append(data.index.tolist())
    

    result.sort(reverse=True)
    return result




def control_flow(ticker):

    price = stock_price(ticker)
    buy_dates = buy_signal(price)
    sell_dates = sell_signal(price)
    print(buy_dates)
    print(sell_dates)



control_flow('XRO')


