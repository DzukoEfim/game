export const downloadImage = (source: string): Promise<CanvasImageSource> => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
        resolve(img);
    };

    img.onerror = (err) => {
        reject(err);
    };

    img.src = source;
});
