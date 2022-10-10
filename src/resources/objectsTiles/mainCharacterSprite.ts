import { animationTimings } from './mainCharacterConstants';
import { s_l } from '../../constants/keyboard';
import mainCharacterSprite from '../../assets/chracterTiles/mainCharacter.png';
import { Sprite } from '../../sprite';

type FrameState = {
    direction: number;
    frameNumber: number;
    frameTime: number;
}

export class MainCharacterSprite extends Sprite {
    private currentFrame: FrameState = {
        direction: s_l,
        frameNumber: 0,
        frameTime: 0,
    };

    constructor() {
        super({
            assetUrl: mainCharacterSprite,
        });
    }

    getRenderConfiguration() {
        const currentFrameParameters = animationTimings[this.currentFrame.direction][this.currentFrame.frameNumber];

        return {
            assetUrl: this.assetUrl,
            sx: currentFrameParameters.sx,
            sy: currentFrameParameters.sy,
            sWidth: currentFrameParameters.sWidth,
            sHeight: currentFrameParameters.sHeight,
            ...this.position,
            dWidth: currentFrameParameters.sWidth,
            dHeight: currentFrameParameters.sHeight,
        };
    }

    updateFrameParameters(timePassed, currentButton) {
        if (!currentButton) {
            this.currentFrame.frameNumber = 0;
            this.currentFrame.frameTime = 0;

            return;
        }

        if (this.currentFrame.direction !== currentButton) {
            this.resetFrameParameters(currentButton);

            return;
        }

        const parameters = animationTimings[this.currentFrame.direction];

        if (this.currentFrame.frameTime + timePassed
            >= parameters[this.currentFrame.frameNumber].frameDuration) {
            this.currentFrame.frameNumber = this.currentFrame.frameNumber + 1 === parameters.framesCount
                ? 0 : this.currentFrame.frameNumber + 1;
            this.currentFrame.frameTime = 0;

            return;
        }

        this.currentFrame.frameTime += timePassed;
    }

    resetFrameParameters(currentButton) {
        this.currentFrame.direction = currentButton;
        this.currentFrame.frameNumber = 0;
        this.currentFrame.frameTime = 0;
    }
}
