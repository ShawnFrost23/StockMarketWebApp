import React from 'react'
import ViewAssetPublicContainer from '../../components/ViewAssetPublicContainer/ViewAssetPublicContainer';

import styles from './ViewAssetPublic.module.css';

// Functional class for viewing asset as a public user.
function ViewAssetPublic() {
    return (
        <div className={styles.container}>
            <ViewAssetPublicContainer />
        </div>
    )
}

export default ViewAssetPublic
