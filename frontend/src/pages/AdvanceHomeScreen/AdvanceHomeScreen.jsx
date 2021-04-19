import React from 'react'
import GeneralNewsContainer from '../../components/GeneralNewsContainer/GeneralNewsContainer';
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import WatchlistContainer from '../../components/WatchlistContainer/WatchlistContainer';

import styles from './AdvanceHomeScreen.module.css';

// API KEY for newsapi: 6f3b269cd1974ca58522d326e9556f0c
function AdvanceHomeScreen() {
    const [watchLists, setWatchLists] = React.useState([]);
    
    return (
        <>
            <TopNavBar />
            <WatchlistContainer />
            <GeneralNewsContainer />
        </>
    )
}

export default AdvanceHomeScreen
