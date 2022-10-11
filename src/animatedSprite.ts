import { Sprite, SpriteProperties } from './sprite';
import { AnimationConfig, AnimationManager, ViewDirections } from './animationManager';

export class AnimatedSprite extends Sprite {
    animationManager: AnimationManager;

    constructor(spriteProperties: SpriteProperties, animationConfig: AnimationConfig) {
        super(spriteProperties);

        this.animationManager = new AnimationManager(animationConfig);
    }

    animateFrame(timePassed: number, currentButton: ViewDirections) {
        this.animationManager.updateFrame(this, timePassed, currentButton);
    }
}
