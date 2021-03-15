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
//     const [watchlists, setWatchlists] = useState([]);

//     const [name, setName] = useState('New watchlist');
//     const getWatchlists = async () => {
//         const request_options = {
//             method: 'GET',
//         }

//         const res = await fetch('/watchlists' + '?' + new URLSearchParams({
//             user_id: localStorage.getItem('user_id'),
//         }), request_options);

// //       if (res.status !== 200) {
// //         const data = await res.json();
// //         throw new Error(data.error);
// //       }

//         const jsonResponse = await res.json();
//         console.log(jsonResponse);

//         setWatchlists(jsonResponse);
    // }

    return (
      <>
        <Container maxWidth="sm">
          <h2>Edit watchlist</h2>
          <Box>
            <Card>
              <CardContent>
                {/* <form name="createWatchlistForm" onSubmit={createWatchlist}>
                  <InputLabel>
                    Name
                    <Box my={1}>
                      <Input type="text" id="createWatchlistName" name="name" value={name} onChange={(event) => setName(event.target.value)} />
                    </Box>
                  </InputLabel>
                  <Box my={3}>
                    <Button type="submit" variant="contained" color="primary">Create Watchlist</Button>
                  </Box>
                </form> */}
              </CardContent>
            </Card>
          </Box>
        </Container>
      </>
    )
}

export default WatchlistContainer
