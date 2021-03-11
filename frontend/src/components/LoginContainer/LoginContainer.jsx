import React from 'react'
import { useHistory } from 'react-router-dom';

import styles from './LoginContainer.module.css';
import CustomTextField from '../CustomTextField/CustomTextField';
import CustomButton from '../CustomButton/CustomButton';
function LoginContainer() {
    const history = useHistory();

    const registerButtonHandler = () => {
        history.push('registerScreen');
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>
                Login
            </h1>
            <CustomTextField 
                placeholder="Username"
            />
            <CustomTextField 
                placeholder="Password"
            />
            <CustomButton
                displayText="Login"
            />
            <CustomButton
                displayText="New? Register Now!"
                func={registerButtonHandler}
            />
        </div>
    )
}

export default LoginContainer
