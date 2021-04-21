import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import {
    Button,
    Container,
} from '@material-ui/core';

import styles from './ViewWatchlistContainer.module.css';
import CustomTextField from '../CustomTextField/CustomTextField';
import CustomButton from '../CustomButton/CustomButton';
// Functional class for viewing watchlists.
function ViewWatchlistContainer() {
    const history = useHistory();

    // Set State variables.
    const [watchlistName, setWatchlistName] = useState('');
    const [newAssetName, setNewAssetName] = useState('');
    const [assets, setAssets] = useState([]);
    const [aggregateInfo, setAggregateInfo] = useState({});
    const { watchlistID } = useParams();

    // function to get all the watchlists for the user.
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

    // Function to get assets for the watchlists.
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

    // Button action for back.
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

    // Button action to for viewing asset.
    const viewAsset = async (id) => {
      history.push(`/watchlist/${watchlistID}/asset/${id}`);
    }

    // Button action for delete button.
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
          <h2 className={styles.headings}>Viewing watchlist: {watchlistName}</h2>
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
          <h2 className={styles.headings}>Add new asset</h2>
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
          <h2 className={styles.headings}>Watchlist assets</h2>
            <div className={styles.assetBox}>
            { assets?.sort((a, b) => a[1].localeCompare(b[1])).map((a) => (
                <div key={a[0]} className={styles.assetCard}>
                  <div className={styles.tickerName}>
                    {a[1]}
                  </div>
                  <CustomButton 
                    displayText="View Asset"
                    func={() => viewAsset(a[0])}
                  />
                  <CustomButton 
                    displayText="Delete Asset"
                    func={() => deleteAsset(a[0])}
                  />
                </div>
            ))}
            </div>
        </Container>
      </>
    )
}

export default ViewWatchlistContainer
