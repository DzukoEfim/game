import { ICoordinates } from './types';

export type SpriteSettings = {
    sx?: number;
    sy?: number;
    sWidth?: number;
    sHeight?: number;
    dWidth?: number;
    dHeight?: number;
}

export type SpriteProperties = {
    spriteSettings?: SpriteSettings;
    position?: ICoordinates;
    passable?: boolean;
    assetUrl: string;
}

export type RenderConfiguration = SpriteSettings & ICoordinates & { assetUrl: string }

export interface ISprite {
    setPosition(position: ICoordinates);
    getRenderConfiguration(): RenderConfiguration;
    position: ICoordinates;
    assetUrl: string;
    passable: boolean;
    spriteSettings: SpriteSettings;
}

export class Sprite implements ISprite {
    spriteSettings: SpriteSettings;
    position: ICoordinates;
    assetUrl: string;
    passable: boolean;

    constructor(sprite: SpriteProperties) {
        this.spriteSettings = sprite.spriteSettings ?? {
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
        this.assetUrl = sprite.assetUrl;
    }

    setPosition({ x, y }: ICoordinates) {
        this.position.x = x;
        this.position.y = y;
    }

    getRenderConfiguration() {
        return {
            assetUrl: this.assetUrl,
            ...this.spriteSettings,
            ...this.position,
        };
    }
}
