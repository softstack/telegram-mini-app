import React from 'react';

import tonIcon from '../../assets/ton_connect.png';

import './TransactionHistoryItem.css';

type Props = {
    currency: string;
    symbol: string;
    valueSpot: number;
    valueFiat: number;
};

const TransactionHistoryItem: React.FC<Props> = ({
    currency,
    symbol,
    valueSpot,
    valueFiat,
}) => {
    return (
        <div className="transaction-history-item">
            <div className="transaction-history-item-logo">
                <img src={tonIcon} alt="" />
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
