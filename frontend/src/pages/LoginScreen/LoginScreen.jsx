import React from 'react'
import LoginContainer from '../../components/LoginContainer/LoginContainer';
import styles from './LoginScreen.module.css';
// Functional class for login screen.
function LoginScreen() {
    return (
        <div className={styles.container}>
            <LoginContainer />
        </div>
    )
}

export default LoginScreen
