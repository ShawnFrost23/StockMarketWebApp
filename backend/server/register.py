# Function checks if a user has registered with email already
def user_exists(cur, email): 
    cur.execute(f"SELECT * FROM users WHERE email = '{email}'")
    result = cur.fetchone()
    if result:
        # TODO raise value error - Email already in use
        return True
    else:
        return False

# Adds user to the database 
def add_user_to_db(cur, con, email, password, nickname): 
    cur.execute(f"INSERT INTO USERS VALUES(DEFAULT, '{nickname}', '{email}', '{password}')")
    con.commit()

# Confirm user has been added and return user_id
def verify_registration(cur, email):
    cur.execute(f"SELECT * FROM users WHERE email = '{email}'")
    result = cur.fetchone()
    if result:
        return result
    else:
        # TODO raise value error - Failed to add user to database.
        return False
    
# Function register a user 
def auth_register(cur, con, email, password, nickname):
    if user_exists(cur, email):
        return {"success": False}
    else: 
        add_user_to_db(cur, con, email, password, nickname)
        user_id = verify_registration(cur, email)
        if (not user_id): 
            return {"success": False}
        else: 
            return {"success": True, "user_id": user_id[0]}

