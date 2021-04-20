import React, { useState, useEffect } from 'react'
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import SearchBar from '../../components/SearchBar/SearchBar';

import styles from './BasicHomeScreen.module.css';
import GeneralNewsCard from '../../components/GeneralNewsCard/GeneralNewsCard';

// API KEY for newsapi: 6f3b269cd1974ca58522d326e9556f0c
function BasicHomeScreen() {
    const [newsList, setNewsList] = useState([]);

    async function getGeneralNews () {
        const companyFullName = 'ASX';
        const response = await fetch(`https://newsapi.org/v2/everything?q=${companyFullName}&language=en&sortBy=publishedAt&apiKey=6f3b269cd1974ca58522d326e9556f0c`)
        if (response.status == 429) {
            setNewsList([]);
        } else {
            const body = await response.json();
            const articles = await body.articles;
            setNewsList(articles);
        }
    }

    useEffect(() => {
        getGeneralNews();
    }, []);

    return (
        <div className={styles.container}>
            <TopNavBar 
                version={1}
            />
            <div className={styles.subContainer}>
                <div className={styles.companySearch}>
                    <h1>
                        Search for a Company
                    </h1>
                    <SearchBar />
                </div>
                <h2>General ASX News</h2>
                <div className={styles.watchListandNewsContainer}>
                    <div className={styles.newsContainer}>
                        {newsList.map((article) => (
                        <div className={styles.newsCardContainer}>
                            <GeneralNewsCard 
                                newsArticle={article}
                            />
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasicHomeScreen
