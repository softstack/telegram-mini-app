import React, { useEffect } from 'react';

type Props = {
    network: string;
    icon: string;
    selected: boolean;
    callback: () => void;
};

const NetworkBadge: React.FC<Props> = ({
    network,
    icon,
    selected,
    callback,
}) => {
    const getDominantColor = async (imageUrl: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imageUrl;
            img.crossOrigin = 'Anonymous';

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject('Unable to get canvas context');
                    return;
                }

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);

                const imageData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                const data = imageData.data;
                const colorCount: Record<string, number> = {};

                for (let i = 0; i < data.length; i += 4) {
                    const color = `${data[i]},${data[i + 1]},${data[i + 2]}`;
                    if (colorCount[color]) {
                        colorCount[color]++;
                    } else {
                        colorCount[color] = 1;
                    }
                }

                let dominantColor = '';
                let maxCount = 0;

                for (const [color, count] of Object.entries(colorCount)) {
                    if (count > maxCount) {
                        maxCount = count;
                        dominantColor = color;
                    }
                }

                // Convert the dominant color from RGB string to RGBA string with 50% opacity
                const rgbaColor = `rgba(${dominantColor}, 0.5)`;

                resolve(rgbaColor);
            };

            img.onerror = () => reject('Image load error');
        });
    };
    let backgroundColorSelected = '';

    useEffect(() => {
        getDominantColor(icon).then((color) => {
            if (color === 'rgba(0,0,0, 0.5)') return;
            console.log('Dominant color:', color);
            backgroundColorSelected = color;
        });
    }, [icon]);

    return (
        <div
            onClick={callback}
            className={`flex flex-col items-center justify-center text-customBlackText rounded-lg p-2 
            ${selected ? 'bg-customBlueSelected' : ''}
            `}
        >
            <img className="w-11 h-11" src={icon} alt="" />
            <p>{network}</p>
        </div>
    );
};

export default NetworkBadge;
