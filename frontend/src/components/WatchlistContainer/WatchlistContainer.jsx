import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

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
            <h2>Your watchlists:</h2>
            {/* TODO DZ SORT */}
            { watchlists?.map((w) => (
                w[1]
            ))}
        </>
    )

}

export default WatchlistContainer
