import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import AssetInformation from '../AssetInformation/AssetInformation';

// API KEY for newsapi: 6f3b269cd1974ca58522d326e9556f0c

// Functional class for viewing asset as a public user.
function ViewAssetPublicContainer() {
    const history = useHistory();
    // Set state variables.
    const [assetInfo, setAssetInfo] = useState({});
    const [newsList, setNewsList] = useState([]);

    const { ticker } = useParams();

    // Function to get all the asset information without userID or assetID.
    const getAssetInfo = async () => {
      const request_options = {
          method: 'GET',
      }

      const res = await fetch('/asset_public?' + new URLSearchParams({
          ticker: ticker,
      }), request_options);

      const jsonResponse = await res.json();
      setAssetInfo(jsonResponse);
      const companyFullName = await jsonResponse.company_name;
      const response = await fetch(`https://newsapi.org/v2/everything?q=${companyFullName}&language=en&sortBy=publishedAt&apiKey=6f3b269cd1974ca58522d326e9556f0c`)
      const body = await response.json();
      const articles = await body.articles;
      setNewsList(articles);
    }

    useEffect(() => {
      getAssetInfo();
    }, [history]);

    return (
      <>
        <AssetInformation 
          assetInfo={assetInfo}
          newsList={newsList}
        />
      </>
    )
}

export default ViewAssetPublicContainer
