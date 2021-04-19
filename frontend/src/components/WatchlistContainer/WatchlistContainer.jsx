import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import styles from './WatchListContainer.module.css';
import CustomTextField from '../CustomTextField/CustomTextField';
import WatchListCards from '../WatchListCards/WatchListCards';
import download from './download.png'; 
import SearchBar from '../SearchBar/SearchBar';


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

    const send_report = async (id) => {
      const request_options = {
        method: 'POST', 
      }

      await fetch('/send_automated_report' + '?' + new URLSearchParams({
        user_id: localStorage.getItem('user_id'),
      }), request_options);
    }

    return (
      <>
        <div className={styles.container}>
          <div className={styles.download}>
            <img src={download} alt="download icon" 
              width="50" 
              height="50" 
              style= {{cursor: "pointer"}}
              onClick={(event) => send_report(event)}/>
          </div>
          <h2>Create a new watchlist</h2>
          <div className={styles.watchlistContainer}>
            <SearchBar/>      
            <CustomTextField 
              lightVersion={true}
              placeholder="Name"
              setValue={setName}
              errorStatus={nameErr}
              helperText={nameHelpText}
              size="small"
            />
            <AddCircleOutlineIcon 
              onClick={(event) => createWatchlist(event)}
              style={{fontSize: "50pt" , color: "green"}}
            />
          </div>
          <h2>Your watchlists</h2>
          { watchlists?.sort((a, b) => a[1].localeCompare(b[1])).map((w) => (
            <WatchListCards 
              id={w[0]}
              watchListName={w[1]}
              viewFunc={() => viewWatchlist(w[0])}
              editFunc={() => editWatchlist(w[0])}
              deleteFunc={() => deleteWatchlist(w[0])}
            />
          ))}
        </div>
      </>
    )

}

export default WatchlistContainer
