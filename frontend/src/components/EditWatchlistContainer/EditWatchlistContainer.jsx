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

function WatchlistContainer() {
    const history = useHistory();

    const [watchlistName, setWatchlistName] = useState('');
    const [watchlistNameInput, setWatchlistNameInput] = useState('');
    const { watchlistID } = useParams();

    useEffect(() => {
      async function getWatchlistInfo() {
        const request_options = {
            method: 'GET',
        }

        const res = await fetch('/watchlist' + '?' + new URLSearchParams({
            watchlist_id: watchlistID,
        }), request_options);

        const jsonResponse = await res.json();
        console.log(jsonResponse);
        setWatchlistName(jsonResponse[2]);
        setWatchlistNameInput(jsonResponse[2]);
      }

      if (localStorage.getItem('user_id') === null) {
        history.push('/loginScreen');
        return;
      }
      getWatchlistInfo();
    }, [watchlistID, history]);

    const updateName = (str) => {
      setWatchlistNameInput(str);
      setWatchlistName(str);
    }

    const saveChanges = async () => {
      // DZ TODO connect up to backend - something like
      // await HTTP_PUT(`watchlist/edit/${watchlistID}`, watchlistNewName);
      console.log("Dummy PUT for watchlist edit id: " + watchlistID + " " + watchlistName);
    }

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
