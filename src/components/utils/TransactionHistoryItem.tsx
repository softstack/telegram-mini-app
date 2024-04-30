import React, { useEffect, useState } from 'react';

import ethereumIcon from '../../assets/ether_icon.png';

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
        <div className="grid grid-cols-custom-1-3-1 gap-2 items-center py-2 px-4 rounded-2xl bg-white">
            <div className="h-12 w-12">
                <img
                    className="object-contain h-full w-full"
                    src={ethereumIcon}
                    alt=""
                />
            </div>
            <div className="flex flex-col text-left text-lg justify-center">
                <p className="m-0 font-semibold">{currency}</p>
                <div className="flex gap-1 text-customGrayAddress">
                    <p className="m-0">{valueSpot}</p>
                    <p className="m-0">{symbol}</p>
                </div>
            </div>
            <div className="text-lg font-medium text-right">
                <p>${valueFiat}</p>
            </div>
        </div>
    );
};

export default TransactionHistoryItem;
