import yfinance as yf
import psycopg2
import datetime as datetime

from pandas_datareader import data as pdr
from pypfopt import EfficientFrontier
from pypfopt import risk_models
from pypfopt import expected_returns

from .watchlist import *


def get_portfolio_distribution(watchlist_id):
    
    # assets = get_assets(watchlist_id)


    # if (len(assets) == 0):
    #     aggregate_data = {}
    #     aggregate_data['composition'] = "No stocks in the watchlist"
    #     aggregate_data['Expected annual return:'] = "0"
    #     aggregate_data['Annual volatility:'] = "0"
    #     aggregate_data['Sharpe Ratio:'] = "0"
    #     return aggregate_data

    # tickers = []
    # for stock_x in assets:
    #     # Create empty dict for stock data
    #     tickers.append(f"{stock_x[1]}.AX")

    # yf.pdr_override()
    # x = datetime.datetime.now()
    # Previous_Date = datetime.datetime.today() - datetime.timedelta(days=365)

    # stocks = ["CBA.AX","ANZ.AX","A2M.AX"]
    # data = pdr.get_data_yahoo(stocks, start=Previous_Date.strftime('%Y-%m-%d'), end=x.strftime('%Y-%m-%d'))
    # data = data['Close']
    # mu = expected_returns.mean_historical_return(data)
    # S = risk_models.sample_cov(data)
    # ef = EfficientFrontier(mu, S)
    # raw_weights = ef.min_volatility()
    # cleaned_weights = ef.clean_weights()  
    # perf = ef.portfolio_performance()
    
    aggregate_data = {}
    # aggregate_data['dictionary_composition'] = cleaned_weights.items()
    # aggregate_data['Expected_annual_return:'] = f"Expected annual return: {perf[0]*100:.2f}%"
    # aggregate_data['Annual_volatility:'] = f"Annual volatility: {perf[1]*100:.2f}%"
    # aggregate_data['Sharpe_Ratio:'] = f"Sharpe Ratio: {perf[2]:.2f}""
    aggregate_data['Sharpe_Ratio:'] = "test of a string"
    return aggregate_data

