import psycopg2
import yfinance as yf

from watchlist import * 

'''
Stock level:
Last price 
Daily Change nominal / Daily Change %
Volume 
Weekly Change nominal / Weekly Change % 
Monthly Change nominal / Monthly Change % 
Yearly Change nominal / Yearly Change % 
'''
def get_all_stock_info(assets): 
    # Create empty array to store dicts of stock data 
    array_of_all_stock_data = []
    
    for stock_x in assets:
        # Create empty dict for stock data
        stock_data = {}

        stock = yf.Ticker(f"{stock_x[1]}.AX")

        # Add stock Ticker 
        stock_data['ticker'] = stock_x[1]

        # Add stock Name 
        stock_data['company_name'] = validate(stock_x[1])['company_name']

        # Get last price 
        stock_data['last_price'] = round(stock.history().iloc[-1]["Close"], 2)

        # Latest volume data 
        stock_data['volume'] = stock.info['volume']

        # Get 24hr price change 
        last_price = stock.history().iloc[-1]["Close"]
        start_price = stock.history(period="2d", interval="1d").iloc[0]["Close"]
        # 24hr Nominal change 
        stock_data['24hr_nominal_change'] = round((last_price - start_price), 2)
        # 24hr Percentage change 
        stock_data['24hr_percentage_change'] = "{:.2%}".format(((last_price - start_price)/start_price))

        # Get Weekly price change 
        last_price = stock.history().iloc[-1]["Close"]
        start_price = stock.history(period="6d", interval="1d").iloc[0]["Close"]
        # 1 Week Nominal change 
        stock_data['weekly_nominal_change'] = round((last_price - start_price), 2)
        # 1 Week Percentage change 
        stock_data['weekly_percentage_change'] = "{:.2%}".format(((last_price - start_price)/start_price))

        # Get Monthly price change 
        last_price = stock.history().iloc[-1]["Close"]
        start_price = stock.history(period="1mo", interval="1d").iloc[0]["Close"]
        # 1 Month Nominal change 
        stock_data['monthly_nominal_change'] = round((last_price - start_price), 2)
        # 1 Month Percentage change 
        stock_data['monthly_percentage_change'] = "{:.2%}".format(((last_price - start_price)/start_price))

        # Get Yearly price change 
        last_price = stock.history().iloc[-1]["Close"]
        start_price = stock.history(period="1y", interval="1d").iloc[0]["Close"]
        # 1 Year Nominal change 
        stock_data['yearly_nominal_change'] = round((last_price - start_price), 2)
        # 1 Year Percentage change 
        stock_data['yearly_percentage_change'] = "{:.2%}".format(((last_price - start_price)/start_price))

        # Append dict to array of stock data
        array_of_all_stock_data.append(stock_data)
        
    return array_of_all_stock_data

# Function returns API data neccessary for front end 
# api_data is an array of dicts for each watchlist
def get_api_data(user_id):
    # Create empty array for watchlist data 
    api_data = []
    # Get array of watchlists that the user has 
    user_watchlists = watchlists_list(user_id)
    for watchlist in user_watchlists:
        # Create empty dict for a single watchlist 
        watchlist_data = {}
        watchlist_data['watchlist_id'] = watchlist[0]
        watchlist_data['watchlist_name'] = watchlist[1]
        assets = get_assets(watchlist[0])
        watchlist_data['stock_info'] = get_all_stock_info(assets)
        # Append watchlist dict to api_data 
        api_data.append(watchlist_data)
    
    print(api_data)
    return api_data

get_api_data(1)

# Get data for a particular watchlist
def get_api_data_watchlist(watchlist_id):
    assets = get_assets(watchlist_id)
    watchlist_data = get_all_stock_info(assets)

    daily_percentage_changes = sum([asset['24hr_percentage_change'] for asset in assets]) / len(assets)
    weekly_percentage_changes = sum([asset['weekly_percentage_change'] for asset in assets]) / len(assets)
    monthly_percentage_changes = sum([asset['monthly_percentage_change'] for asset in assets]) / len(assets)
    yearly_percentage_changes = sum([asset['yearly_percentage_change'] for asset in assets]) / len(assets)

    aggregate_data  = {}
    aggregate_data['daily_percentage_changes'] = daily_percentage_changes
    aggregate_data['weekly_percentage_changes'] = weekly_percentage_changes
    aggregate_data['monthly_percentage_changes'] = monthly_percentage_changes
    aggregate_data['yearly_percentage_changes'] = yearly_percentage_changes

    return aggregate_data
