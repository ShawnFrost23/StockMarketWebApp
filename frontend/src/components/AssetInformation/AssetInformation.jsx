import React from 'react'
import {
    Button,
    Container,
} from '@material-ui/core';
import TradingViewWidget from 'react-tradingview-widget';
import styles from './AssetInformation.module.css';
import GeneralNewsCard from '../GeneralNewsCard/GeneralNewsCard';

// Common Functional Class displaying the asset container for registered and public user.
function AssetInformation({ assetInfo, newsList, displayTextForBackButton, clickFunction }) {
    return (
        <>
            <Container maxWidth="xl">
                <h2 className={styles.companyHeading}>{assetInfo['company_name']}</h2>
                <Button color="primary" onClick={clickFunction}>
                    {displayTextForBackButton}
                </Button>
                <>
                    <TradingViewWidget symbol={`ASX:${assetInfo['ticker']}`}/>
                </>
            </Container>
            <div className={styles.companyInfoSection}>
                <div className={styles.infoSectionRow}>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Last Price
                        </div>
                        <div className={styles.changeNumber}>
                            ${assetInfo['last_price']}
                        </div>
                    </div>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Market Cap
                        </div>
                        <div className={styles.changeNumber}>
                            {assetInfo['market_cap']}
                        </div>
                    </div>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Volume
                        </div>
                        <div className={styles.changeNumber}>
                            {assetInfo['volume']}
                        </div>
                    </div>
                </div>
                <div className={styles.infoSectionRow}>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Daily Change
                        </div>
                        <div className={styles.changeVariants}>
                            <div className={styles.subChangeGroup}>
                            <div className={styles.subGroupHeading}>
                                Nominal
                            </div>
                            <div className={styles.subGroupNumber}>
                                {assetInfo['daily_nominal_change']}
                            </div>
                            </div>
                            <div className={styles.verticalLine}></div>
                            <div className={styles.subChangeGroup}>
                            <div className={styles.subGroupHeading}>
                                Percentage
                            </div>
                            <div className={styles.subGroupNumber}>
                                {assetInfo['daily_percentage_change']}
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Weekly Change
                        </div>
                        <div className={styles.changeVariants}>
                            <div className={styles.subChangeGroup}>
                            <div className={styles.subGroupHeading}>
                                Nominal
                            </div>
                            <div className={styles.subGroupNumber}>
                                {assetInfo['weekly_nominal_change']}
                            </div>
                            </div>
                            <div className={styles.verticalLine}></div>
                            <div className={styles.subChangeGroup}>
                            <div className={styles.subGroupHeading}>
                                Percentage
                            </div>
                            <div className={styles.subGroupNumber}>
                                {assetInfo['weekly_percentage_change']}
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Monthly Change
                        </div>
                        <div className={styles.changeVariants}>
                            <div className={styles.subChangeGroup}>
                            <div className={styles.subGroupHeading}>
                                Nominal
                            </div>
                            <div className={styles.subGroupNumber}>
                                {assetInfo['monthly_nominal_change']}
                            </div>
                            </div>
                            <div className={styles.verticalLine}></div>
                            <div className={styles.subChangeGroup}>
                            <div className={styles.subGroupHeading}>
                                Percentage
                            </div>
                            <div className={styles.subGroupNumber}>
                                {assetInfo['monthly_percentage_change']}
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Yearly Change
                        </div>
                        <div className={styles.changeVariants}>
                            <div className={styles.subChangeGroup}>
                            <div className={styles.subGroupHeading}>
                                Nominal
                            </div>
                            <div className={styles.subGroupNumber}>
                                {assetInfo['yearly_nominal_change']}
                            </div>
                            </div>
                            <div className={styles.verticalLine}></div>
                            <div className={styles.subChangeGroup}>
                            <div className={styles.subGroupHeading}>
                                Percentage
                            </div>
                            <div className={styles.subGroupNumber}>
                                {assetInfo['yearly_percentage_change']}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.infoSectionRow}>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Forward price to equity ratio
                        </div>
                        <div className={styles.changeNumber}>
                            {assetInfo['forward_PE']}
                        </div>
                    </div>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Trailing price to equity ratio
                        </div>
                        <div className={styles.changeNumber}>
                            {assetInfo['trailing_PE']}
                        </div>
                    </div>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Dividend payout ratio
                        </div>
                        <div className={styles.changeNumber}>
                            {assetInfo['payout_ratio']}
                        </div>
                    </div>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Dividend yield
                        </div>
                        <div className={styles.changeNumber}>
                            {assetInfo['dividend_yield']}
                        </div>
                    </div>
                </div>
                <div className={styles.infoSectionRow}>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Buy Signals
                        </div>
                        <div className={styles.changeNumber}>
                            {assetInfo['predictions_buy']}
                        </div>
                    </div>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Hold Signals
                        </div>
                        <div className={styles.changeNumber}>
                            {assetInfo['predictions_hold']}
                        </div>
                    </div>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Sell Signals
                        </div>
                        <div className={styles.changeNumber}>
                            {assetInfo['predictions_sell']}
                        </div>
                    </div>
                </div>        
                <div className={styles.infoSectionRow}>
                    <div className={styles.changeInfo}>
                        <div className={styles.changeCategory}>
                            Overall Verdict
                        </div>
                        <div className={styles.changeNumber}>
                            {assetInfo['predictions_signal']}
                        </div>
                    </div>
                </div>
            </div>
            <h1 className={styles.newsHeading}>News related to {assetInfo['company_name']}</h1>
            <div className={styles.newsContainer}>
                {newsList.map((article) => (
                    <div className={styles.newsCardContainer}>
                    <GeneralNewsCard 
                        newsArticle={article}
                    />
                    </div>
                ))}
            </div>
        </>
    )
}

export default AssetInformation
