import ImageTile from './imageTile';

export default class MapImageTile extends ImageTile {
  constructor (objectType, ...props) {
    super(...props)
    this.position = {
      x: 0,
      y: 0
    };

    this.objectType = objectType;
  }

  getObjectType () {
    return this.objectType;
  }

  setPosition (x, y) {
    this.position.x = x;
    this.position.y = y;
  }

  getPosition () {
    return { ...this.position };
  }
}
