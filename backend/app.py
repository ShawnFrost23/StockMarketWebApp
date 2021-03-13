import sys
import psycopg2
from json import dumps
from flask_cors import CORS
from flask_mail import Mail, Message
from flask import Flask, request, send_from_directory
from server.auth import *
from db_setup import create_db_schema, create_mock_users

# Establish connection to database
con = psycopg2.connect(database="iteration1", user="diamond_hands", password="", host="127.0.0.1", port="5432")
# Obtain database cursor
cur = con.cursor()

# # Create database schema
# create_db_schema(cur)
# con.commit()

# # Create mock user registrations
# create_mock_users(cur)
# con.commit()

app = Flask(__name__, static_folder='server/static')

app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME='diamondhands3900@gmail.com',
    MAIL_PASSWORD='tothemoon' # To be stored in an ENVfile
)

app.config['TRAP_HTTP_EXCEPTIONS'] = True
CORS(app)

@app.route('/hello', methods=['GET'])
def hello():
    return dumps("hello world")

@app.route('/auth/login', methods=['POST'])
def login():
    return dumps(auth_login(request.values.get('email'),
                            request.values.get('password')))

@app.route('/auth/logout', methods=['POST'])
def logout():
    return dumps("logout not yet implemented")

@app.route('/auth/register', methods=['POST'])
def register():
    return dumps("register not yet implemented")

@app.route('/auth/reset_request', methods=['POST'])
def reset_request():
    # TODO db update to have reset_code
    email, reset_code = auth_reset_request(request.values.get('email'))

    mail = Mail(app)
    msg = Message("Diamond Hands password reset",
                  sender="diamondhands3900@gmail.com",
                  recipients=[email])
    msg.body = f"""Hi, you have requested a password reset.
Please enter this code on the reset password page: {reset_code}"""
    mail.send(msg)
    return dumps({})

@app.route('/auth/reset_password', methods=['POST'])
def reset_password():
    return dumps(auth_reset_password(request.values.get('reset_code'),
                                     request.values.get('new_password')))

@app.route('/')
def index():
    return dumps("STONKS R US")

if __name__ == '__main__':
    app.run()
