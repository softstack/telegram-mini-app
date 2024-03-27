// basic typescript react scaffold for a button with an icon left of the centered text

import React from 'react';

type Props = {
    title: string;
    icon: string;
};

const ConnectButton: React.FC<Props> = ({ title, icon }) => {
    return (
        <div className="connect-button">
            <div className="connect-button-icon">
                <img src={icon} alt="" />
            </div>

            <span className="button-text">{title}</span>
        </div>
    );
};

export default ConnectButton;
