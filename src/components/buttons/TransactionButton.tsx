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
            className="flex flex-col w-full justify-center text-center gap-1"
        >
            <div className="flex justify-center">
                <img src={icon} alt="" />
            </div>
            <div className="text-center">
                <p className="my-0 mx-auto text-customBlueButton font-semibold">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default TransactionButton;
