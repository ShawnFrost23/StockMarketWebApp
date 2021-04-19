import React from 'react'
import { useHistory } from 'react-router-dom';

import styles from './LoginContainer.module.css';
import CustomTextField from '../CustomTextField/CustomTextField';
import CustomButton from '../CustomButton/CustomButton';
import LogRegHeading from '../LogRegHeading/LogRegHeading';
function LoginContainer() {
    // Name State Variables
    const [email, setEmail] = React.useState('');
    const [emailErr, setEmailErr] = React.useState(false);
    const [emailHelpText, setEmailHelpText] = React.useState('');

    // Password State Variables
    const [password, setPassword] = React.useState('');
    const [passwordErr, setPasswordErr] = React.useState(false);
    const [passwordHelpText, setPasswordHelpText] = React.useState('');

    const history = useHistory();

    // Function to check Email input.
    const checkEmail = (email) => {
        if (email === '') {
            setEmailHelpText('Enter your Email ');
            return false;
        }
        // Email format validation
        if (typeof (email) !== "undefined") {
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
              setEmailHelpText('Enter Valid Email');
              return false;
            }
        }
        return true;
    }

    // Function to check password input.
    const checkPassword = (password) => {
        if (password === '') {
            setPasswordHelpText('Enter your password ');
            return false;
        }
        return true;
    }

    async function handleLogin () {
        const emailStatus = checkEmail(email);
        const passwordStatus = checkPassword(password);

        if (emailStatus === false) {
            setEmailErr(true);
        } else if (emailStatus === true) {
            setEmailHelpText('');
            setEmailErr(false);
        }

        if (passwordStatus === false) {
            setPasswordErr(true);
        } else if (passwordStatus === true) {
            setPasswordHelpText('');
            setPasswordErr(false);
        }

        if (emailStatus && passwordStatus) {

            const requestOptions = {
                method: 'POST',
            }

            const response = await fetch('/auth/login?' + new URLSearchParams({email: email, password: password,}), requestOptions);
            if (response.status === 200) {
                const jsonFormat = await response.json();
                const userID = await jsonFormat.user_id;
                localStorage.setItem('user_id', userID);
                history.push('advanceHome')
            } else {
                setEmailHelpText('Invalid Details, Try Again!');
                setEmailErr(true);
                setPasswordHelpText('Invalid Details, Try Again!');
                setPasswordErr(true);
            }
        }
    }

    async function handleForgotPassword () {
        const emailStatus = checkEmail(email);

        if (emailStatus === false) {
            setEmailErr(true);
        } else if (emailStatus === true) {
            setEmailHelpText('');
            setEmailErr(false);
        }

        if (emailStatus) {

            const requestOptions = {
                method: 'POST',
            }

            const response = await fetch('/auth/reset_request?' + new URLSearchParams({email: email, }), requestOptions);
            if (response.status === 200) {
                history.push('passwordReset');
            } else {
                setEmailHelpText('Sorry! Email not registered.');
                setEmailErr(true);
            }
        }
    }

    const registerButtonHandler = () => {
        history.push('registerScreen');
    }
    return (
        <div className={styles.container}>
            <LogRegHeading
                heading="Login"
            />
            <CustomTextField
                placeholder="Email"
                setValue={setEmail}
                errorStatus={emailErr}
                helperText={emailHelpText}
            />
            <CustomTextField
                placeholder="Password"
                type='password'
                setValue={setPassword}
                errorStatus={passwordErr}
                helperText={passwordHelpText}
            />
            <CustomButton
                displayText="Login"
                func={handleLogin}
            />
            <CustomButton
                displayText="Forgot Password"
                func={handleForgotPassword}
            />
            <CustomButton
                displayText="New? Register Now!"
                func={registerButtonHandler}
            />
        </div>
    )
}

export default LoginContainer
