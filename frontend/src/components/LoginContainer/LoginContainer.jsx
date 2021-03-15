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

    // TODO: Add logic to send backend verfication for inputs and login to account.
    const handleLogin = () => {
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
    }

    const handleForgotPassword = () => {
        const emailStatus = checkEmail(email);

        if (emailStatus === false) {
            setEmailErr(true);
        } else if (emailStatus === true) {
            setEmailHelpText('');
            setEmailErr(false);
        }

        history.push('passwordReset')
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
                displayText="New? Register Now!"
                func={registerButtonHandler}
            />
        </div>
    )
}

export default LoginContainer
