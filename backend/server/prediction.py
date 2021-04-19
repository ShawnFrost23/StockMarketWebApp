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
    "Three Black Crows":"CDL3BLACKCROWS",
    "Three-Line Strike": "CDL3LINESTRIKE"
}

cont_signal_list = {
    "Doji": "CDLDOJI",
    "Spinning Top": "CDLSPINNINGTOP",
    "Rising/Falling Three Methods": "CDLRISEFALL3METHODS",
    "Tasuki Gap": "CDLTASUKIGAP",
    "Separating Lines": "CDLSEPARATINGLINES"
}


def stock_price(ticker):

    stock = yf.Ticker(f"{ticker}.AX")
    price = stock.history(period="3mo", interval="1d")

    return price 


def buy_signal(price):
    count = 0

    for pattern in buy_signal_list:
        data = eval("talib." + buy_signal_list[pattern] + "(price['Open'], price['High'], price['Low'], price['Close'])")
        data = data[data != 0]
        
        if (len(data) > 0):
            count += len(data.tolist())
    
    return count

def sell_signal(price):

    count = 0

    for pattern in sell_signal_list:
        data = eval("talib." + sell_signal_list[pattern] + "(price['Open'], price['High'], price['Low'], price['Close'])")
        data = data[data != 0]
        
        if (len(data) > 0):
            count += len(data.tolist())
   
    return count


def cont_signal(price):

    count = 0

    for pattern in sell_signal_list:
        data = eval("talib." + sell_signal_list[pattern] + "(price['Open'], price['High'], price['Low'], price['Close'])")
        data = data[data != 0]
        
        if (len(data) > 0):
            count += len(data.tolist())
    
    return count


def predict(ticker):

    price = stock_price(ticker)
    buy = buy_signal(price)
    sell = sell_signal(price)
    cont = cont_signal(price)

    if (buy >= cont and buy > sell):
        signal = "Buy"
    elif (sell >= cont and sell > buy):
        signal = "Sell"
    else:
        signal = "Hold"


    return {"signal": signal, "buy": buy, "sell": sell, "hold": cont}




#print(predict('APT'))


