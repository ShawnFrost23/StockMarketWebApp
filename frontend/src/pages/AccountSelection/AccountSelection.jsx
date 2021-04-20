import React from 'react'
import { useHistory } from 'react-router-dom';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import styles from './AccountSelection.module.css';

function AccountSelection() {
    const history = useHistory();

    const handleBasicAccountSelection = () => {
        history.push('basicHome');
    }
    const handleAdvanceAccountSelection = () => {
        history.push('loginScreen');
    }
    return (
        <div className={styles.container}>
            <div className={styles.accountType} onClick={handleBasicAccountSelection}>
               <h2>Basic Account</h2> 
               <div className={styles.accountDetails}>
                    <div className={styles.row}>
                        <CheckBoxIcon 
                            style={{fontSize: "20pt" , color: "green"}}
                        />
                        Search and View Graphs for various ASX listed Companies
                    </div>
                    <div className={styles.row}>
                        <CheckBoxIcon 
                            style={{fontSize: "20pt" , color: "green"}}
                        />
                        Get trading information regarding various ASX listed Companies
                    </div>
                    <div className={styles.row}>
                        <CheckBoxIcon 
                            style={{fontSize: "20pt" , color: "green"}}
                        />
                        Get General News about the market
                    </div>
               </div>
            </div>
            <div className={styles.accountType} onClick={handleAdvanceAccountSelection}>
               <h2>Advance Account</h2> 
               <div className={styles.accountDetails}>
                    <div className={styles.row}>
                        <CheckBoxIcon 
                            style={{fontSize: "20pt" , color: "green"}}
                        />
                        Everything in basic account 
                    </div>
                    <div className={styles.row}>
                        <CheckBoxIcon 
                            style={{fontSize: "20pt" , color: "green"}}
                        />
                        Create and edit watchlists to manage portfolios
                    </div>
                    <div className={styles.row}>
                        <CheckBoxIcon 
                            style={{fontSize: "20pt" , color: "green"}}
                        />
                        Get customised news regarding assets you observe
                    </div>
                    <div className={styles.row}>
                        <CheckBoxIcon 
                            style={{fontSize: "20pt" , color: "green"}}
                        />
                        Get emailed summary of watchlist performance
                    </div>
                    <div className={styles.row}>
                        <CheckBoxIcon 
                            style={{fontSize: "20pt" , color: "green"}}
                        />
                        Get machine learning assisted predicted analysis
                    </div>
                    <div className={styles.row}>
                        <CheckBoxIcon 
                            style={{fontSize: "20pt" , color: "green"}}
                        />
                        Save your information to access anytime, anywhere
                    </div>
               </div>
            </div>
        </div>
    )
}

export default AccountSelection
