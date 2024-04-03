import React from 'react';

import './Avatar.css';

type Props = {
    src: string;
    height?: string;
};

const Avatar: React.FC<Props> = ({ src, height = '100%' }) => {
    return (
        <div className="avatar" style={{ height: height }}>
            <img src={src} alt="" />
        </div>
    );
};

export default Avatar;
