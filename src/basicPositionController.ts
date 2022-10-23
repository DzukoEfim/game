import { buttonToDirectionMapping, awds } from './constants';
import { ICharacter } from './entities/mainCharacter';
import { PressedKeyObject } from './mechanics/keyboard';
import { ICoordinates } from './types';

const MAX_SPEED = 100; // pixels/second

export class BasicPositionController {
    private character: ICharacter;

    constructor(character: ICharacter) {
        this.character = character;
    }

    start() {
        this.character.speed = MAX_SPEED;
    }

    stop() {
        this.character.speed = 0;
    }

    updateLookDirection(pressedButtons: PressedKeyObject[]): void {
        const filteredArray = pressedButtons.filter((keyObject) => awds.includes(keyObject.key));
        if (filteredArray.length > 0) {
            this.character.lookDirection = filteredArray[filteredArray.length - 1].key;
        }
    }

    updateCoordinates(timePassed: number): void {
        const newPositionObject = this.getCoordsOfNextPosition(timePassed);

        this.character.setPosition(newPositionObject);
    }

    private getCoordsOfNextPosition(timePassed: number): ICoordinates {
        const axisParameters = buttonToDirectionMapping[this.character.lookDirection];

        const pixelsToGo = this.character.speed * (timePassed / 1000) * axisParameters.multiplier;
        const positionObject = {
            x: this.character.position.x,
            y: this.character.position.y,
        };

        positionObject[axisParameters.value] += pixelsToGo;
        return positionObject;
    }
}
