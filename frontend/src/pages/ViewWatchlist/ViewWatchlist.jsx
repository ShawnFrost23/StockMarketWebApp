import React from 'react'
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import ViewWatchlistContainer from '../../components/ViewWatchlistContainer/ViewWatchlistContainer';

import styles from './ViewWatchlist.module.css';

// Functional class for viewing watchlist screen.
function ViewWatchlist() {
    return (
        <div className={styles.container}>
            <TopNavBar />
            <ViewWatchlistContainer />
        </div>
    )
}

export default ViewWatchlist
