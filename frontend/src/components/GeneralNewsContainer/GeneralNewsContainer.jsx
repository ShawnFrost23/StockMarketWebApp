import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import GeneralNewsCard from '../GeneralNewsCard/GeneralNewsCard';

import styles from './GeneralNewsContainer.module.css';

// API KEY for newsapi: 6f3b269cd1974ca58522d326e9556f0c

function GeneralNewsContainer() {
    const [newsList, setNewsList] = useState([]);
    const [assetList, setAssetList] = useState([]);
    const history = useHistory();
    const companyList = ['Amazon', 'Google'];

    async function getNews( comapnyList ) {
        const articleList = [];
        for ( let index = 0; index < comapnyList.length; index++) {
            const companyName = comapnyList[index];
            const response = await fetch(`https://newsapi.org/v2/top-headlines?q=${companyName}&language=en&sortBy=publishedAt&apiKey=6f3b269cd1974ca58522d326e9556f0c`)
            const body = await response.json();
            const articles = await body.articles;
            if (articles.length > 5) {
                articleList.push(articles[0]);
                articleList.push(articles[1]);
            } else if (articles.length > 0) {
                articleList.push(articles[0]);
            } 
        }
        console.log("🚀 ~ file: GeneralNewsContainer.jsx ~ line 32 ~ getNews ~ response", articleList)
        setNewsList(articleList);
    }

    const getCompaniesFromWatchlists = async () => {
        const request_options = {
            method: 'GET',
        }

        const res = await fetch('/watchlists' + '?' + new URLSearchParams({
            user_id: localStorage.getItem('user_id'),
        }), request_options);

        const jsonResponse = await res.json();
        const newList = [];
        for (let index = 0; index < jsonResponse.length; index++) {
            const watchList = jsonResponse[index];
            const listID = watchList[0];
            const assetRes = await fetch('/watchlist/assets' + '?' + new URLSearchParams({
                watchlist_id: listID,
            }), request_options);
            const assetJsonResponse = await assetRes.json();
            for (let j = 0; j < assetJsonResponse.length; j++) {
                const assetTicker = await assetJsonResponse[j][1];
                newList.push(assetTicker)
            }        
        }
        console.log("🚀 ~ file: GeneralNewsContainer.jsx ~ line 49", newList);
        setAssetList(newList);
    }

    useEffect(() => {
        const displayNews = async () => {

            getNews(companyList);
            getCompaniesFromWatchlists();
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
