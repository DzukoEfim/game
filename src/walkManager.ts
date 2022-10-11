import { buttonToDirectionMapping } from './constants';
import { KeyboardManager } from './keyboardManager';
import { ISprite } from './sprite';
import { ICoordinates } from './types';

const MAX_SPEED = 100; // pixels/second

export class WalkManager {
    private speed: number = 0;
    private lookDirection: number = null;
    private keyboardManager: KeyboardManager;
    private sprite: ISprite;

    constructor(keyBoardManager: KeyboardManager, sprite: ISprite) {
        this.keyboardManager = keyBoardManager;
        this.sprite = sprite;
    }

    public update(sprite: ISprite, timePassed: number) {
        const pressedButtons = this.keyboardManager.getActions();
        this.updateSpeed(pressedButtons);

        if (pressedButtons.length) {
            this.updateLookDirection(pressedButtons);
            this.updateCoordinates(timePassed, sprite);
        }
    }

    private updateLookDirection(pressedButtons: number[]): void {
        this.lookDirection = pressedButtons[pressedButtons.length - 1];
    }

    private updateSpeed(pressedButtons: number[]) {
        this.speed = pressedButtons.length ? MAX_SPEED : 0;
    }

    updateCoordinates(timePassed: number, sprite: ISprite): void {
        const newPositionObject = this.getCoordsOfNextPosition(timePassed);

        sprite.setPosition(newPositionObject);
    }

    private getCoordsOfNextPosition(timePassed): ICoordinates {
        const axisParameters = buttonToDirectionMapping[this.lookDirection];
        const pixelsToGo = this.speed * (timePassed / 1000) * axisParameters.multiplier;
        const positionObject = {
            x: this.sprite.position.x,
            y: this.sprite.position.y,
        };

        positionObject[axisParameters.value] += pixelsToGo;
        return positionObject;
    }
}
