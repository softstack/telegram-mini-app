import React from 'react';

import './SkipButton.css';

type Props = {
    skip: () => void;
};

const SkipButton: React.FC<Props> = ({ skip }) => {
    return (
        <div className="skip-button" onClick={skip}>
            <span>Skip</span>
        </div>
    );
};

export default SkipButton;
