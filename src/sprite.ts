import { spritesCacher } from './assets/assetsCacher';

export type SpriteSettings = {
    sx: number;
    sy: number;
    sWidth?: number;
    sHeight?: number;
    dWidth?: number;
    dHeight?: number;
}

export type SpriteProperties = {
    spriteSettings?: SpriteSettings;
    assetUrl: string;
}

export type RenderConfiguration = SpriteSettings & { assetUrl: string }

export interface ISpriteSettings extends SpriteSettings {imageCtx: CanvasRenderingContext2D}
export interface ISprite {
    assetUrl: string;
    spriteSettings: ISpriteSettings;
}
export class Sprite implements ISprite {
    spriteSettings: ISpriteSettings;
    assetUrl: string;
    assetId: string;

    constructor(sprite: SpriteProperties) {
        this.spriteSettings = {
            imageCtx: spritesCacher.createAsset(sprite),
            sHeight: 0,
            sWidth: 0,
            sx: 0,
            sy: 0,
            ...sprite.spriteSettings,
        };
        this.assetUrl = sprite.assetUrl;
    }
}
