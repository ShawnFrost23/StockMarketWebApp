import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import AssetInformation from '../AssetInformation/AssetInformation';

// API KEY for newsapi: 6f3b269cd1974ca58522d326e9556f0c

// Functional class for viewing asset for logged in user.
function ViewAssetContainer() {
    const history = useHistory();

    // Set State variables.
    const [assetInfo, setAssetInfo] = useState({});
    const [newsList, setNewsList] = useState([]);

    const { watchlistID } = useParams();
    const { assetID } = useParams();

    // Function to get all the asset relating information.
    const getAssetInfo = async () => {
      const request_options = {
          method: 'GET',
      }

      const res = await fetch('/asset?' + new URLSearchParams({
          asset_id: assetID,
      }), request_options);

      const jsonResponse = await res.json();
      setAssetInfo(jsonResponse);
      const companyFullName = await jsonResponse.company_name;
      const response = await fetch(`https://newsapi.org/v2/everything?q=${companyFullName}&language=en&sortBy=publishedAt&apiKey=6f3b269cd1974ca58522d326e9556f0c`)
      if (response.status === 429) {
        setNewsList([]);
      } else {
        const body = await response.json();
        const articles = await body.articles;
        setNewsList(articles);
      }
    }

    // Button action to go back.
    const toWatchlist = () => {
      history.push(`/watchlist/${watchlistID}`)
    }

    useEffect(() => {
      if (localStorage.getItem('user_id') === null) {
        history.push('/loginScreen');
        return;
      }

      getAssetInfo();
    }, [assetID, history]);

    return (
      <>
        <AssetInformation 
          assetInfo={assetInfo}
          newsList={newsList}
          displayTextForBackButton="Back to Watchlist"
          clickFunction={() => toWatchlist()}
        />
      </>
    )
}

export default ViewAssetContainer
