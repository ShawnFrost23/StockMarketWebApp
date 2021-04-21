import React from 'react';
import styles from './WatchListCards.module.css';

import AssessmentIcon from '@material-ui/icons/Assessment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// Function to display wathclit cards on advance home screen.
function WatchListCards({ id, watchListName, viewFunc, editFunc, deleteFunc}) {
    return (
        <div key={id} className={styles.container}>
            <div className={styles.headingName}>{watchListName}</div>
            <div className={styles.icons}>
                <AssessmentIcon style={{color: 'green', fontSize: '35px'}} onClick={viewFunc}/>
                <EditIcon style={{color: 'blue', fontSize: '35px'}} onClick={editFunc}/>
                <DeleteIcon style={{color: 'red', fontSize: '35px'}} onClick={deleteFunc}/>
            </div>
        </div>
    )
}

export default WatchListCards;
