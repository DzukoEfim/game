import { map_controller } from './controlers/MAP_Controller';
import { keyBoardDrawer } from './gameObjects/keyBoardDrower';
import { mainCharacter } from './gameObjects/mainCharacter';
import { renderer } from './mechanics/renderer';
import { level_1_tiles, level_1_objects } from './resources/maps/level1';

class Game {
    ctx: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.ctx = context;

        this.initGameObjects();
    }

    initGameObjects() {
        renderer.initialize(this.ctx);
        keyBoardDrawer.initContext(this.ctx);
        mainCharacter.initContext(this.ctx);
        map_controller.setTiles(level_1_tiles);
        map_controller.setObjects(level_1_objects);
    }

    init() {
        let time = 0;
        let prevTimeStemp = 0;
        const draw = (timestamp: number) => {
            if (!time) time = timestamp;

            this.ctx.clearRect(0, 0, 500, 500);
            const timePassed = timestamp - time;
            const timeStepDiff = timestamp - prevTimeStemp;
            map_controller.update();
            mainCharacter.update(timeStepDiff);
            renderer.draw();

            if (timePassed > 1000) {
                time = null;
            }

            keyBoardDrawer.update();

            prevTimeStemp = timestamp;
            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
    }
}

export default Game;