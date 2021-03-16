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
    const { watchlistID } = useParams();

    useEffect(() => {
      async function getWatchlistInfo() {
        // DZ TODO link to backend get function
        // const data = await HTTP_GET(`watchlist/${watchlistID}`);
        // DZ TODO check name will be data[1]
        // setWatchlistName(data[1]);
        // setWatchlistNameInput(data[1]);

        setWatchlistName('to the moon');
      }

      if (localStorage.getItem('user_id') === null) {
        history.push('/loginScreen');
        return;
      }
      getWatchlistInfo();
    }, [watchlistID, history]);

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
            {/* <Card>
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
            </Button> */}
          </Box>
        </Container>
      </>
    )
}

export default ViewWatchlistContainer
