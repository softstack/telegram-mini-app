import React from 'react';

type Props = {
    skip: () => void;
};

const SkipButton: React.FC<Props> = ({ skip }) => {
    return (
        <div
            className="flex p-4 text-sm font-medium justify-end text-customGraySkip"
            onClick={skip}
        >
            <span className="font-medium text-sm">Skip</span>
        </div>
    );
};

export default SkipButton;
