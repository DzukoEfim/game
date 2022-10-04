class AssetsCacher {
    private cachedSprites: Record<string, any> = {};

    getAsset(assetType: any) {
        return this.cachedSprites[assetType];
    }

    downloadAndCacheAssets(assetsObject) {
        Object.keys(assetsObject).forEach((key) => {
            if (this.cachedSprites[key]) return;
            this.cachedSprites[key] = new Image(); // temporary solution
            assetsObject[key].download()
                .then((data) => {
                    this.cachedSprites[key] = data;
                });
        });
    }
}

export const assets_cacher = new AssetsCacher();
