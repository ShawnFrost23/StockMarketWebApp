import sys
from json import dumps
from flask_cors import CORS
from flask_mail import Mail, Message
from flask import Flask, request, send_from_directory

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
    return dumps("login not yet implemented")

@app.route('/auth/logout', methods=['POST'])
def logout():
    return dumps("logout not yet implemented")

@app.route('/auth/register', methods=['POST'])
def register():
    return dumps("register not yet implemented")

@app.route('/auth/reset_request', methods=['POST'])
def reset_request():
    return dumps("password reset request not yet implemented")

@app.route('/auth/reset_password', methods=['POST'])
def reset_password():
    return dumps("reset password not yet implemented")

if __name__ == '__main__':
    app.run()
