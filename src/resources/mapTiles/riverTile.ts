import MapImageTile from '../mapImageTile';
import { assets_cacher } from '../../helpers/assetsCacher';
import { image_tile } from '../../constants/types.constants';
import waterTile from '../../assets/mapTiles/water.png';

type RiverTileSettings = {
    sx: number,
    sy: number,
    sWidth: number,
    sHeight: number
}

export default class WaterTile extends MapImageTile {
    private tileSettings: RiverTileSettings = {
        sx: 0,
        sy: 0,
        sWidth: 32,
        sHeight: 32,
    };
    private passable: boolean = false;

    constructor(passable = false) {
        super('water', image_tile, waterTile);
        this.passable = passable;
    }

    getRenderConfiguration() {
        return [
            assets_cacher.getAsset(this.getObjectType()),
            this.position.x,
            this.position.y,
        ];
    }

    isTilePassable() {
        return this.passable;
    }
}
