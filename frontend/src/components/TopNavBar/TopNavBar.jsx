import React from 'react'
import { useHistory } from 'react-router-dom';

import CustomButton from '../CustomButton/CustomButton';

import styles from './TopNavBar.module.css';
function TopNavBar() {
    const history = useHistory();

    const handleLogOut = () => {
        localStorage.clear();
        history.push('loginScreen');
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttonWrapper}>
                <CustomButton
                    displayText="Log out"
                    func={handleLogOut}
                />
            </div>
        </div>
    )
}

export default TopNavBar
