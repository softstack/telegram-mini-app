import React, { useEffect, useState } from 'react';

import ethereumIcon from '../../assets/ether_icon.png';

import './TransactionHistoryItem.css';

type Props = {
    currency: string;
    symbol: string;
    valueSpot: number;
};

const TransactionHistoryItem: React.FC<Props> = ({
    currency,
    symbol,
    valueSpot,
}) => {
    const [valueFiat, setValueFiat] = useState<number>(0);

    const getFiatValue = async () => {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
        );
        const data = await response.json();
        setValueFiat(Number((data.ethereum.usd * valueSpot).toFixed(2)));
    };

    useEffect(() => {
        getFiatValue();
    }, []);

    return (
        <div className="transaction-history-item">
            <div className="transaction-history-item-logo">
                <img src={ethereumIcon} alt="" />
            </div>
            <div className="transaction-history-item-spot-details">
                <p>{currency}</p>
                <div className="transaction-history-item-spot-details-value">
                    <p>{valueSpot}</p>
                    <p>{symbol}</p>
                </div>
            </div>
            <div className="transaction-history-item-fiat-details">
                <p>${valueFiat}</p>
            </div>
        </div>
    );
};

export default TransactionHistoryItem;
