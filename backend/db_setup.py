import psycopg2

def connect_db(): 
    con = psycopg2.connect(database="iteration1", user="diamond_hands", password="", host="127.0.0.1", port="5432")
    print("Database opened successfully")

    cur = con.cursor()

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
    con.commit()
    return cur; 