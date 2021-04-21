import React from 'react'
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import ViewAssetContainer from '../../components/ViewAssetContainer/ViewAssetContainer';

import styles from './ViewAsset.module.css';

// Functional class for viewing asset.
function ViewAsset() {
    return (
        <div className={styles.container}> 
            <TopNavBar />
            <ViewAssetContainer />
        </div>
    )
}

export default ViewAsset
