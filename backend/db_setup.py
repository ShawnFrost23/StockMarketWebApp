# Creating database schema 
def create_db_schema(cur): 
    # Create a Table for Users
    cur.execute(
    '''CREATE TABLE IF NOT EXISTS USERS
    (ID             SERIAL      PRIMARY KEY    NOT NULL,
    NICKNAME        VARCHAR     NOT NULL,
    EMAIL           VARCHAR     NOT NULL, 
    PASSWORD        VARCHAR     NOT NULL); ''')

    # Create a Table for Watchlists 
    cur.execute(
    '''CREATE TABLE IF NOT EXISTS WATCHLISTS
    (WATCHLIST_ID   SERIAL      PRIMARY KEY    NOT NULL,
    USER_ID         INTEGER     NOT NULL,
    WATCHLIST_NAME  VARCHAR     NOT NULL); ''')

    # Create a Table for Assets 
    cur.execute(
    '''CREATE TABLE IF NOT EXISTS ASSETS
    (ASSET_ID       SERIAL      PRIMARY KEY    NOT NULL,
    WATCHLIST_ID    INTEGER     NOT NULL,
    TICKER          VARCHAR     NOT NULL); ''')
    
    print("Table created successfully")