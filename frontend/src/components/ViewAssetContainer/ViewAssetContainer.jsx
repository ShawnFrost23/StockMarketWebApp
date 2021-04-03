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
    Typography,
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

    const toWatchlist = () => {
      history.push(`/watchlist/${watchlistID}`)
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
        <Container maxWidth="sm">
          <h2>{assetInfo['company_name']}</h2>
          <Box key="assetOverview" my={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography>
                  Last price: {assetInfo['last_price']}
                </Typography>
                <Typography>
                  Daily change: {assetInfo['daily_nominal_change']}
                </Typography>
                <Typography>
                  Daily % change: {assetInfo['daily_percentage_change']}
                </Typography>
                <Typography>
                  Weekly change: {assetInfo['weekly_nominal_change']}
                </Typography>
                <Typography>
                  Weekly % change: {assetInfo['weekly_percentage_change']}
                </Typography>
                <Typography>
                  Monthly change: {assetInfo['monthly_nominal_change']}
                </Typography>
                <Typography>
                  Monthly % change: {assetInfo['monthly_percentage_change']}
                </Typography>
                <Typography>
                  Yearly change: {assetInfo['yearly_nominal_change']}
                </Typography>
                <Typography>
                  Yearly % change: {assetInfo['yearly_percentage_change']}
                </Typography>
                <Typography>
                  Volume: {assetInfo['volume']}
                </Typography>
                <Typography>
                  Market cap: {assetInfo['market_cap']}
                </Typography>
              </CardContent>
            </Card>
            <Button color="primary" onClick={() => toWatchlist()}>
              Back to watchlist
            </Button>
          </Box>
        </Container>
      </>
    )
}

export default ViewAssetContainer
