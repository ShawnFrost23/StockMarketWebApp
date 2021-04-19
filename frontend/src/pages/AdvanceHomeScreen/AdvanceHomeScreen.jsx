import React from 'react'
import GeneralNewsContainer from '../../components/GeneralNewsContainer/GeneralNewsContainer';
import SearchBar from '../../components/SearchBar/SearchBar';
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import WatchlistContainer from '../../components/WatchlistContainer/WatchlistContainer';

import styles from './AdvanceHomeScreen.module.css';

// API KEY for newsapi: 6f3b269cd1974ca58522d326e9556f0c
function AdvanceHomeScreen() {    
    return (
        <>
            <TopNavBar />
            <div>
                <div className={styles.companySearch}>
                    <h1>
                        Search for a Company
                    </h1>
                    <SearchBar />
                </div>
                <div className={styles.watchListandNewsContainer}>
                    <WatchlistContainer />
                    <GeneralNewsContainer />
                </div>
            </div>
        </>
    )
}

export default AdvanceHomeScreen
