import React, { useState, useEffect } from 'react';

import { getDominantColor } from '../../utils/dominantColor';

type Props = {
    walletName: string;
    icon: string;
    selected?: boolean;
    callback: () => void;
};

const WalletBadge: React.FC<Props> = ({
    walletName,
    icon,
    selected,
    callback,
}) => {
    const [backgroundColor, setBackgroundColor] = useState('');
    useEffect(() => {
        if (!selected) return;

        getDominantColor(icon)
            .then((color) => {
                setBackgroundColor(color);
            })
            .catch((error) =>
                console.error('Failed to load image color:', error)
            );
    }, [icon, selected]);
    return (
        <div
            onClick={callback}
            className="flex items-center gap-3 rounded-lg p-2 text-customBlackText"
            style={{ backgroundColor: selected ? backgroundColor : '' }}
        >
            <img className="w-9 h-9" src={icon} alt="" />
            <p className="dark:text-customDarkModeTextColor">{walletName}</p>
        </div>
    );
};

export default WalletBadge;
