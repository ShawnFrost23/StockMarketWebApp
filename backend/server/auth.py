import re

# TODO log in the user
def valid_email(email):
    regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
    return re.search(regex, email)

# DZ TODO: will login be enabled with nickname?
def auth_login(email, password):
    if not valid_email(str(email)):
        raise ValueError("Email is not valid")

    # # TODO: connect to database function - is this an object or string?
    # # TODO: may need null check added, depending on the object
    # user = find_user_by_email(email)

    # if user.password == password:
    #     return {'u_id': user.id}

    # raise Exception("Email and/or password is invalid")

def auth_reset_request(email):
    user = find_user_by_email(email)
    reset_code = str(uuid4())[0:10]

    # TODO: reset code will be in database
    set_reset_code(user['u_id'], reset_code)

    return {'email': email, 'reset_code': reset_code}

def auth_reset_password(reset_code, new_password):
    user = find_user_by_reset_code(reset_code)
    if (user is not None and reset_code == user['reset_code']):
        set_new_password(user['u_id'], new_password)
        return ({})

    raise ValueError('Reset code is not valid and/or password is not valid')
