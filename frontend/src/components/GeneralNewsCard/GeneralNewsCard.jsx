import React from 'react'

import styles from './GeneralNewsCard.module.css';
function GeneralNewsCard( { newsArticle } ) {
    console.log(newsArticle);
    return (
        <div className={styles.container}>
            <h5>{newsArticle.author}</h5>
            <div className={styles.newsTitle}>
                {newsArticle.title}
            </div>
            <div className={styles.newsImage}>
                <img className={styles.newsImage} src={newsArticle.urlToImage} alt="Image"/>
            </div>
            <div className={styles.newsSourced}>
                Source <a href={newsArticle.url} target="_blank">{newsArticle.source.name}</a>
            </div>
        </div>
    )
}

export default GeneralNewsCard
