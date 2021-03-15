import React from 'react'
import TopNavBar from '../../components/TopNavBar/TopNavBar';

import styles from './AdvanceHomeScreen.module.css';
function AdvanceHomeScreen() {
    return (
        <>
            <TopNavBar />
            <div className={styles.container}>
                Advance Home Screen Content
            </div>
        </>
    )
}

export default AdvanceHomeScreen
