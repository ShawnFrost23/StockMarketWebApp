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

def create_mock_users(cur):
    Bob = {
        "nickname": "bobthebuilder",
        "email": "bob@gmail.com",
        "password": "builderman420"
    }

    Alice = {
        "nickname": "alice",
        "email": "alice@gmail.com",
        "password": "wonderlandtea"
    }

    Mallory = {
        "nickname": "hacker",
        "email": "hacker@gmail.com",
        "password": "satoshinakomoto"
    }

    cur.execute(f"INSERT INTO USERS VALUES(DEFAULT, '{Bob['nickname']}', '{Bob['email']}', '{Bob['password']}')")
    cur.execute(f"INSERT INTO USERS VALUES(DEFAULT, '{Alice['nickname']}', '{Alice['email']}', '{Alice['password']}')")
    cur.execute(f"INSERT INTO USERS VALUES(DEFAULT, '{Mallory['nickname']}', '{Mallory['email']}', '{Mallory['password']}')")