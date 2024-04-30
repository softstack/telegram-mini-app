import React from 'react';

type Props = {
    walletName: string;
    icon: string;
    callback: () => void;
};

const WalletBadge: React.FC<Props> = ({ walletName, icon, callback }) => {
    return (
        <div
            onClick={callback}
            className="flex items-center gap-3 text-customBlackText"
        >
            <img className="w-9 h-9" src={icon} alt="" />
            <p>{walletName}</p>
        </div>
    );
};

export default WalletBadge;
