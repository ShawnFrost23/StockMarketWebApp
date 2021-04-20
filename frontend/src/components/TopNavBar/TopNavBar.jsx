import React from 'react'
import { useHistory } from 'react-router-dom';

import CustomButton from '../CustomButton/CustomButton';

import styles from './TopNavBar.module.css';
function TopNavBar({ version }) {
    const history = useHistory();

    const handleAccountSelect = () => {
        history.push('/selectAccountType');
    }

    const handleHome = () => {
        history.push('/advanceHome')
    }

    const handleLogOut = () => {
        localStorage.clear();
        history.push('/loginScreen');
    }
    if (version === 1) {
        return (
        <div className={styles.container}>
            <div className={styles.buttonWrapper}>
                <CustomButton
                    displayText="Change Account"
                    func={handleAccountSelect}
                />
            </div>
        </div>)
    }
    return (
        <div className={styles.container}>
            <div className={styles.buttonWrapper}>
                <CustomButton
                    displayText="Log out"
                    func={handleLogOut}
                />
                <CustomButton
                    displayText="Home"
                    func={handleHome}
                />
            </div>
        </div>
    )
}

export default TopNavBar
