import React, { useEffect, useState } from 'react';

import { getDominantColor } from '../../utils/dominantColor';

type Props = {
    network: string;
    icon: string;
    selected: boolean;
    callback: () => void;
};

const NetworkBadge: React.FC<Props> = ({
    network,
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
            className={`flex flex-col items-center justify-center text-customBlackText rounded-lg p-2 
           
            `}
            style={{ backgroundColor: selected ? backgroundColor : '' }}
        >
            <img className="w-11 h-11" src={icon} alt="" />
            <p className="dark:text-customDarkModeTextColor">{network}</p>
        </div>
    );
};

export default NetworkBadge;
