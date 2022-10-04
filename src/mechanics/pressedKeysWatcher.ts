import { inputHandler } from '.';

export default class PressedKeysWatcher {
    private trackedKeys: number[];

    constructor(trackedKeys) {
        this.trackedKeys = trackedKeys;
    }

    getButtons(): number[] {
        return inputHandler.pressedKey.filter((item) => this.trackedKeys.indexOf(item) > -1);
    }

    // eslint-disable-next-line class-methods-use-this
    getLastPressedButton() { // TODO <---- candidate to change. Can be static method
        return inputHandler.lastPressedKey;
    }
}
