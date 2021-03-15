import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
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
    const [watchlists, setWatchlists] = useState([]);

    const [name, setName] = useState('New watchlist');
    const getWatchlists = async () => {
        const request_options = {
            method: 'GET',
        }

        const res = await fetch('/watchlists' + '?' + new URLSearchParams({
            user_id: localStorage.getItem('user_id'),
        }), request_options);

//       if (res.status !== 200) {
//         const data = await res.json();
//         throw new Error(data.error);
//       }

        const jsonResponse = await res.json();
        console.log(jsonResponse);

        setWatchlists(jsonResponse);
    }

    useEffect(() => {
        const displayWatchlists = async () => {
            getWatchlists();
        }

        if (localStorage.getItem('user_id') === null) {
            history.push('/loginScreen');
        }
        displayWatchlists();
    }, [history]);

    const createWatchlist = async (event) => {
      event.preventDefault();
      // DZ TODO HTTP POST watchlist
      console.log("POSTing watchlist" + name);
      setName('');
      getWatchlists();
    }

    const editWatchlist = (id) => {
      history.push(`watchlist/edit/${id}`);
    }

    const deleteWatchlist = async (id) => {
      // DZ TODO link HTTP DELETE watchlist with backend function
      // await HTTP_DELETE(`watchlists/${id}`);
      console.log("Dummy delete for watchlist with id: " + id);
      getWatchlists();
    }

    return (
      <>
        <Container maxWidth="sm">
          <h2>Create a new watchlist</h2>
          <Box>
            <Card>
              <CardContent>
                <form name="createWatchlistForm" onSubmit={createWatchlist}>
                  <InputLabel>
                    Name
                    <Box my={1}>
                      <Input type="text" id="createWatchlistName" name="name" value={name} onChange={(event) => setName(event.target.value)} />
                    </Box>
                  </InputLabel>
                  <Box my={3}>
                    <Button type="submit" variant="contained" color="primary">Create Watchlist</Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Box>
          <h2>Your watchlists</h2>
          { watchlists?.sort((a, b) => a[1].localeCompare(b[1])).map((w) => (
            <Box key={w[0]} my={2}>
              <Card variant="outlined">
                <CardContent>
                  <CardHeader className="title" title={w[1]}>
                  </CardHeader>
                  <Button color="primary" variant="contained">
                    View Assets
                  </Button>
                  <Button color="primary" variant="outlined" onClick={() => editWatchlist(w[0])}>
                    Edit Watchlist
                  </Button>
                  <Button color="secondary" variant="outlined" onClick={() => deleteWatchlist(w[0])}>
                    Delete Watchlist
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Container>
      </>
    )

}

export default WatchlistContainer
