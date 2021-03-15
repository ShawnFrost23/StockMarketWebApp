import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container
} from '@material-ui/core';

function WatchlistContainer() {
    const history = useHistory();
    const [watchlists, setWatchlists] = useState([]);
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

    return (
      <>
        <Container maxWidth="sm">
          <h2>Your watchlists:</h2>
          { watchlists?.sort((a, b) => a[1].localeCompare(b[1])).map((w) => (
            <Box key={w[0]} my={2}>
              <Card variant="outlined">
                <CardContent>
                  <CardHeader className="title" title={w[1]}>
                  </CardHeader>
                  <Button color="primary" variant="contained">
                    View Assets
                  </Button>
                  <Button color="primary" variant="outlined">
                    Edit Watchlist
                  </Button>
                  <Button color="secondary" variant="outlined">
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
