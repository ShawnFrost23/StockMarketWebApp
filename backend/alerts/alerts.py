import psycopg2
from flask_mail import Mail, Message
from flask import Flask, request, send_from_directory
#from apscheduler.schedulers.background import BackgroundScheduler

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

# get personal information
def get_personal_data(user_id):
    con, cur = connect()
    user_info = {}
    cur.execute(f"SELECT * FROM users WHERE id='{user_id}';")
    result = cur.fetchone()
    close(con, cur)
    user_info['name'] = result[1]
    user_info['email'] = result[2]
    return user_info