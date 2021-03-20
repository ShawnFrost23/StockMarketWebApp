import React from 'react';
import styles from './WatchListCards.module.css';

import AssessmentIcon from '@material-ui/icons/Assessment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function WatchListCards({ id, watchListName, viewFunc, editFunc, deleteFunc}) {
    return (
        <div key={id} className={styles.container}>
            <div className={styles.headingName}>{watchListName}</div>
            <AssessmentIcon style={{color: 'green'}} onClick={viewFunc}/>
            <EditIcon style={{color: 'blue'}} onClick={editFunc}/>
            <DeleteIcon style={{color: 'red'}} onClick={deleteFunc}/>
        </div>
    )
}

export default WatchListCards;
