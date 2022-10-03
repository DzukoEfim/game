import { InputUser } from '../mechanics/keyBoardReader';
import { a_l, w_l, d_l, s_l, awd } from '../constants/keyboard';

class KeyBoardDrawer extends InputUser {
  constructor (ctx) {
    super(awd);
    this.ctx = null;
    this.initialPosition = {
      x: 250, y: 0
    }
  }

  initContext (ctx) {
    this.ctx = ctx;
  }

  update () {
    const pressedButtons = this.getButtons();

    if (pressedButtons.length === 0) return;
    
    if (pressedButtons.includes(a_l)) this.drowArrowLeft();

    if (pressedButtons.includes(w_l)) this.drowArrowTop();

    if (pressedButtons.includes(d_l)) this.drowArrowRight();

    if (pressedButtons.includes(s_l)) this.drowArrowBottom();
  }

  _lineTo (x, y) {
    this.ctx.lineTo(this.initialPosition.x + x, this.initialPosition.y + y);
  }

  _moveTo (x, y) {
    this.ctx.moveTo(this.initialPosition.x + x, this.initialPosition.y + y);
  }

  drowArrowLeft () {
    this.ctx.beginPath();
    this._moveTo(40, 40);
    this._lineTo(50, 30);
    this._lineTo(50, 50);
    this._lineTo(40, 40);

    this.ctx.stroke();
    this.ctx.strokeStyle = '#000000';
  }

  drowArrowTop () {
    this.ctx.beginPath();
    this._moveTo(55, 27);
    this._lineTo(75, 27);
    this._lineTo(65, 17);
    this._lineTo(55, 27);

    this.ctx.stroke();
    this.ctx.strokeStyle = '#000000';
  }

  drowArrowRight () {
    this.ctx.beginPath();
    this._moveTo(90, 40);
    this._lineTo(80, 30);
    this._lineTo(80, 50);
    this._lineTo(90, 40);

    this.ctx.stroke();
    this.ctx.strokeStyle = '#000000';
  }

  drowArrowBottom () {
    this.ctx.beginPath();
    this._moveTo(55, 57);
    this._lineTo(75, 57);
    this._lineTo(65, 67);
    this._lineTo(55, 57);

    this.ctx.stroke();
    this.ctx.strokeStyle = '#000000';
  }
}


export const keyBoardDrawer = new KeyBoardDrawer();