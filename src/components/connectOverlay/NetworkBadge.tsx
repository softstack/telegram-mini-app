import React from 'react';

type Props = {
    network: string;
    icon: string;
    callback: () => void;
};

const NetworkBadge: React.FC<Props> = ({ network, icon, callback }) => {
    return (
        <div
            onClick={callback}
            className="flex flex-col items-center justify-center text-customBlackText"
        >
            <img className="w-11 h-11" src={icon} alt="" />
            <p>{network}</p>
        </div>
    );
};

export default NetworkBadge;
