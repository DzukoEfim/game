import { buttonToDirectionMapping } from './constants';
import { ICharacter } from './entities/mainCharacter';
import { ICoordinates } from './types';

const MAX_SPEED = 100; // pixels/second

export class Walk {
    private character: ICharacter;

    constructor(character: ICharacter) {
        this.character = character;
    }

    start(direction: number) {
        this.updateLookDirection(direction);
        this.character.walkSpeed = MAX_SPEED;
    }

    stop() {
        this.character.walkSpeed = 0;
    }

    updateLookDirection(pressedButton: number): void {
        this.character.lookDirection = pressedButton;
    }

    updateCoordinates(timePassed: number): void {
        const newPositionObject = this.getCoordsOfNextPosition(timePassed);

        this.character.setPosition(newPositionObject);
    }

    private getCoordsOfNextPosition(timePassed: number): ICoordinates {
        const axisParameters = buttonToDirectionMapping[this.character.lookDirection];

        const pixelsToGo = this.character.walkSpeed * (timePassed / 1000) * axisParameters.multiplier;
        const positionObject = {
            x: this.character.position.x,
            y: this.character.position.y,
        };

        positionObject[axisParameters.value] += pixelsToGo;
        return positionObject;
    }
}
