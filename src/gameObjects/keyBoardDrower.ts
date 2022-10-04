import { ICoordinates } from '../types/coordinates';
import { PressedKeysWatcher } from '../mechanics';
import {
    a_l, w_l, d_l, s_l, awd,
} from '../constants/keyboard';

class KeyBoardDrawer extends PressedKeysWatcher {
    private ctx: CanvasRenderingContext2D;
    private initialPosition: ICoordinates;

    constructor() {
        super(awd);
        this.ctx = null;
        this.initialPosition = {
            x: 250, y: 0,
        };
    }

    public initContext(ctx) {
        this.ctx = ctx;
    }

    public update() {
        const pressedButtons = this.getButtons();

        if (pressedButtons.length === 0) return;

        if (pressedButtons.includes(a_l)) this.drowArrowLeft();

        if (pressedButtons.includes(w_l)) this.drowArrowTop();

        if (pressedButtons.includes(d_l)) this.drowArrowRight();

        if (pressedButtons.includes(s_l)) this.drowArrowBottom();
    }

    private lineTo(x, y) {
        this.ctx.lineTo(this.initialPosition.x + x, this.initialPosition.y + y);
    }

    private moveTo(x, y) {
        this.ctx.moveTo(this.initialPosition.x + x, this.initialPosition.y + y);
    }

    public drowArrowLeft() {
        this.ctx.beginPath();
        this.moveTo(40, 40);
        this.lineTo(50, 30);
        this.lineTo(50, 50);
        this.lineTo(40, 40);

        this.ctx.stroke();
        this.ctx.strokeStyle = '#000000';
    }

    public drowArrowTop() {
        this.ctx.beginPath();
        this.moveTo(55, 27);
        this.lineTo(75, 27);
        this.lineTo(65, 17);
        this.lineTo(55, 27);

        this.ctx.stroke();
        this.ctx.strokeStyle = '#000000';
    }

    public drowArrowRight() {
        this.ctx.beginPath();
        this.moveTo(90, 40);
        this.lineTo(80, 30);
        this.lineTo(80, 50);
        this.lineTo(90, 40);

        this.ctx.stroke();
        this.ctx.strokeStyle = '#000000';
    }

    public drowArrowBottom() {
        this.ctx.beginPath();
        this.moveTo(55, 57);
        this.lineTo(75, 57);
        this.lineTo(65, 67);
        this.lineTo(55, 57);

        this.ctx.stroke();
        this.ctx.strokeStyle = '#000000';
    }
}

export const keyBoardDrawer = new KeyBoardDrawer();
