import { ISprite, SpriteSettings } from './sprite';

export enum ViewDirections {
  UP = 87,
  DOWN = 83,
  LEFT = 65,
  RIGHT = 68
}

type FrameSprite = SpriteSettings & { frameDuration: number }
export type AnimationConfig = Record<ViewDirections, Record<number, FrameSprite>>

export class AnimationManager {
    readonly config: AnimationConfig;

    private currentFrame: {
      direction: ViewDirections
      frameNumber: number
      frameTime: number
    };

    constructor(config: AnimationConfig) {
        this.config = config;
        this.currentFrame = {
            direction: ViewDirections.DOWN,
            frameNumber: 0,
            frameTime: 0,
        };
    }

    private resetFrameParameters(direction?: ViewDirections) {
        this.currentFrame.direction = direction;
        this.currentFrame.frameNumber = 0;
        this.currentFrame.frameTime = 0;
    }

    private isNextFrame(timePassed: number) {
        return this.currentFrame.frameTime
                + timePassed >= this.config[this.currentFrame.direction][this.currentFrame.frameNumber].frameDuration;
    }

    updateFrame(sprite: ISprite, timePassed: number, newDirection?: ViewDirections) {
        this.updateSpriteSettings(sprite);

        if (!newDirection) {
            this.currentFrame.frameNumber = 0;
            this.currentFrame.frameTime = 0;
            return;
        }

        if (this.currentFrame.direction !== newDirection) {
            this.resetFrameParameters(newDirection);

            return;
        }

        const currentDirectionFrameConfig = this.config[this.currentFrame.direction];
        const framesCount = Object.keys(currentDirectionFrameConfig).length;

        if (this.isNextFrame(timePassed)) {
            if (this.currentFrame.frameNumber + 1 === framesCount) {
                this.currentFrame.frameNumber = 0;
            } else {
                this.currentFrame.frameNumber += 1;
            }

            this.currentFrame.frameTime = 0;

            return;
        }

        this.currentFrame.frameTime += timePassed;
    }

    private updateSpriteSettings(sprite: ISprite) {
        const currentFrameParameters = this.config[this.currentFrame.direction][this.currentFrame.frameNumber];

        sprite.spriteSettings = {
            ...sprite.spriteSettings,
            sx: currentFrameParameters.sx,
            sy: currentFrameParameters.sy,
            sHeight: currentFrameParameters.sHeight,
            sWidth: currentFrameParameters.sWidth,
            dWidth: currentFrameParameters.dWidth,
            dHeight: currentFrameParameters.dHeight,
        };
    }
}
