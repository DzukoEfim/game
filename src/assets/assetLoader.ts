class AssetsLoader {
    private assets: Record<string, HTMLImageElement> = {};

    loadAsset(assetUrl: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            if (this.assets[assetUrl]) {
                resolve(this.assets[assetUrl]);
            }

            const img = new Image();
            img.src = assetUrl;

            img.onload = () => {
                this.assets[assetUrl] = img;
                resolve(img);
            };
            img.onerror = (err) => reject(err);
        });
    }

    loadAssets(assetUrls: string[]): Promise<HTMLElement[]> {
        return Promise.all(assetUrls.map(((assetUrl) => this.loadAsset(assetUrl))));
    }

    getAsset(assetUrl: string) {
        return this.assets[assetUrl];
    }
}

export const assetsLoader = new AssetsLoader();
