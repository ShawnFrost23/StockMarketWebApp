import React from 'react'

import styles from './GeneralNewsCard.module.css';
function GeneralNewsCard( { newsArticle } ) {
    console.log(newsArticle);
    return (
        <div style={styles.container}>
            {/* <h5>{newsArticle.author}</h5> */}
        </div>
    )
}

export default GeneralNewsCard
