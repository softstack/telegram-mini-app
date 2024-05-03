import React from 'react';

type Props = {
    src: string;
};

const Avatar: React.FC<Props> = ({ src }) => {
    return (
        <div className="flex flex-grow items-center justify-center overflow-hidden max-h-96 py-4 px-8">
            <img
                className="max-h-full max-w-full w-auto object-scale-down"
                src={src}
                alt=""
            />
        </div>
    );
};

export default Avatar;
