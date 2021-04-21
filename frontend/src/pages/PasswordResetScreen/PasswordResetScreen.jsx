import React from 'react'
import PasswordResetContainer from '../../components/PasswordResetContainer/PasswordResetContainer';

import styles from './PasswordResetScreen.module.css';

// Functional class for Password Reset Screen.
function PasswordResetScreen() {
    return (
        <div className={styles.container}>
            <PasswordResetContainer />
        </div>
    )
}

export default PasswordResetScreen
