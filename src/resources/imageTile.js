export default class ImageTile {
  constructor (type, assetUrl) {
    this.type = type;
    this.assetUrl = assetUrl;
  }

  getType () {
    return this.type;
  }

  download () {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      }

      img.onerror = err => {
        reject(err)        
      }

      img.src = this.assetUrl;
    })
  }
}