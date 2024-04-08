import React, { PropsWithChildren, useState, useRef, useEffect } from 'react';

import tooltipIcon from '../../assets/tooltip_icon.svg';

import './Tooltip.css';

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
            <div className="centered tooltip-image">
                <img src={tooltipIcon} alt="Tooltip" />
            </div>
            {children}
            {isHovering && (
                <div ref={ref} className="tooltip">
                    <div className="tooltip-content">
                        <h3>{headline}</h3>
                        <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
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
