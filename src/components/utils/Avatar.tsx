import React from 'react';

type Props = {
    src: string;
};

const Avatar: React.FC<Props> = ({ src }) => {
    return (
        <div className="flex flex-grow items-center justify-center overflow-hidden max-h-96 py-2 px-8">
            <img
                className="h-auto max-w-full object-contain"
                src={src}
                alt=""
            />
        </div>
    );
};

export default Avatar;
