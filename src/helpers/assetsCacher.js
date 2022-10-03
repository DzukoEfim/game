class AssetsCacher {
  constructor () {
    this.cachedSprites = {};
  }

  getAsset (assetType) {
    return this.cachedSprites[assetType];
  }

  downloadAndCacheAssets (assetsObject) {
    for (let key in assetsObject) {
      if (this.cachedSprites[key]) continue;
      this.cachedSprites[key] = new Image(); //temporary solution
      assetsObject[key].download()
        .then(data => {
          this.cachedSprites[key] = data;
        })
    }
  }
}

export const assets_cacher = new AssetsCacher();