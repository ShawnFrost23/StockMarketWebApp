import React from 'react'

import styles from './GeneralNewsCard.module.css';
function GeneralNewsCard( { newsArticle } ) {
    return (
        <div className={styles.container}>
            <h5 className={styles.newsAuthor}>{newsArticle.author}</h5>
            <div className={styles.newsTitle}>
                {newsArticle.title}
            </div>
            <div className={styles.newsImage}>
                <img className={styles.newsImage} src={newsArticle.urlToImage} alt="News Article"/>
            </div>
            <div className={styles.newsSourced}>
                Source <a rel="noreferrer" href={newsArticle.url} target="_blank">{newsArticle.source.name}</a>
            </div>
        </div>
    )
}

export default GeneralNewsCard
