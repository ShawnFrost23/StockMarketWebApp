import psycopg2

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

def watchlists_list(user_id):
    con, cur = connect()
    cur.execute(f"SELECT * FROM watchlists WHERE user_id='{user_id}';")
    rows = cur.fetchall()
    result = []
    for row in rows:
        # Add watchlist id and watchlist name
        result.append([row[0], row[2]])
    close(con, cur)
    return result

# create watchlist
def create_watchlist(user_id, watchlist_name):
    con, cur = connect()
    cur.execute(f"INSERT INTO WATCHLISTS VALUES( DEFAULT, '{user_id}', '{watchlist_name}')")
    con.commit()
    cur.execute(f"SELECT * FROM WATCHLISTS WHERE watchlist_name = '{watchlist_name}' AND user_id = '{user_id}';")
    result = cur.fetchone()
    if result: 
        return {"success": True, "user_id": result[1]}
    else: 
        return {"success": False}

# rename a watchlist
def rename_watchlist(watchlist_id, watchlist_name):
    con, cur = connect()
    cur.execute(f"UPDATE WATCHLISTS SET WATCHLIST_NAME='{watchlist_name}' WHERE WATCHLIST_ID='{watchlist_id}'")
    con.commit()
    cur.execute(f"SELECT * FROM WATCHLISTS WHERE watchlist_name = '{watchlist_name}' AND watchlist_id = '{watchlist_id}';")
    result = cur.fetchone()
    if result: 
        return {"success": True}
    else: 
        return {"success": False}

# delete watchlist
def delete_watchlist(watchlist_id):
    con, cur = connect()
    cur.execute(f"DELETE FROM watchlists WHERE watchlist_id={watchlist_id};")
    close(con, cur)

# add asset to the watchlist
def add_asset(ticker, watchlist_id):
    con, cur = connect()
    cur.execute("SELECT MAX(asset_id) FROM assets;")
    asset_id = cur.fetchone()
    asset_id = asset_id[0]
    asset_id += 1
    cur.execute(f"INSERT INTO assets (asset_id, watchlist_id, ticker) VALUES ({asset_id}, {watchlist_id}, '{ticker}');")
    close(con, cur)

# remove asset from the watchlist
def remove_asset(asset_id, watchlist_id):
    con, cur = connect()
    cur.execute(f"DELETE FROM assets WHERE asset_id={asset_id} and watchlist_id={watchlist_id};")
    close(con, cur)

'''
create_watchlist(2, 'penny')
delete_watchlist(7)
add_asset('BNB', 2)
remove_asset(4, 2)
'''
