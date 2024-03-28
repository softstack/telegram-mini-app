import React from 'react';

type Props = {
    title: string;
    icon: string;
    callback: () => void;
};

const ConnectButton: React.FC<Props> = ({ title, icon, callback }) => {
    return (
        <div className="connect-button" onClick={callback}>
            <div className="connect-button-icon">
                <img src={icon} alt="" />
            </div>

            <span className="button-text">{title}</span>
        </div>
    );
};

export default ConnectButton;
