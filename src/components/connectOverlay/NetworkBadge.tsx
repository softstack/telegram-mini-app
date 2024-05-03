import React from 'react';

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
    return (
        <div
            onClick={callback}
            className={`flex flex-col items-center justify-center text-customBlackText rounded-lg p-2 ${
                selected ? 'bg-customBlueSelected' : ''
            }`}
        >
            <img className="w-11 h-11" src={icon} alt="" />
            <p>{network}</p>
        </div>
    );
};

export default NetworkBadge;
