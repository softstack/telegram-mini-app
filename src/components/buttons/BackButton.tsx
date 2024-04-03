import React from 'react';
import chevronLeftIcon from '../../assets/chevron-left.svg';

import './BackButton.css';

type Props = {
    goBack: () => void;
};

const BackButton: React.FC<Props> = ({ goBack }) => {
    return (
        <div className="back-button">
            <img onClick={goBack} src={chevronLeftIcon} alt="Back" />
        </div>
    );
};

export default BackButton;
