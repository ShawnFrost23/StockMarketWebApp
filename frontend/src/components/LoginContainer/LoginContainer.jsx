import React from 'react'
import styles from './LoginContainer.module.css';

import CustomTextField from '../CustomTextField/CustomTextField';
function LoginContainer() {
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
        </div>
    )
}

export default LoginContainer
