import { ImageTypes } from './constants/spriteTypes';
import { ICoordinates } from './types';

export interface ISprite {
  setPosition(position: ICoordinates);
}

type TileSettings = {
    sx: number;
    sy: number;
    sWidth: number;
    sHeight: number;
}

type SpriteProperties = {
    tileSettings?: TileSettings;
    position?: ICoordinates;
    imageType?: ImageTypes;
    passable?: boolean;
    objectType: string;
    assetUrl: string;
}

const defaultSpriteProperties = {
    tileSettings: {
        sHeight: 0,
        sWidth: 0,
        sx: 0,
        sy: 0,
    },
    position: {
        x: 0,
        y: 0,
    },
    passable: true,
    imageType: ImageTypes.image_tile,
};

export class Sprite implements ISprite {
    tileSettings: TileSettings;
    readonly position: ICoordinates;
    readonly objectType: string;
    assetUrl: string;
    imageType: ImageTypes.image_tile;
    passable: boolean;

    constructor(sprite: SpriteProperties) {
        this.tileSettings = sprite.tileSettings ?? defaultSpriteProperties.tileSettings;
        this.position = sprite.position ?? defaultSpriteProperties.position;
        this.passable = sprite.passable ?? defaultSpriteProperties.passable;
        this.imageType = sprite.imageType ?? defaultSpriteProperties.imageType;
        this.assetUrl = sprite.assetUrl;
    }

    setPosition({ x, y }: ICoordinates) {
        this.position.x = x;
        this.position.y = y;
    }

    getRenderConfiguration() {
        return {
            ...this.tileSettings,
            ...this.position,
        };
    }

    // THIS IS ONLY FOR REFACTORING REASONS
    getType() {
        return this.imageType;
    }
}
