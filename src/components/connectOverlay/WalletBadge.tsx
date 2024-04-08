import React from 'react';

import './WalletBadge.css';

type Props = {
    walletName: string;
    icon: string;
    callback: () => void;
};

const WalletBadge: React.FC<Props> = ({ walletName, icon, callback }) => {
    return (
        <div onClick={callback} className="wallet-badge">
            <img src={icon} alt="" />
            <p>{walletName}</p>
        </div>
    );
};

export default WalletBadge;
