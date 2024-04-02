import React from 'react';

type Props = {
    title: string;
    callback: () => void;
};

const PrimaryButton: React.FC<Props> = ({ title, callback }) => {
    return (
        <div className="primary-button" onClick={callback}>
            <span>{title}</span>
        </div>
    );
};

export default PrimaryButton;
