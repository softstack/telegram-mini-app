type ColorCalculationResult = Promise<string>;

export const getDominantColor = (imageUrl: string): ColorCalculationResult => {
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

            const rgbaColor = `rgba(${dominantColor}, 0.2)`;
            resolve(rgbaColor);
        };

        img.onerror = () => reject('Image load error');
    });
};
