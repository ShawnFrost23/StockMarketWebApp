import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import GeneralNewsCard from '../GeneralNewsCard/GeneralNewsCard';

import styles from './GeneralNewsContainer.module.css';

// API KEY for newsapi: 6f3b269cd1974ca58522d326e9556f0c

// Functional Class for general news contianer. Callin API to display news for
// customised news on advance home screen.
function GeneralNewsContainer() {
    // Set State Variables
    const [newsList, setNewsList] = useState([]);
    const history = useHistory();

    // Function to get news for all the assets in different watchlists for logged in user.
    const getNewsForTickers = async () => {
        const request_options = {
            method: 'GET',
        }

        // Fetch wathclists for user
        const res = await fetch("/watchlists?" + new URLSearchParams({
            user_id: localStorage.getItem('user_id'),
        }), request_options);

        const jsonResponse = await res.json();
        const newList = [];
        // For each watchlist, fetch the assest
        for (let index = 0; index < jsonResponse.length; index++) {
            const watchList = jsonResponse[index];
            const listID = watchList[0];
            const assetRes = await fetch('/watchlist/assets?' + new URLSearchParams({
                watchlist_id: listID,
            }), request_options);
            const assetJsonResponse = await assetRes.json();
            for (let j = 0; j < assetJsonResponse.length; j++) {
                const assetTicker = await assetJsonResponse[j][1];
                newList.push(assetTicker)
            }        
        }
        
        const comapnyList = newList;
        const request_options2 = {
            method: 'POST',
        }
        const articleList = [];
        // Get company name for the assests
        for ( let index = 0; index < comapnyList.length; index++) {
            const companyName = comapnyList[index];
            const tickerValidation = await fetch('/watchlists/ticker_validation?' + new URLSearchParams({
                ticker: companyName,
            }), request_options2);
            const tickerValidationBody = await tickerValidation.json();
            // Fetch News
            if (tickerValidationBody.success === true) {
                const companyFullName = await tickerValidationBody.company_name;
                const response = await fetch(`https://newsapi.org/v2/everything?q=${companyFullName}&language=en&sortBy=publishedAt&apiKey=6f3b269cd1974ca58522d326e9556f0c`)
                if (response.status === 429) {
                    // Do Nothing!
                } else {
                    const body = await response.json();
                    const articles = await body.articles;
                    if (articles.length > 5) {
                        articleList.push(articles[0]);
                        articleList.push(articles[1]);
                    } else if (articles.length > 0) {
                        articleList.push(articles[0]);
                    }
                }
            } else {
                console.log("🚀 ~ file: GeneralNewsContainer.jsx ~ line 39 False epose in ticker validation");
            }
        }
        console.log("🚀 ~ file: GeneralNewsContainer.jsx ~ line 32 ~ getNews ~ response", articleList)
        setNewsList(articleList);
    }

    // Call use effect.
    useEffect(() => {
        const displayNews = async () => {
            getNewsForTickers();
        }

        if (localStorage.getItem('user_id') === null) {
            history.push('/loginScreen');
        }

        displayNews();
    }, [history])

    return (
        <div className={styles.container}>
            <h2>News For You</h2>
            {newsList.map((article) => (
                <GeneralNewsCard 
                    newsArticle={article}
                />
            ))}
        </div>
    )
}

export default GeneralNewsContainer
