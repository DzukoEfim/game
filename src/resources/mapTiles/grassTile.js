import MapImageTile from '../mapImageTile';
import { assets_cacher } from '../../helpers/assetsCacher';
import { image_tile } from '../../constants/types.constants';
import forestTile from '../../assets/mapTiles/trees-and-bushes.png';

export default class GrassTile extends MapImageTile {
    constructor(passable = true) {
        super('grass', image_tile, forestTile);
        this.tileSettings = {
            sx: 0,
            sy: 0,
            sWidth: 32,
            sHeight: 32,
        };
        this.passable = passable;
    }

    getRenderConfiguration() {
        return [
            assets_cacher.getAsset(this.getObjectType()),
            this.tileSettings.sx,
            this.tileSettings.sy,
            this.tileSettings.sWidth,
            this.tileSettings.sHeight,
            this.position.x,
            this.position.y,
            this.tileSettings.sWidth,
            this.tileSettings.sHeight,
        ];
    }

    isTilePassable() {
        return this.passable;
    }
}
