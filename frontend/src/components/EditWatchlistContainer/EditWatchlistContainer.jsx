import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Input,
    InputLabel,
} from '@material-ui/core';

// Functional Class for Editing Name of the Watchlist.
function WatchlistContainer() {
    // Initialise History
    const history = useHistory();

    // Set State Variables
    const [watchlistName, setWatchlistName] = useState('');
    const [watchlistNameInput, setWatchlistNameInput] = useState('');
    const { watchlistID } = useParams();

    // Call use effect
    useEffect(() => {
      async function getWatchlistInfo() {
        const request_options = {
            method: 'GET',
        }

        const res = await fetch('/watchlist?' + new URLSearchParams({
            watchlist_id: watchlistID,
        }), request_options);

        const jsonResponse = await res.json();
        setWatchlistName(jsonResponse[2]);
        setWatchlistNameInput(jsonResponse[2]);
      }

      if (localStorage.getItem('user_id') === null) {
        history.push('/loginScreen');
        return;
      }
      getWatchlistInfo();
    }, [watchlistID, history]);

    // Function to update name
    const updateName = (str) => {
      setWatchlistNameInput(str);
      setWatchlistName(str);
    }

    // Button Action for saving changes
    const saveChanges = async () => {
      const request_options = {
          method: 'POST',
      }

      const res = await fetch('/watchlists/rename?' + new URLSearchParams({
          watchlist_id: watchlistID,
          watchlist_name: watchlistName,
      }), request_options);

      const jsonResponse = await res.json();
    }

    // Button Action for going back
    const toAllWatchlists = () => {
      history.push("/advanceHome")
    }

    return (
      <>
        <Container maxWidth="sm">
          <h2>Editing watchlist: {watchlistName}</h2>
          <Box>
            <Card>
              <CardContent id="editWatchlist">
                <InputLabel>
                  Watchlist name
                  <Box m={1}>
                    <Input type="text" value={watchlistNameInput} onChange={(event) => updateName(event.target.value)} />
                  </Box>
                </InputLabel>
                <Button variant="contained" color="primary" onClick={() => saveChanges()}>
                  Save changes
                </Button>
              </CardContent>
            </Card>
            <Button color="primary" onClick={() => toAllWatchlists()}>
              Back to all watchlists
            </Button>
          </Box>
        </Container>
      </>
    )
}

export default WatchlistContainer
