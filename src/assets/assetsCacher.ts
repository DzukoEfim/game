import { SpriteProperties } from '../sprite';
import { assetsLoader } from './assetLoader';

type IAssetsStorage = Record<string, CanvasRenderingContext2D>;

export class SpritesCacher {
    private assets: IAssetsStorage = {};

    createAsset(sprite: SpriteProperties) {
        if (this.assets[sprite.assetUrl]) {
            return this.assets[sprite.assetUrl];
        }
        const canvas = document.createElement('canvas');
        canvas.height = sprite.spriteSettings.sHeight;
        canvas.width = sprite.spriteSettings.sWidth;

        const ctx = canvas.getContext('2d');
        const imageResounce = assetsLoader.getAsset(sprite.assetUrl);
        if (!imageResounce) {
            console.error('No such image loaded in assetLoader! - ', sprite.assetUrl);
        }
        ctx.drawImage(
            imageResounce,
            sprite.spriteSettings.sx,
            sprite.spriteSettings.sy,
            sprite.spriteSettings.sWidth,
            sprite.spriteSettings.sHeight,
        );
        this.assets[sprite.assetUrl] = ctx;
        return ctx;
    }
}

export const spritesCacher = new SpritesCacher();
