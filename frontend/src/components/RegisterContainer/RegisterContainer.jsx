import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './RegisterContainer.module.css';
import CustomTextField from '../CustomTextField/CustomTextField';
import CustomButton from '../CustomButton/CustomButton';
import LogRegHeading from '../LogRegHeading/LogRegHeading';
// Functional class for register contianer to be displayed on register screen.
function RegisterContainer() {
    // Name State Variables
    const [name, setName] = React.useState('');
    const [nameErr, setNameErr] = React.useState(false)
    const [nameHelpText, setNameHelpText] = React.useState('');

    // Email State Variables
    const [email, setEmail] = React.useState('');
    const [emailErr, setEmailErr] = React.useState(false);
    const [emailHelpText, setEmailHelpText] = React.useState('');

    // Password State Variables
    const [password, setPassword] = React.useState('');
    const [passwordErr, setPasswordErr] = React.useState(false);
    const [passwordHelpText, setPasswordHelpText] = React.useState('');

    // Confirm Password State Varaibles
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [confirmPasswordErr, setConfirmPasswordErr] = React.useState(false);
    const [confirmPasswordHelpText, setConfirmPasswordHelpText] = React.useState('');

    const history = useHistory();

    // Function to check name input.
    const checkName = (name) => {
        if (name === '') {
              setNameHelpText('Enter your Name');
            return false;
        }
        return true;
    }

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

    // Function to check passswords in the input field and verify
    // if the entered passwords match or not.
    const checkPass = (newPass, confirmNewPass) => {
        // Error handling for password.
        if (newPass.length < 8) {
            setPasswordHelpText('Password should have atleast 8 characters');
            setPasswordErr(true);
            return false;
        } else if (newPass === '' || confirmNewPass === '') {
            if (newPass === '') {
                setPasswordHelpText('Enter a new Password');
                setPasswordErr(true);
            } else {
                setPasswordHelpText('');
                setPasswordErr(false);
            }

            if (confirmNewPass === '') {
                setConfirmPasswordHelpText('Enter a new Password');
                setConfirmPasswordErr(true);
            } else {
                setConfirmPasswordHelpText('');
                setConfirmPasswordErr(false);
            }
            return false;
        } else if (confirmNewPass !== newPass) {
                setPasswordHelpText('Entered Passwords do not match');
                setPasswordErr(true);
                setConfirmPasswordHelpText('Entered Passwords do not match');
                setConfirmPasswordErr(true);
                return false;
        }
        return true;
    }

    // Button action for register button
    async function handleRegister () {
        const nameStatus = checkName(name);
        const emailStatus = checkEmail(email);
        const passStatus = checkPass(password, confirmPassword);

        // Error handling for name
        if (nameStatus === false) {
            setNameErr(true);
        } else if (nameStatus === true) {
            setNameHelpText('');
            setNameErr(false);
        }

        // Error handling for email
        if (emailStatus === false) {
            setEmailErr(true);
        } else if (emailStatus === true) {
            setEmailHelpText('');
            setEmailErr(false);
        }

        // Error handling for password
        if (passStatus === false) {
            // Do Nothing
        } else if (passStatus === true) {
            setConfirmPasswordHelpText('');
            setConfirmPasswordErr(false);
            setPasswordHelpText('');
            setPasswordErr(false);
        }

        if (nameStatus && emailStatus && passStatus) {
            const request_options = {
                method: 'POST'
            }

            const response = await fetch('/auth/register?' + new URLSearchParams({
                email: email,
                password: password,
                nickname: name,
            }), request_options);
            if (response.status === 200) {
                const jsonFormat = await response.json();
                if (jsonFormat.success === true) {
                    const userID = jsonFormat.user_id;
                    localStorage.setItem('user_id', userID);
                    console.log("🚀 ~ file: RegisterContainer.jsx ~ line 138 ~ handleRegister ~ userID", userID)
                    history.push('advanceHome')
                } else {
                    setEmailHelpText('Email already in use');
                    setEmailErr(true);
                }
            }
        }
    }

    // Button action for login button
    const loginButtonHandler = () => {
        history.push('loginScreen');
    }
    return (
        <div className={styles.container}>
            <LogRegHeading
                heading="Register"
            />
            <CustomTextField
                placeholder="Name"
                setValue={setName}
                errorStatus={nameErr}
                helperText={nameHelpText}
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
            <CustomTextField
                placeholder="Confirm Password"
                type='password'
                setValue={setConfirmPassword}
                errorStatus={confirmPasswordErr}
                helperText={confirmPasswordHelpText}
            />
            <CustomButton
                displayText="Register"
                func={handleRegister}
            />
            <CustomButton
                displayText="User? Login Now!"
                func={loginButtonHandler}
            />
        </div>
    )
}

export default RegisterContainer
