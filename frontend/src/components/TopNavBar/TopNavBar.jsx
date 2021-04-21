import React from 'react'
import { useHistory } from 'react-router-dom';

import CustomButton from '../CustomButton/CustomButton';

// Functional class for Top Nav Bar. Used on most screens of the app with 2 variants.
import styles from './TopNavBar.module.css';
function TopNavBar({ version }) {
    const history = useHistory();

    // Button action for account selection button
    const handleAccountSelect = () => {
        history.push('/selectAccountType');
    }

    // Button Action for home button
    const handleHome = () => {
        history.push('/advanceHome')
    }

    // Button Action for logout button.
    const handleLogOut = () => {
        localStorage.clear();
        history.push('/loginScreen');
    }
    // Return accourding to the variant required.
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
