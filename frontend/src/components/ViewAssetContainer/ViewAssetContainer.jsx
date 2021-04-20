import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import {
    Card,
    Button,
    Container,
    Typography,
    CardContent,
} from '@material-ui/core';
import TradingViewWidget from 'react-tradingview-widget';
import styles from './ViewAssetContainer.module.css';
import GeneralNewsCard from '../GeneralNewsCard/GeneralNewsCard';
import AssetInformation from '../AssetInformation/AssetInformation';

// API KEY for newsapi: 6f3b269cd1974ca58522d326e9556f0c

function ViewAssetContainer() {
    const history = useHistory();
    const [assetInfo, setAssetInfo] = useState({});
    const [newsList, setNewsList] = useState([]);

    const { watchlistID } = useParams();
    const { assetID } = useParams();

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
      if (response.status == 429) {
        setNewsList([]);
      } else {
        const body = await response.json();
        const articles = await body.articles;
        setNewsList(articles);
      }
    }

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
        {/* <Container maxWidth="xl">
          <h2>{assetInfo['company_name']}</h2>
          <Button color="primary" onClick={() => toWatchlist()}>
            Back to watchlist
          </Button>
          <>
            <TradingViewWidget symbol={`ASX:${assetInfo['ticker']}`}/>
          </>
        </Container>
        <div className={styles.companyInfoSection}>
          <div className={styles.infoSectionRow}>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Last Price
              </div>
              <div className={styles.changeNumber}>
                ${assetInfo['last_price']}
              </div>
            </div>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Market Cap
              </div>
              <div className={styles.changeNumber}>
                {assetInfo['market_cap']}
              </div>
            </div>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Volume
              </div>
              <div className={styles.changeNumber}>
                {assetInfo['volume']}
              </div>
            </div>
          </div>
          <div className={styles.infoSectionRow}>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Daily Change
              </div>
              <div className={styles.changeVariants}>
                <div className={styles.subChangeGroup}>
                  <div className={styles.subGroupHeading}>
                    Nominal
                  </div>
                  <div className={styles.subGroupNumber}>
                    {assetInfo['daily_nominal_change']}
                  </div>
                </div>
                <div className={styles.verticalLine}></div>
                <div className={styles.subChangeGroup}>
                  <div className={styles.subGroupHeading}>
                    Percentage
                  </div>
                  <div className={styles.subGroupNumber}>
                    {assetInfo['daily_percentage_change']}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Weekly Change
              </div>
              <div className={styles.changeVariants}>
                <div className={styles.subChangeGroup}>
                  <div className={styles.subGroupHeading}>
                    Nominal
                  </div>
                  <div className={styles.subGroupNumber}>
                    {assetInfo['weekly_nominal_change']}
                  </div>
                </div>
                <div className={styles.verticalLine}></div>
                <div className={styles.subChangeGroup}>
                  <div className={styles.subGroupHeading}>
                    Percentage
                  </div>
                  <div className={styles.subGroupNumber}>
                    {assetInfo['weekly_percentage_change']}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Monthly Change
              </div>
              <div className={styles.changeVariants}>
                <div className={styles.subChangeGroup}>
                  <div className={styles.subGroupHeading}>
                    Nominal
                  </div>
                  <div className={styles.subGroupNumber}>
                    {assetInfo['monthly_nominal_change']}
                  </div>
                </div>
                <div className={styles.verticalLine}></div>
                <div className={styles.subChangeGroup}>
                  <div className={styles.subGroupHeading}>
                    Percentage
                  </div>
                  <div className={styles.subGroupNumber}>
                    {assetInfo['monthly_percentage_change']}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Yearly Change
              </div>
              <div className={styles.changeVariants}>
                <div className={styles.subChangeGroup}>
                  <div className={styles.subGroupHeading}>
                    Nominal
                  </div>
                  <div className={styles.subGroupNumber}>
                    {assetInfo['yearly_nominal_change']}
                  </div>
                </div>
                <div className={styles.verticalLine}></div>
                <div className={styles.subChangeGroup}>
                  <div className={styles.subGroupHeading}>
                    Percentage
                  </div>
                  <div className={styles.subGroupNumber}>
                    {assetInfo['yearly_percentage_change']}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.infoSectionRow}>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Forward price to equity ratio
              </div>
              <div className={styles.changeNumber}>
                {assetInfo['forward_PE']}
              </div>
            </div>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Trailing price to equity ratio
              </div>
              <div className={styles.changeNumber}>
                {assetInfo['trailing_PE']}
              </div>
            </div>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Dividend payout ratio
              </div>
              <div className={styles.changeNumber}>
                {assetInfo['payout_ratio']}
              </div>
            </div>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Dividend yield
              </div>
              <div className={styles.changeNumber}>
                {assetInfo['dividend_yield']}
              </div>
            </div>
          </div>
          <div className={styles.infoSectionRow}>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Buy Signals
              </div>
              <div className={styles.changeNumber}>
                {assetInfo['predictions_buy']}
              </div>
            </div>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Hold Signals
              </div>
              <div className={styles.changeNumber}>
                {assetInfo['predictions_hold']}
              </div>
            </div>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Sell Signals
              </div>
              <div className={styles.changeNumber}>
                {assetInfo['predictions_sell']}
              </div>
            </div>
          </div>        
          <div className={styles.infoSectionRow}>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Overall Verdict
              </div>
              <div className={styles.changeNumber}>
                {assetInfo['predictions_signal']}
              </div>
            </div>
          </div>
        </div>
        <h1 className={styles.newsHeading}>News related to {assetInfo['company_name']}</h1>
        <div className={styles.newsContainer}>
            {newsList.map((article) => (
                <div className={styles.newsCardContainer}>
                  <GeneralNewsCard 
                    newsArticle={article}
                  />
                </div>
            ))}
        </div> */}
      </>
    )
}

export default ViewAssetContainer
