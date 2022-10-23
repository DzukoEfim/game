import { animationTimings, d_l } from '../constants';
import { renderer } from '../mechanics/renderer';
import mainCharacterSprite from '../assets/chracterTiles/mainCharacter.png';
import { BasicPositionController } from '../basicPositionController';
import { ICoordinates } from '../types';
import { ISprite, Sprite } from '../sprite';
import { Animation } from '../animation';
import { IRenderable, RenderConfiguration } from '../types/renderable';
import { PressedKeyObject } from '../mechanics/keyboard';

export interface ICharacter {
    speed: number;
    position: ICoordinates;
    lookDirection: number;
    setPosition(position: ICoordinates): void;
    animation: Animation;
}

export class MainCharacter implements ICharacter, IRenderable {
    sprite: ISprite;
    speed: number = 0;
    positionController: BasicPositionController;
    lookDirection: number = d_l;
    animation: Animation;
    position: ICoordinates = {
        x: 0,
        y: 0,
    };

    constructor() {
        this.sprite = new Sprite({
            assetUrl: mainCharacterSprite,
            spriteSettings: {
                sx: 0, sy: 0, sWidth: 576, sHeight: 384,
            },
        });
        this.positionController = new BasicPositionController(this);
        this.animation = new Animation(animationTimings, this.sprite);
    }

    setPosition({ x, y }: ICoordinates) {
        this.position.x = x;
        this.position.y = y;
    }

    getRenderConfiguration(): RenderConfiguration {
        return {
            ...this.sprite.spriteSettings,
            ...this.position,
            assetUrl: this.sprite.assetUrl,
        };
    }

    update(timePassed: number, pressedKey: PressedKeyObject[]) {
        this.positionController.updateLookDirection(pressedKey);
        this.positionController.updateCoordinates(timePassed);

        this.animation.updateDirection(this.lookDirection);
        this.animation.updateFrame(timePassed);
        renderer.pushLayer('objectsLayers', this);
    }

    // we should figure out the best way to detect collision. For now it is not working
    // private getNextTiles(x: number, y: number) {
    //     const multipliers = lookupToNeibhourTileModifier[this.lookDirection];
    //     return [
    //         map_controller.getTileDataByCoords(x + multipliers.firstTile.x, y + multipliers.firstTile.y),
    //         map_controller.getTileDataByCoords(x + multipliers.secondTile.x, y + multipliers.secondTile.y),
    //     ];
    // }
}
