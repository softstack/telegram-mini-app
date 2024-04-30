import React from 'react';
import chevronLeftIcon from '../../assets/chevron-left.svg';

type Props = {
    goBack: () => void;
};

const BackButton: React.FC<Props> = ({ goBack }) => {
    return (
        <div className="flex p-4 text-sm justify-start">
            <img onClick={goBack} src={chevronLeftIcon} alt="Back" />
        </div>
    );
};

export default BackButton;
