import React from 'react'

import styles from './GeneralNewsCard.module.css';

// Functional class for dispalying news. Common card to display news at different
// screens.
function GeneralNewsCard( { newsArticle } ) {
    return (
        <div className={styles.container}>
            <div className={styles.newsImage}>
                <img className={styles.newsImage} src={newsArticle.urlToImage} alt="News Article"/>
            </div>
            <div className={styles.newsInfo}>
                <div className={styles.newsTitle}>
                {newsArticle.title}
                </div>
                <h5 className={styles.newsAuthor}>By {newsArticle.author}</h5>
                <div className={styles.newsSource}>
                    Read more at <a rel="noreferrer" href={newsArticle.url} target="_blank">{newsArticle.source.name}</a>
                </div>
            </div>
        </div>
    )
}

export default GeneralNewsCard
