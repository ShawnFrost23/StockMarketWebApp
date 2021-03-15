import React from 'react'
import { useHistory } from 'react-router-dom';

import CustomButton from '../CustomButton/CustomButton';

import styles from './TopNavBar.module.css';
function TopNavBar() {
    const history = useHistory();

    // TODO: ADD Logic for getting Verification code to email.
    const handleChangePasswordButton = () => {
        history.push('passwordReset');
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.buttonWrapper}>
                <CustomButton 
                    displayText="Reset Password"
                    func={handleChangePasswordButton}
                />
            </div>
            
        </div>
    )
}

export default TopNavBar
