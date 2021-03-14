import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './RegisterContainer.module.css';
import CustomTextField from '../CustomTextField/CustomTextField';
import CustomButton from '../CustomButton/CustomButton';
import LogRegHeading from '../LogRegHeading/LogRegHeading';
function RegisterContainer() {
    // Name State Variables
    const [name, setName] = React.useState('');
    const [nameErr, setNameErr] = React.useState(false)
    const [nameHelpText, setNameHelpText] = React.useState('');

    // Email State Variables
    const [email, setEmail] = React.useState('');
    const [emailErr, setEmailErr] = React.useState(false);
    const [emailHelpText, setEmailHelpText] = React.useState('');

    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const history = useHistory();

    const handleRegister = () => {
        console.log("🚀 ~ file: RegisterContainer.jsx ~ line 10 ~ RegisterContainer ~ name", name)
        console.log("🚀 ~ file: RegisterContainer.jsx ~ line 12 ~ RegisterContainer ~ email", email)
        console.log("🚀 ~ file: RegisterContainer.jsx ~ line 14 ~ RegisterContainer ~ password", password)
        console.log("🚀 ~ file: RegisterContainer.jsx ~ line 16 ~ RegisterContainer ~ confirmPassword", confirmPassword)
    }

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
            />
            <CustomTextField 
                placeholder="Confirm Password"
                type='password'
                setValue={setConfirmPassword}
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
