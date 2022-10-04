import Game from './src/main';
import { inputHandler } from './src/mechanics/keyBoardReader';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid black';

document.body.appendChild(canvas);

inputHandler.init();
const game = new Game(canvas.getContext('2d'));
game.init();
