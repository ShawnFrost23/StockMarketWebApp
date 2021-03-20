import React, { useState, useEffect } from 'react';
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

import styles from './WatchListContainer.module.css';
import CustomButton from '../CustomButton/CustomButton';
import CustomTextField from '../CustomTextField/CustomTextField';

function WatchlistContainer() {
    const history = useHistory();
    const [watchlists, setWatchlists] = useState([]);
    const [name, setName] = useState('');
    const [nameErr, setNameErr] = React.useState(false)
    const [nameHelpText, setNameHelpText] = React.useState('');

    const getWatchlists = async () => {
        const request_options = {
            method: 'GET',
        }

        const res = await fetch('/watchlists' + '?' + new URLSearchParams({
            user_id: localStorage.getItem('user_id'),
        }), request_options);

        const jsonResponse = await res.json();
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

    const checkWatchlistName = (name) => {
      if (name === '') {
        setNameHelpText('Enter Watchlist Name');
        return false;
      }
      return true;
    }

    const createWatchlist = async (event) => {
      
      event.preventDefault();
      const watchlistNameStatus = checkWatchlistName(name);

      if (watchlistNameStatus == false) {
        setNameErr(true);
      } else {
        setNameErr(false);
        setNameHelpText('');
        const request_options = {
          method: 'POST',
        }

        const res = await fetch('/watchlists/create' + '?' + new URLSearchParams({
            user_id: localStorage.getItem('user_id'),
            watchlist_name: name,
        }), request_options);

        setName('');
        getWatchlists();
      }
      
    }

    const viewWatchlist = (id) => {
      history.push(`watchlist/${id}`);
    }

    const editWatchlist = (id) => {
      history.push(`watchlist/edit/${id}`);
    }

    const deleteWatchlist = async (id) => {
      const request_options = {
          method: 'DELETE',
      }

      await fetch('/watchlists/delete' + '?' + new URLSearchParams({
          user_id: localStorage.getItem('user_id'),
          watchlist_id: id,
      }), request_options);

      getWatchlists();
    }

    return (
      <>
        <div className={styles.container}>
          <h2>Create a new watchlist</h2>
          <div className={styles.watchlistContainer}>
            <CustomTextField 
              placeholder="Name"
              setValue={setName}
              errorStatus={nameErr}
              helperText={nameHelpText}
            />
            <CustomButton
              displayText="Create"
              func={createWatchlist}
            />
          </div>
          <h2>Your watchlists</h2>
          { watchlists?.sort((a, b) => a[1].localeCompare(b[1])).map((w) => (
            <Box key={w[0]} my={2}>
              <Card variant="outlined">
                <CardContent>
                  <CardHeader className="title" title={w[1]}>
                  </CardHeader>
                  <Button color="primary" variant="contained" onClick={() => viewWatchlist(w[0])}>
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
        </div>
      </>
    )

}

export default WatchlistContainer
