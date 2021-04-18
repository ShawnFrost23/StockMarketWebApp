import sys
import psycopg2
from json import dumps
from flask_cors import CORS
from flask_mail import Mail, Message
from flask import Flask, request, send_from_directory
from alerts.alerts import *
from server.auth import *
from server.register import *
from server.watchlist import *
from server.db_setup import *
from server.data.validate_tickers import *
from server.asset import *
from server.api_feed import *
from server.prediction import *

# Establish connection to database
con = psycopg2.connect(database="iteration1", user="diamond_hands", password="1234", host="127.0.0.1", port="5432")
# Obtain database cursor
cur = con.cursor()

# Create database schema
create_db_schema(cur)
con.commit()

# Fetch ASX Tickers 
add_asx_tickers(cur)
con.commit()

app = Flask(__name__, static_folder='server/static')

app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME='diamondhands3900@gmail.com',
    MAIL_PASSWORD='tothemoon' # To be stored in an ENVfile
)

mail = Mail(app)

app.config['TRAP_HTTP_EXCEPTIONS'] = True
CORS(app)

# Route requires user_id 
# If successful will send the user an email
@app.route('/send_automated_report', methods=['POST'])
def send_email_report():
    user_id = request.values.get('user_id')
    personal_info = get_personal_data(user_id) 

    msg = Message(subject="AUTOMATED WATCHLIST REPORT",
                  sender="diamondhands3900@gmail.com",
                  recipients=[personal_info['email']])
    
    api_data = get_api_data(user_id)

    message = f"""Hi {personal_info['name']},\n\nYour daily watchlist performance is summarised below:\n\n"""

    for watchlist_x in api_data: 
        aggregate_data = get_api_data_watchlist(watchlist_x['watchlist_id'])
        message = message + f"""Summary for {watchlist_x['watchlist_name']}:
        Daily Change: {aggregate_data['daily_percentage_changes']}
        Weekly Change: {aggregate_data['weekly_percentage_changes']}
        Monthly Change: {aggregate_data['monthly_percentage_changes']}
        Yearly Change: {aggregate_data['yearly_percentage_changes']}\n\n"""
        message = message + f"""Summary of Assets in {watchlist_x['watchlist_name']}:\n"""
        for stock_x in watchlist_x['stock_info']:
            message = message + f"""{stock_x['ticker']} - {stock_x['company_name']}:
            24hr change: {stock_x['24hr_percentage_change']}, Weekly change: {stock_x['weekly_percentage_change']}, Monthly change: {stock_x['monthly_percentage_change']}, Yearly change: {stock_x['yearly_percentage_change']}\n\n"""

    message = message + "\nThis is an automated email sent by Team Diamond Hands!"
    msg.body = message
    mail.send(msg)
    return dumps('success')

@app.route('/hello', methods=['GET'])
def hello():
    return dumps("hello world")

# Comment By Arth:
# Below method should be 'POST'
# The required fields are EMAIL and PASSWORD
# Will return to front end:
#       {"success": True "user_id": Int}
#       OR IN CASE OF ERROR
#       {"success": False}
@app.route('/auth/login', methods=['POST'])
def login():
    return dumps(auth_login(request.values.get('email'),
                            request.values.get('password')))

# Comment By Arth:
# Below method should be 'POST'
# The required fields are TOKEN or USERID

# Will return to front end:
#   {'success': True||False}
@app.route('/auth/logout', methods=['POST'])
def logout():
    return dumps("logout not yet implemented")

# Need from front end:
#       - email
#       - password
#       - name

# Will return to front end:
#       {"success": True "user_id": Int}
#       OR IN CASE OF ERROR
#       {"success": False}
@app.route('/auth/register', methods=['POST'])
def register():
    return dumps(auth_register(cur, con,
                               request.values.get('email'),
                               request.values.get('password'),
                               request.values.get('nickname')))

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

# Comment By Arth:
# Below method should be 'POST'
# The required fields are VERFICATION CODE sent to email, NEWPASSWORD, TOKEN or USER ID
# Will return to front end:
#       {"success": True || False}
@app.route('/auth/reset_password', methods=['POST'])
def reset_password():
    return dumps(auth_reset_password(request.values.get('reset_code'),
                                     request.values.get('new_password')))

@app.route('/watchlists', methods=['GET'])
def list_watchlists():
    return dumps(watchlists_list(request.values.get('user_id')))

@app.route('/watchlist', methods=['GET'])
def watchlist():
    return dumps(get_watchlist(request.values.get('watchlist_id')))

# Route requires:
#       user_id
#       watchlist_name
# Will return to Front end
#        { "success": True, "user_id": x } if successful
#        { "success": False } if not
@app.route('/watchlists/create', methods=['POST'])
def create_a_watchlist():
    return dumps(create_watchlist(request.values.get('user_id'),
                                  request.values.get('watchlist_name')))

# Route requires:
#       user_id
#       watchlist_id
# Will return to Front end
#       { "success": True } if successful
#       { "success": False} if not
@app.route('/watchlists/rename', methods=['POST'])
def rename_a_watchlist():
    return dumps(rename_watchlist(request.values.get('watchlist_id'),
                                  request.values.get('watchlist_name')))

# Route requires:
#       watchlist_id
# Will return to Front end
#       { "success": True } if successful
#       { "success": False} if not
@app.route('/watchlists/delete', methods=['DELETE'])
def delete_a_watchlist():
    return dumps(delete_watchlist(request.values.get('watchlist_id')))

@app.route('/watchlist/assets', methods=['GET'])
def watchlist_assets():
    return dumps(get_assets(request.values.get('watchlist_id')))

@app.route('/watchlist/aggregate_data', methods=['GET'])
def watchlist_data():
    return dumps(get_api_data_watchlist(request.values.get('watchlist_id')))

# Route requires:
#       watchlist_id
#       ticker
# Will return to Front end
#       { "success": True, "asset_id": x } if successful
#       { "success": False} if not
@app.route('/watchlists/add_asset', methods=['POST'])
def add_watchlist_asset():
    return dumps(add_asset(request.values.get('watchlist_id'),
                           request.values.get('ticker')))

# Route requires:
#       asset_id
# Will return to Front end
#       { "success": True} if successful
#       { "success": False} if not
@app.route('/watchlists/delete_asset', methods=['DELETE'])
def delete_watchlist_asset():
    return dumps(remove_asset(request.values.get('asset_id')))


# Route requires:
#       ticker
# Will return to Front end 
#       {"success": True, "ticker": x, "company_name": x, "industry": x} if successful
#       {"success": False} if not successful 
@app.route('/watchlists/ticker_validation', methods=['POST'])
def validate_ticker():
    return dumps(validate(request.values.get('ticker')))

@app.route('/asset', methods=['GET'])
def get_overview():
    return dumps(overview(request.values.get('asset_id')))


# need ticker to generate prediction
# return {"signal": signal, "buy": buy, "sell": sell, "hold": cont}
@app.route('/asset', methods=['POST'])
def get_predict():
    return dumps(predict(request.values.get('ticker')))

@app.route('/')
def index():
    return dumps("STONKS R US")

if __name__ == '__main__':
    app.run()
