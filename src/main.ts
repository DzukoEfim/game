import { MAP_Controller } from './controlers/MAP_Controller';
import { MainCharacter } from './entities/mainCharacter';
import { renderer } from './mechanics/renderer';
import { level_1_tiles, level_1_objects } from './maps/level1';
import { awd } from './constants';
import { Keyboard } from './keyboard';

class Game {
    ctx: CanvasRenderingContext2D;
    mainCharacter: MainCharacter;
    map_controller: MAP_Controller;
    keyboard: Keyboard;

    constructor(context: CanvasRenderingContext2D) {
        this.ctx = context;

        this.initGameObjects();
    }

    initGameObjects() {
        renderer.initialize(this.ctx);

        this.mainCharacter = new MainCharacter();
        this.map_controller = new MAP_Controller();
        this.keyboard = new Keyboard();
    }

    init() {
        let time = 0;
        let prevTimeStemp = 0;

        this.map_controller.setTiles(level_1_tiles);
        this.map_controller.setObjects(level_1_objects);
        this.keyboard.listenKeyBoard(awd, (pressedKeys) => {
            if (pressedKeys.length) {
                this.mainCharacter.walk.start(pressedKeys[pressedKeys.length - 1]);
                this.mainCharacter.animation.start(pressedKeys[pressedKeys.length - 1]);
            } else {
                this.mainCharacter.walk.stop();
                this.mainCharacter.animation.stop();
            }
        });

        const draw = (timestamp: number) => {
            if (!time) time = timestamp;

            this.ctx.clearRect(0, 0, 500, 500);

            const timePassed = timestamp - time;
            const timeStepDiff = timestamp - prevTimeStemp;

            this.map_controller.update();
            this.mainCharacter.update(timeStepDiff);
            renderer.draw();

            if (timePassed > 1000) {
                time = null;
            }

            prevTimeStemp = timestamp;
            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
    }
}

export default Game;
