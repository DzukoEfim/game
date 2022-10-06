import MapImageTile from '../mapImageTile';
import { assets_cacher } from '../../helpers/assetsCacher';
import { image_tile } from '../../constants/types.constants';
import bridgeTile from '../../assets/objectsTiles/bridge2.png';

type BridgeTileSettings = {
    sx: number,
    sy: number,
    sWidth: number,
    sHeight: number
}

export default class BridgeTile extends MapImageTile {
    private tileSettings: BridgeTileSettings = {
        sx: 0,
        sy: 0,
        sWidth: 47,
        sHeight: 59,
    };

    constructor() {
        super('bridge', image_tile, bridgeTile);
    }

    getRenderConfiguration() {
        return [
            assets_cacher.getAsset(this.getObjectType()),
            this.tileSettings.sx,
            this.tileSettings.sy,
            this.tileSettings.sWidth,
            this.tileSettings.sHeight,
            this.position.x - 5,
            this.position.y - 10,
            this.tileSettings.sWidth,
            this.tileSettings.sHeight,
        ];
    }

    // eslint-disable-next-line no-unused-vars, class-methods-use-this
    positionModifier(char_x0, char_x1, char_y0, char_y1) {
        console.log();
    }
}
