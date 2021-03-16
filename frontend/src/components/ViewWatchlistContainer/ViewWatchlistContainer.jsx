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

function ViewWatchlistContainer() {
    const history = useHistory();

    const [watchlistName, setWatchlistName] = useState('');
    const [newAssetName, setNewAssetName] = useState('New asset');
    const [assets, setAssets] = useState([]);
    const { watchlistID } = useParams();

    const getAssets = async () => {
      const request_options = {
        method: 'POST',
      }

      // DZ TODO get name of watchlist with ID
      setWatchlistName('to the moon');

      // DZ TODO link to backend HTTP GET of all assets with watchlist ID
      // const res =
      // setAssets(jsonResponse);
      setAssets([[1, 'GME'], [2, 'CBA']])
    }

    useEffect(() => {
      const displayAssets = async () => {
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

    const createAsset = (event) => {
      event.preventDefault();
      // DZ TODO HTTP POST watchlist
      console.log("POSTing new asset: " + newAssetName);
      setNewAssetName('');
      getAssets();
    }

    const deleteAsset = async (id) => {
      // DZ TODO link HTTP DELETE asset with backend function
      console.log("Dummy delete for asset with id: " + id);
      getAssets();
    }

    return (
      <>
        <Container maxWidth="sm">
          <h2>Viewing watchlist: {watchlistName}</h2>
          <h2>Add new asset</h2>
          <Box>
            {/* TODO get all assets */}
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
