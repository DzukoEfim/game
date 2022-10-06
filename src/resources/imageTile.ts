export default class ImageTile {
    private type: string = null;
    private assetUrl: string = null;

    constructor(type: string, assetUrl: string) {
        this.type = type;
        this.assetUrl = assetUrl;
    }

    getType() {
        return this.type;
    }

    download() {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve(img);
            };

            img.onerror = (err) => {
                reject(err);
            };

            img.src = this.assetUrl;
        });
    }
}
