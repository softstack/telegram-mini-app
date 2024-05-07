import React from 'react';

import { getColorFromURL } from 'color-thief-node';

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
    const getNetworkColor = async () => {
        const color = await getColorFromURL(icon);
        console.log(color);
        return color;
    };

    return (
        <div
            onClick={callback}
            className={`flex flex-col items-center justify-center text-customBlackText rounded-lg p-2 ${
                selected ? `bg-${getNetworkColor}` : ''
            }`}
        >
            <img className="w-11 h-11" src={icon} alt="" />
            <p>{network}</p>
        </div>
    );
};

export default NetworkBadge;
