import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Input,
    InputLabel,
    Typography,
} from '@material-ui/core';

import styles from './ViewWatchlistContainer.module.css';
import CustomTextField from '../CustomTextField/CustomTextField';
import CustomButton from '../CustomButton/CustomButton';
function ViewWatchlistContainer() {
    const history = useHistory();

    const [watchlistName, setWatchlistName] = useState('');
    const [newAssetName, setNewAssetName] = useState('');
    const [assets, setAssets] = useState([]);
    const [aggregateInfo, setAggregateInfo] = useState({});
    const { watchlistID } = useParams();

    const getWatchlist = async () => {
      const request_options = {
          method: 'GET',
      }

      const res = await fetch('/watchlist?' + new URLSearchParams({
          watchlist_id: watchlistID,
      }), request_options);

      const jsonResponse = await res.json();
      setWatchlistName(jsonResponse[2]);

      const aggregateRes = await fetch('/watchlist/aggregate_data?' + new URLSearchParams({
          watchlist_id: watchlistID,
      }), request_options);

      const aggregateJsonResponse = await aggregateRes.json();
      setAggregateInfo(aggregateJsonResponse);
    }

    const getAssets = async () => {
      const request_options = {
        method: 'GET',
      }

      const res = await fetch('/watchlist/assets?' + new URLSearchParams({
          watchlist_id: watchlistID,
      }), request_options);

      const jsonResponse = await res.json();
      setAssets(jsonResponse);
    }

    useEffect(() => {
      const displayAssets = async () => {
        getWatchlist();
        getAssets();
      }

      if (localStorage.getItem('user_id') === null) {
        history.push('/loginScreen');
        return;
      }

      displayAssets();
    }, [watchlistID, history]);

    const toAllWatchlists = () => {
      history.push("/advanceHome")
    }

    const createAsset = async (event) => {
      event.preventDefault();
      const request_options = {
          method: 'POST',
      };

      const res = await fetch('/watchlists/add_asset?' + new URLSearchParams({
          watchlist_id: watchlistID,
          ticker: newAssetName,
      }), request_options);

      setNewAssetName('');
      getAssets();
    }

    const viewAsset = async (id) => {
      history.push(`/watchlist/${watchlistID}/asset/${id}`);
    }

    const deleteAsset = async (id) => {
      const request_options = {
          method: 'DELETE',
      };

      const res = await fetch('/watchlists/delete_asset?' + new URLSearchParams({
          asset_id: id,
      }), request_options);

      getAssets();
    }

    return (
      <>
        <Container maxWidth="xl">
          <h2>Viewing watchlist: {watchlistName}</h2>
          <div className={styles.watchlistInfo}>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Daily Change
              </div>
              <div className={styles.changeNumber}>
                {aggregateInfo['daily_percentage_changes']}
              </div>
            </div>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Weekly Change
              </div>
              <div className={styles.changeNumber}>
                {aggregateInfo['weekly_percentage_changes']}
              </div>
            </div>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Monthly Change
              </div>
              <div className={styles.changeNumber}>
                {aggregateInfo['monthly_percentage_changes']}
              </div>
            </div>
            <div className={styles.changeInfo}>
              <div className={styles.changeCategory}>
                Yearly Change
              </div>
              <div className={styles.changeNumber}>
                {aggregateInfo['yearly_percentage_changes']}
              </div>
            </div>
          </div>
          <h2>Add new asset</h2>
          <div className={styles.addTicker}>
            <CustomTextField 
              placeholder="ASX Ticker"
              setValue={setNewAssetName}
              lightVersion={true}
            />
            <CustomButton 
              displayText="Add asset"
              func={createAsset}
            />
          </div>
          <Button color="primary" onClick={() => toAllWatchlists()}>
            Back to all watchlists
          </Button>
          <h2>Watchlist assets</h2>
          { assets?.sort((a, b) => a[1].localeCompare(b[1])).map((a) => (
            <div className={styles.assetCard}>
              <Box key={a[0]} my={2}>
                <Card variant="outlined">
                  <CardContent>
                    <CardHeader className="title" title={a[1]}>
                    </CardHeader>
                    <Button color="primary" variant="contained" onClick={() => viewAsset(a[0])}>
                      View asset
                    </Button>
                    <Button color="secondary" variant="outlined" onClick={() => deleteAsset(a[0])}>
                      Delete asset
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </div>
          ))}
        </Container>
      </>
    )
}

export default ViewWatchlistContainer
