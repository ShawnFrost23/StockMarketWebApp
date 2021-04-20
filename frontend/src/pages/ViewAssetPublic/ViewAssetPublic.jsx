import React from 'react'
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import ViewAssetPublicContainer from '../../components/ViewAssetPublicContainer/ViewAssetPublicContainer';

import styles from './ViewAssetPublic.module.css';
function ViewAssetPublic() {
    return (
        <div className={styles.container}>
            <TopNavBar 
                version={1}
            />
            <ViewAssetPublicContainer />
        </div>
    )
}

export default ViewAssetPublic
