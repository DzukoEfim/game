import { PressedKeysWatcher } from '../mechanics';
import {
    a_l, w_l, d_l, s_l,
} from '../constants/keyboard';
import { map_controller } from '../controlers/MAP_Controller';
import {
    buttonToDirectionMapping, lookupToNeibhourTileModifier, spriteWidth, spriteHeight,
} from '../resources/objectsTiles/mainCharacterConstants';
import { mainCharacterDrawer } from '../resources/objectsTiles/mainCharacterDrawer';
import { renderer } from '../mechanics/renderer';
import { ICoordinates } from '../types/coordinates';

const maxSpeed = 100; // pixels/second

class MainCharacter extends PressedKeysWatcher {
    private ctx: CanvasRenderingContext2D = null;
    private position: ICoordinates = { x: 0, y: 0 };
    private speed: number = 0;
    private acceleration_x: number = 0;
    private acceleration_y: number = 0;
    private lookDirection: number = null;

    constructor() {
        super([a_l, w_l, d_l, s_l]);
    }

    public initContext(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
    }

    public update(timePassed: number) {
        const pressedButtons = this.getButtons();
        this.updateSpeed(pressedButtons);

        if (pressedButtons.length) this.updateLookDirection(pressedButtons);

        if (pressedButtons.length) this.updateCoordinates(timePassed);

        this.drawParams();
        this.drawCharacter(timePassed);
        this.drawCharacterBorder();
    }

    private updateLookDirection(pressedButtons: number[]): void {
        this.lookDirection = pressedButtons[pressedButtons.length - 1];
    }

    private drawParams(): void {
        this.ctx.font = '10px serif';
        this.ctx.fillText(`speed: ${this.speed}`, 400, 20);
        this.ctx.fillText(`acceleration: ${this.acceleration_x}`, 400, 40);
    }

    private updateSpeed(pressedButtons: number[]) {
        this.speed = pressedButtons.length ? maxSpeed : 0;
    }

    private updateCoordinates(timePassed: number): void {
        const newPositionObject = this.getCoordsOfNextPosition(timePassed);
        const nextTileToGo = this.getNextTiles(newPositionObject.x, newPositionObject.y);
        if (nextTileToGo[0]?.tile.passable && nextTileToGo[1]?.tile.passable) {
            this.position = newPositionObject;
        }
    }

    private getCoordsOfNextPosition(timePassed): ICoordinates {
        const axisParameters = buttonToDirectionMapping[this.lookDirection];
        const pixelsToGo = this.speed * (timePassed / 1000) * axisParameters.multiplier;
        const positionObject = {
            x: this.position.x,
            y: this.position.y,
        };

        positionObject[axisParameters.value] += pixelsToGo;
        return positionObject;
    }

    private drawCharacter(timePassed: number): void {
        const pressedButtons = this.getButtons();
        const currentButton = pressedButtons[pressedButtons.length - 1];
        console.log(1);
        mainCharacterDrawer.setPosition({ x: this.position.x, y: this.position.y });
        mainCharacterDrawer.updateFrameParameters(timePassed, currentButton);
        renderer.pushToObjectsLayers(mainCharacterDrawer, 0);
    }

    private getNextTiles(x: number, y: number) {
        const multipliers = lookupToNeibhourTileModifier[this.lookDirection];
        return [
            map_controller.getTileDataByCoords(x + multipliers.firstTile.x, y + multipliers.firstTile.y),
            map_controller.getTileDataByCoords(x + multipliers.secondTile.x, y + multipliers.secondTile.y),
        ];
    }

    private drawCharacterBorder() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.position.x, this.position.y);
        this.ctx.lineTo(this.position.x, this.position.y + spriteHeight);
        this.ctx.lineTo(this.position.x + spriteWidth, this.position.y + spriteHeight);
        this.ctx.lineTo(this.position.x + spriteWidth, this.position.y);
        this.ctx.lineTo(this.position.x, this.position.y);
        this.ctx.strokeStyle = '#FFFB33';
        this.ctx.stroke();
    }
}

export const mainCharacter = new MainCharacter();
