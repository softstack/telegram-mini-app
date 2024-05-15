import React from 'react';

type Props = {
    title: string;
    className?: string;
    callback: () => void;
};

const PrimaryButton: React.FC<Props> = ({ title, className, callback }) => {
    return (
        <div
            className={`flex items-center justify-center bg-customBlueButton text-white py-3 px-5 rounded-xl border-customBlueButton text-base font-bold text-center ${className}`}
            onClick={callback}
        >
            <span>{title}</span>
        </div>
    );
};

export default PrimaryButton;
