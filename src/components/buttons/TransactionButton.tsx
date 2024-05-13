import React from 'react';

interface Props {
    text: string;
    icon: string;
    callback: () => void;
}

const TransactionButton: React.FC<Props> = ({ text, icon, callback }) => {
    return (
        <div
            onClick={callback}
            className="flex flex-col justify-center text-center gap-1"
        >
            <div>
                <img src={icon} alt="" />
            </div>
            <p className="my-0 mx-auto text-customBlueButton font-semibold">
                {text}
            </p>
        </div>
    );
};

export default TransactionButton;
