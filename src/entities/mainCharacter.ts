import { animationTimings } from '../constants';
// import { map_controller } from '../controlers/MAP_Controller';
import { AnimatedSprite } from '../animatedSprite';
import { renderer } from '../mechanics/renderer';
import mainCharacterSprite from '../assets/chracterTiles/mainCharacter.png';
import { KeyboardManager } from '../keyboardManager';
import { WalkManager } from '../walkManager';

export class MainCharacter {
    private mainCharacterSprite: AnimatedSprite;
    private keyboardManager: KeyboardManager;
    private walkManager: WalkManager;

    constructor(keyboardManager: KeyboardManager) {
        this.mainCharacterSprite = new AnimatedSprite(
            { assetUrl: mainCharacterSprite },
            animationTimings,
        );
        this.keyboardManager = keyboardManager;
        this.walkManager = new WalkManager(keyboardManager, this.mainCharacterSprite);
    }

    public update(timePassed: number) {
        this.walkManager.update(timePassed);
        const pressedButtons = this.keyboardManager.getActions();
        const currentButton = pressedButtons[pressedButtons.length - 1];
        this.mainCharacterSprite.animateFrame(timePassed, currentButton);
        renderer.pushToObjectsLayers(this.mainCharacterSprite, 0);
    }

    // we should figure out the best way to detect collision. For now it is not working
    // private getNextTiles(x: number, y: number) {
    //     const multipliers = lookupToNeibhourTileModifier[this.lookDirection];
    //     return [
    //         map_controller.getTileDataByCoords(x + multipliers.firstTile.x, y + multipliers.firstTile.y),
    //         map_controller.getTileDataByCoords(x + multipliers.secondTile.x, y + multipliers.secondTile.y),
    //     ];
    // }
}
