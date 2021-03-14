import React from 'react'
import RegisterContainer from '../../components/RegisterContainer/RegisterContainer';
import styles from './RegisterScreen.module.css';

function RegisterScreen() {
    return (
        <div className={styles.container}>
            <RegisterContainer />
        </div>
    )
}

export default RegisterScreen
