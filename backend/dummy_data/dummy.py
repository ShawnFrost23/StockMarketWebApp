##### FILE MUST BE RUN MANUALLY ######
# Active VENV and run python3 backend/dummy_data/dummy.py

import psycopg2
import sys
sys.path.insert(0, '../server')
from watchlist import *

# establish connection and return cursor
def connect():
    con = psycopg2.connect(database="iteration1", user="diamond_hands", password="1234", host="127.0.0.1", port="5432")
    cur = con.cursor()
    return con, cur

# close connection and commit changes
def close(connect, cursor):
    connect.commit()
    cursor.close()
    connect.close()

# Function adds dummy data for bobthebuilder id = 1
# Will only work on a clean database!
def dummy(cur):
    user_id = 1
    watchlist_id = 1
    # Creating watchlist 1 
    create_watchlist(user_id, 'BOB1')
    add_asset(watchlist_id, 'AAA')
    add_asset(watchlist_id, 'CBA')
    add_asset(watchlist_id, 'BHP')
    add_asset(watchlist_id, 'A2M')
    add_asset(watchlist_id, 'CCL')

    watchlist_id = 2
    # Creating watchlist 2
    create_watchlist(user_id, 'BOB2')
    add_asset(watchlist_id, 'BKL')
    add_asset(watchlist_id, 'NAB')
    add_asset(watchlist_id, 'CPU')
    add_asset(watchlist_id, 'FMG')
    add_asset(watchlist_id, 'TAH')

# Execute
con, cur = connect()
dummy(cur)
con.commit()
close(con, cur)