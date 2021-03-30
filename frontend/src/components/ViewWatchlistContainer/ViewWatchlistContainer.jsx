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
} from '@material-ui/core';
import ViewAsset from '../../pages/ViewAsset/ViewAsset';

function ViewWatchlistContainer() {
    const history = useHistory();

    const [watchlistName, setWatchlistName] = useState('');
    const [newAssetName, setNewAssetName] = useState('');
    const [assets, setAssets] = useState([]);
    const { watchlistID } = useParams();

    const getWatchlist = async () => {
      const request_options = {
          method: 'GET',
      }

      const res = await fetch('/watchlist' + '?' + new URLSearchParams({
          watchlist_id: watchlistID,
      }), request_options);

      const jsonResponse = await res.json();
      setWatchlistName(jsonResponse[2]);
    }

    const getAssets = async () => {
      const request_options = {
        method: 'GET',
      }

      const res = await fetch('/watchlist/assets' + '?' + new URLSearchParams({
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

      const res = await fetch('/watchlists/add_asset' + '?' + new URLSearchParams({
          watchlist_id: watchlistID,
          ticker: newAssetName,
      }), request_options);

      setNewAssetName('');
      getAssets();
    }

    const viewAsset = async (id) => {
      history.push(`/asset/${id}`);
    }

    const deleteAsset = async (id) => {
      const request_options = {
          method: 'DELETE',
      };

      const res = await fetch('/watchlists/delete_asset' + '?' + new URLSearchParams({
          asset_id: id,
      }), request_options);

      getAssets();
    }

    return (
      <>
        <Container maxWidth="sm">
          <h2>Viewing watchlist: {watchlistName}</h2>
          <h2>Add new asset</h2>
          <Box>
            <Card>
              <CardContent id="addAsset">
                <form name="createAssetForm" onSubmit={createAsset}>
                  <InputLabel>
                    ASX ticker
                    <Box m={1}>
                      <Input type="text" value={newAssetName} onChange={(event) => setNewAssetName(event.target.value)} />
                    </Box>
                  </InputLabel>
                  <Box my={3}>
                    <Button type="submit" variant="contained" color="primary">Add asset</Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Box>
          <h2>Watchlist assets</h2>
          { assets?.sort((a, b) => a[1].localeCompare(b[1])).map((a) => (
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
          ))}
          <Button color="primary" onClick={() => toAllWatchlists()}>
            Back to all watchlists
          </Button>
        </Container>
      </>
    )
}

export default ViewWatchlistContainer
