import React from 'react'
import EditWatchlistContainer from '../../components/EditWatchlistContainer/EditWatchlistContainer';
import TopNavBar from '../../components/TopNavBar/TopNavBar';

import styles from './EditWatchlist.module.css';

// Functional class for edit watchlist screen.
function EditWatchlist() {
    return (
        <div className={styles.container}>
            <TopNavBar />
            <EditWatchlistContainer />
        </div>
    )
}

export default EditWatchlist
