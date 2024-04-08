import React from 'react';

import './NetworkBadge.css';

type Props = {
    network: string;
    icon: string;
};

const NetworkBadge: React.FC<Props> = ({ network, icon }) => {
    return (
        <div className="network-badge">
            <img src={icon} alt="" />
            <p>{network}</p>
        </div>
    );
};

export default NetworkBadge;
