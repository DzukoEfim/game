import { Sprite, SpriteProperties } from './sprite';
import { AnimationConfig, AnimationManager, ViewDirections } from './animationManager';

export class AnimatedSprite extends Sprite {
    animationManager: AnimationManager;

    constructor(spriteProperties: SpriteProperties, animationConfig: AnimationConfig) {
        super(spriteProperties);

        this.animationManager = new AnimationManager(animationConfig, this);
    }

    animateFrame(timePassed: number, direction: ViewDirections) {
        this.animationManager.updateFrame(timePassed, direction);
    }
}
