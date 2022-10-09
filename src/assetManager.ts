export class AssetManager {
    static assets: Record<string, HTMLImageElement> = {};

    static loadAsset(assetUrl: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            if (AssetManager.assets[assetUrl]) {
                resolve(AssetManager.assets[assetUrl]);
            }

            const img = new Image();
            img.src = assetUrl;

            img.onload = () => {
                AssetManager.assets[assetUrl] = img;
                resolve(img);
            };
            img.onerror = (err) => reject(err);
        });
    }
}
