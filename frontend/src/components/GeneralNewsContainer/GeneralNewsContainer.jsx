import React, {useState} from 'react'

import styles from './GeneralNewsContainer.module.css';

// API KEY for newsapi: 6f3b269cd1974ca58522d326e9556f0c

function GeneralNewsContainer() {
    const [newsList, setNewsList] = useState([]);

    async function getNews(queryName) {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${queryName}&language=en&sortBy=publishedAt&apiKey=6f3b269cd1974ca58522d326e9556f0c`)
        const body = await response.json();
        if (body.status === 'ok') {
            console.log("🚀 ~ file: GeneralNewsContainer.jsx ~ line 16 ~ getNews ~ response", body)

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
