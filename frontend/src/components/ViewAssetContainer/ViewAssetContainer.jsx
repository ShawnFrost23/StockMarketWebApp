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

function ViewAssetContainer() {
    const history = useHistory();
    const [assetInfo, setAssetInfo] = useState({});

    const { watchlistID } = useParams();
    const { assetID } = useParams();

    const getAssetInfo = async () => {
      const request_options = {
          method: 'GET',
      }

      const res = await fetch('/asset' + '?' + new URLSearchParams({
          asset_id: assetID,
      }), request_options);

      const jsonResponse = await res.json();
      setAssetInfo(jsonResponse);
      console.log(jsonResponse);
      console.log(assetInfo['last_price']);
    }

    useEffect(() => {
      if (localStorage.getItem('user_id') === null) {
        history.push('/loginScreen');
        return;
      }

      getAssetInfo();
    }, [assetID, history]);

    return (
      <>
        <p>
          Last price: {assetInfo['last_price']}
        </p>
        <p>
          Change: {assetInfo['change']}
        </p>
        <p>
          Change %: {assetInfo['change_percent']}
        </p>
        <p>
          Volume: {assetInfo['volume']}
        </p>
        <p>
          Market cap: {assetInfo['market_cap']}
        </p>
        <p>
          52 week high: {assetInfo['fiftyTwoWeekHigh']}
        </p>
        <p>
          52 week low: {assetInfo['fiftyTwoWeekLow']}
        </p>
      </>
    )
}

export default ViewAssetContainer
