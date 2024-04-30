import React from 'react';

type Props = {
    title: string;
    callback: () => void;
};

const PrimaryButton: React.FC<Props> = ({ title, callback }) => {
    return (
        <div
            className="flex items-center justify-center bg-customBlueButton text-white py-3 px-5 rounded-xl border-none text-base font-bold text-center"
            onClick={callback}
        >
            <span>{title}</span>
        </div>
    );
};

export default PrimaryButton;
