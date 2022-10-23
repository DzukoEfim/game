import { MAP_Controller } from './controlers/MAP_Controller';
import { MainCharacter } from './entities/mainCharacter';
import { renderer } from './mechanics/renderer';
import { LevelOne } from './maps/level1';
// import { awds } from './constants';
import { keyboardController } from './mechanics/keyboard';
import { assetsLoader } from './assets/assetLoader';

class Game {
    ctx: CanvasRenderingContext2D;
    mainCharacter: MainCharacter;
    map_controller: MAP_Controller;

    constructor(context: CanvasRenderingContext2D) {
        this.ctx = context;

        this.initGameObjects();
    }

    initGameObjects() {
        renderer.initialize(this.ctx);

        this.mainCharacter = new MainCharacter();
        this.map_controller = new MAP_Controller();
    }

    static initResources(assetsUrls: string[]) {
        return assetsLoader.loadAssets(assetsUrls);
    }

    init() {
        let time = 0;
        let prevTimeStemp = 0;

        this.map_controller.setTiles(LevelOne.getLevel1Tiles());
        this.map_controller.setObjects(LevelOne.getLevel1Objects());
        keyboardController.init();

        // this.keyboard.listenKeyBoard(awds, (pressedKeys) => {
        //     if (pressedKeys.length) {
        //         this.mainCharacter.walk.start(pressedKeys[pressedKeys.length - 1]);
        //         this.mainCharacter.animation.start(pressedKeys[pressedKeys.length - 1]);
        //     } else {
        //         this.mainCharacter.walk.stop();
        //         this.mainCharacter.animation.stop();
        //     }
        // });

        const draw = (timestamp: number) => {
            if (!time) time = timestamp;

            this.ctx.clearRect(0, 0, 500, 500);

            const timePassed = timestamp - time;
            const timeStepDiff = timestamp - prevTimeStemp;

            keyboardController.update(timeStepDiff);
            this.map_controller.update();
            this.mainCharacter.update(timeStepDiff, keyboardController.pressedKey);
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
