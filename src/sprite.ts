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
    passable?: boolean;
    assetUrl: string;
}

export type RenderConfiguration = SpriteSettings & { assetUrl: string }

export interface ISprite {
    assetUrl: string;
    passable: boolean;
    spriteSettings: SpriteSettings;
}

export class Sprite implements ISprite {
    spriteSettings: SpriteSettings;
    assetUrl: string;
    passable: boolean;

    constructor(sprite: SpriteProperties) {
        this.spriteSettings = sprite.spriteSettings ?? {
            sHeight: 0,
            sWidth: 0,
            sx: 0,
            sy: 0,
        };
        this.passable = sprite.passable ?? true;
        this.assetUrl = sprite.assetUrl;
    }
}
