import React from 'react';

import './TransactionButton.css';

interface Props {
    text: string;
    icon: string;
    callback: () => void;
}

const TransactionButton: React.FC<Props> = ({ text, icon, callback }) => {
    return (
        <div onClick={callback} className="transaction-button-container">
            <div>
                <img src={icon} alt="" />
            </div>
            <p>{text}</p>
        </div>
    );
};

export default TransactionButton;
