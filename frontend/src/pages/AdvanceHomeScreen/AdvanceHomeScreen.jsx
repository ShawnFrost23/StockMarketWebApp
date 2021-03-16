import React from 'react'
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import WatchlistContainer from '../../components/WatchlistContainer/WatchlistContainer';

import styles from './AdvanceHomeScreen.module.css';

function AdvanceHomeScreen() {
    const [watchLists, setWatchLists] = React.useState([]);
    
    return (
        <>  
            <TopNavBar />
            <WatchlistContainer />
        </>
    )
}

export default AdvanceHomeScreen
