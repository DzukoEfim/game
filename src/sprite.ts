import { ImageTypes } from './constants/spriteTypes';
import { ICoordinates } from './types';

type TileSettings = {
    sx?: number;
    sy?: number;
    sWidth?: number;
    sHeight?: number;
    dWidth?: number;
    dHeight?: number;
}

export type SpriteProperties = {
    tileSettings?: TileSettings;
    position?: ICoordinates;
    imageType?: ImageTypes;
    passable?: boolean;
    objectType: string;
    assetUrl: string;
}

export type RenderConfiguration = TileSettings & ICoordinates & { assetUrl: string }

export interface ISprite {
    setPosition(position: ICoordinates);
    getRenderConfiguration(): RenderConfiguration;
    position: ICoordinates;
    readonly objectType: string;
    assetUrl: string;
    imageType: ImageTypes.image_tile;
    passable: boolean;
}

export class Sprite implements ISprite {
    tileSettings: TileSettings;
    position: ICoordinates;
    readonly objectType: string;
    assetUrl: string;
    imageType: ImageTypes.image_tile;
    passable: boolean;

    constructor(sprite: SpriteProperties) {
        this.tileSettings = sprite.tileSettings ?? {
            sHeight: 0,
            sWidth: 0,
            sx: 0,
            sy: 0,
        };
        this.position = sprite.position ?? {
            x: 0,
            y: 0,
        };
        this.passable = sprite.passable ?? true;
        this.imageType = sprite.imageType ?? ImageTypes.image_tile;
        this.assetUrl = sprite.assetUrl;
    }

    setPosition({ x, y }: ICoordinates) {
        this.position.x = x;
        this.position.y = y;
    }

    getRenderConfiguration() {
        return {
            assetUrl: this.assetUrl,
            ...this.tileSettings,
            ...this.position,
        };
    }
}
