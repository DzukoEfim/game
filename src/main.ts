import { map_controller } from './controlers/MAP_Controller';
import { MainCharacter } from './entities/mainCharacter';
import { renderer } from './mechanics/renderer';
import { level_1_tiles, level_1_objects } from './maps/level1';
import { KeyboardManager } from './keyboardManager';

class Game {
    ctx: CanvasRenderingContext2D;
    mainCharacter: MainCharacter;

    constructor(context: CanvasRenderingContext2D) {
        this.ctx = context;

        this.initGameObjects();
    }

    initGameObjects() {
        renderer.initialize(this.ctx);

        // debug feature
        // keyBoardDrawer.initContext(this.ctx);
        this.mainCharacter = new MainCharacter(new KeyboardManager());
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
            this.mainCharacter.update(timeStepDiff);
            renderer.draw();

            if (timePassed > 1000) {
                time = null;
            }

            // debug feature
            // keyBoardDrawer.update();

            prevTimeStemp = timestamp;
            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
    }
}

export default Game;
