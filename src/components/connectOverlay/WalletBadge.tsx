import React from 'react';

import './WalletBadge.css';

type Props = {
    walletName: string;
    icon: string;
};

const WalletBadge: React.FC<Props> = ({ walletName, icon }) => {
    return (
        <div className="wallet-badge">
            <img src={icon} alt="" />
            <p>{walletName}</p>
        </div>
    );
};

export default WalletBadge;
