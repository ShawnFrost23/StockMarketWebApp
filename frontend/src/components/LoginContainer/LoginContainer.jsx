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


    const [password, setPassword] = React.useState('')
    const history = useHistory();

    const handleLogin = () => {
        console.log("🚀 ~ file: LoginContainer.jsx ~ line 19 ~ handleLogin ~ name", name);
        console.log("🚀 ~ file: LoginContainer.jsx ~ line 19 ~ handleLogin ~ password", password);
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
