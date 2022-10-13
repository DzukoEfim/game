import { ISprite, Sprite, SpriteProperties } from '../sprite';
import { ICoordinates } from '../types';
import { IRenderable, RenderConfiguration } from '../types/renderable';

export class Tile implements IRenderable {
    position: ICoordinates = {
        x: 0,
        y: 0,
    };
    sprite: ISprite;
    constructor(props: SpriteProperties) {
        this.sprite = new Sprite(props);
    }

    getRenderConfiguration(): RenderConfiguration {
        return {
            ...this.sprite.spriteSettings,
            ...this.position,
            assetUrl: this.sprite.assetUrl,
        };
    }

    setPosition({ x, y }: ICoordinates) {
        this.position.x = x;
        this.position.y = y;
    }
}
