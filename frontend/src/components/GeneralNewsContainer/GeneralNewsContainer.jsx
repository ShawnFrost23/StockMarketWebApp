import React from 'react'

import styles from './GeneralNewsContainer.module.css';

// API KEY for newsapi: 6f3b269cd1974ca58522d326e9556f0c

function GeneralNewsContainer() {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('6f3b269cd1974ca58522d326e9556f0c');

    async function getNews(queryName) {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${queryName}&language=en&sortBy=publishedAt&apiKey=6f3b269cd1974ca58522d326e9556f0c`)
        // const response = await newsapi.v2.topHeadlines({
        //     sources: 'bbc-news,the-verge',
        //     q: 'bitcoin',
        //     category: 'business',
        //     language: 'en',
        //     country: 'us'
        //   })
        const body = await response.json();
        if (body) {
            console.log("🚀 ~ file: GeneralNewsContainer.jsx ~ line 22 ~ getNews ~ response", body)
        }
    }

    return (
        <div className={styles.container}>
            News Container
            {getNews('Amazon')}
        </div>
    )
}

export default GeneralNewsContainer
