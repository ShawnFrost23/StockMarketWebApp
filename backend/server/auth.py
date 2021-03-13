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
