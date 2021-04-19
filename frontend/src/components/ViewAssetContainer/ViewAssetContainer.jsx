import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Typography,
} from '@material-ui/core';
import TradingViewWidget from 'react-tradingview-widget';
import styles from './ViewAssetContainer.module.css';
import GeneralNewsCard from '../GeneralNewsCard/GeneralNewsCard';

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

      const res = await fetch('/asset' + '?' + new URLSearchParams({
          asset_id: assetID,
      }), request_options);

      const jsonResponse = await res.json();
      setAssetInfo(jsonResponse);
      const companyFullName = await jsonResponse.company_name;
      const response = await fetch(`https://newsapi.org/v2/everything?q=${companyFullName}&language=en&sortBy=publishedAt&apiKey=6f3b269cd1974ca58522d326e9556f0c`)
      const body = await response.json();
      const articles = await body.articles;
      setNewsList(articles);
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
        <Container maxWidth="sm">
          <h2>{assetInfo['company_name']}</h2>
          <Box key="assetOverview" my={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography>
                  Last price: {assetInfo['last_price']}
                </Typography>
                <Typography>
                  Daily change: {assetInfo['daily_nominal_change']}
                </Typography>
                <Typography>
                  Daily % change: {assetInfo['daily_percentage_change']}
                </Typography>
                <Typography>
                  Weekly change: {assetInfo['weekly_nominal_change']}
                </Typography>
                <Typography>
                  Weekly % change: {assetInfo['weekly_percentage_change']}
                </Typography>
                <Typography>
                  Monthly change: {assetInfo['monthly_nominal_change']}
                </Typography>
                <Typography>
                  Monthly % change: {assetInfo['monthly_percentage_change']}
                </Typography>
                <Typography>
                  Yearly change: {assetInfo['yearly_nominal_change']}
                </Typography>
                <Typography>
                  Yearly % change: {assetInfo['yearly_percentage_change']}
                </Typography>
                <Typography>
                  Volume: {assetInfo['volume']}
                </Typography>
                <Typography>
                  Market cap: {assetInfo['market_cap']}
                </Typography>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <Typography>
                  Forward price to equity ratio: {assetInfo['forward_PE']}
                </Typography>
                <Typography>
                  Trailing price to equity ratio: {assetInfo['trailing_PE']}
                </Typography>
                <Typography>
                  Dividend payout ratio: {assetInfo['payout_ratio']}
                </Typography>
                <Typography>
                  Dividend yield: {assetInfo['dividend_yield']}
                </Typography>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <Typography>
                  Overall rating: {assetInfo['predictions_signal']}
                </Typography>
                <Typography>
                  Buy signals: {assetInfo['predictions_buy']}
                </Typography>
                <Typography>
                  Hold signals: {assetInfo['predictions_hold']}
                </Typography>
                <Typography>
                  Sell signals: {assetInfo['predictions_sell']}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
        <Container maxWidth="md">
          <Card>
            <TradingViewWidget symbol={`ASX:${assetInfo['ticker']}`}/>
          </Card>
          <Button color="primary" onClick={() => toWatchlist()}>
            Back to watchlist
          </Button>
        </Container>
        <div className={styles.container}>
            News Container
            {newsList.map((article) => (
                <GeneralNewsCard 
                    newsArticle={article}
                />
            ))}
        </div>
      </>
    )
}

export default ViewAssetContainer
