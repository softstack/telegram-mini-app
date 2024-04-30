import React from 'react';

type Props = {
    src: string;
    height?: string;
};

const Avatar: React.FC<Props> = ({ src, height = '100%' }) => {
    return (
        <div
            className="flex flex-grow items-center justify-center overflow-hidden h-full py-4 px-8"
            style={{ height: height }}
        >
            <img
                className="max-h-full max-w-full w-auto object-scale-down"
                src={src}
                alt=""
            />
        </div>
    );
};

export default Avatar;
