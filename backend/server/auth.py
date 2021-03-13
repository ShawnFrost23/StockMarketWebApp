import psycopg2
import re

# TODO log in the user
def valid_email(email):
    regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
    return re.search(regex, email)

# DZ TODO: will login be enabled with nickname?
def auth_login(email, password):
    if not valid_email(str(email)):
        raise ValueError("Email is not valid")

    # TODO: Q does this connection need to be reopened? Extract into db file?
    # Establish connection to database
    con = psycopg2.connect(database="iteration1", user="diamond_hands", password="", host="127.0.0.1", port="5432")
    # Obtain database cursor
    cur = con.cursor()

    cur.execute(f"SELECT * FROM users WHERE email = '{email}'")
    result = cur.fetchone()
    cur.close()
    con.close()

    # TODO extract into function
    if result is not None:
        db_id = result[0]
        db_password = result[3]
        if db_password == password:
            return { 'user_id': db_id }

    raise ValueError("Email and/or password is invalid")
