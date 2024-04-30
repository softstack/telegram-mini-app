import React, { PropsWithChildren, useState, useRef, useEffect } from 'react';

import tooltipIcon from '../../assets/tooltip_icon.svg';

interface Props extends PropsWithChildren {
    headline: string;
    content: string;
    link?: string;
    linkText?: string;
}

const Tooltip: React.FC<Props> = ({
    headline,
    content,
    link = undefined,
    linkText = '',
    children,
}) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsHovering(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleMouseEnter}
        >
            <div className="flex justify-center items-center gap-5">
                <img className="w-4 h-4" src={tooltipIcon} alt="Tooltip" />
            </div>
            {children}
            {isHovering && (
                <div
                    ref={ref}
                    className="absolute h-fit z-1000 bg-customBlueButton text-white rounded-2xl p-2 text-left my-0 mr-2 ml-0 font-sm shadow-lg"
                >
                    <div className="max-w-96">
                        <h3 className="p-0 m-0 font-bold">{headline}</h3>
                        <p className="pt-2 px-0 pb-0 m-0 font-medium whitespace-pre-line">
                            {content}
                        </p>
                        {link && (
                            <a
                                href={link}
                                style={{ display: 'inline-block' }}
                                target="_blank"
                            >
                                {linkText}
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
