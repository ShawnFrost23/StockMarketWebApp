import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import GeneralNewsCard from '../GeneralNewsCard/GeneralNewsCard';

import styles from './GeneralNewsContainer.module.css';

// API KEY for newsapi: 6f3b269cd1974ca58522d326e9556f0c

function GeneralNewsContainer() {
    const [newsList, setNewsList] = useState([]);
    const history = useHistory();

    async function getNews(queryName) {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${queryName}&language=en&sortBy=publishedAt&apiKey=6f3b269cd1974ca58522d326e9556f0c`)
        const body = await response.json();
        const articles = await body.articles;
        console.log("🚀 ~ file: GeneralNewsContainer.jsx ~ line 16 ~ getNews ~ response", articles)
        setNewsList(articles);
    }

    useEffect(() => {
        const displayNews = async () => {
            getNews('Google');
        }

        if (localStorage.getItem('user_id') === null) {
            history.push('/loginScreen');
        }

        displayNews();
    }, [history])

    return (
        <div className={styles.container}>
            News Container
            {newsList.map((article) => (
                <GeneralNewsCard 
                    newsArticle={article}
                />
            ))}
        </div>
    )
}

export default GeneralNewsContainer
