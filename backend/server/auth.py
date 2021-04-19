import psycopg2
import re

def valid_email(email):
    regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
    return re.search(regex, email)

def auth_login(email, password):
    if not valid_email(str(email)):
        raise ValueError("Email is not valid")

    # Establish connection to database
    con = psycopg2.connect(database="iteration1", user="diamond_hands", password="", host="127.0.0.1", port="5432")
    # Obtain database cursor
    cur = con.cursor()

    cur.execute(f"SELECT * FROM users WHERE email = '{email}'")
    result = cur.fetchone()
    cur.close()
    con.close()

    if result is not None:
        db_id = result[0]
        db_password = result[3]
        if db_password == password:
            return { 'user_id': db_id }

    raise ValueError("Email and/or password is not valid")

def auth_reset_request(email):
    # Establish connection to database
    con = psycopg2.connect(database="iteration1", user="diamond_hands", password="", host="127.0.0.1", port="5432")
    # Obtain database cursor
    cur = con.cursor()

    cur.execute(f"SELECT * FROM users WHERE email = '{email}'")
    result = cur.fetchone()
    cur.close()
    con.close()

    if result is not None:
        reset_code = result[0]
        return (email, reset_code)

    raise ValueError('Reset request could not be processed')


def auth_reset_password(reset_code, new_password):
    con = psycopg2.connect(database="iteration1", user="diamond_hands", password="", host="127.0.0.1", port="5432")
    # Obtain database cursor
    cur = con.cursor()

    cur.execute(f"SELECT * FROM users WHERE id = '{reset_code}'")
    result = cur.fetchone()

    if result is not None:
        cur.execute(f"UPDATE users SET password = '{new_password}' WHERE id = '{reset_code}'")
        con.commit()
        cur.close()
        con.close()
        return ({})

    cur.close()
    con.close()
    raise ValueError('Reset code is not valid and/or password is not valid')
