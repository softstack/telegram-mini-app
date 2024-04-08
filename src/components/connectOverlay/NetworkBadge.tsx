import React from 'react';

import './NetworkBadge.css';

type Props = {
    network: string;
    icon: string;
    callback: () => void;
};

const NetworkBadge: React.FC<Props> = ({ network, icon, callback }) => {
    return (
        <div onClick={callback} className="network-badge">
            <img src={icon} alt="" />
            <p>{network}</p>
        </div>
    );
};

export default NetworkBadge;
