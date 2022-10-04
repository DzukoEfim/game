class InputHandler {
    constructor() {
        this._pressedKey = [];
        this._lastPressedKey = '';
    }

    get pressedKey() {
        return this._pressedKey;
    }

    get lastPressedKey() {
        return this._lastPressedKey;
    }

    _addKeyToPressed(keyCode) {
        this._lastPressedKey = keyCode;
        if (this._pressedKey.indexOf(keyCode) > -1) return;
        this._pressedKey.push(keyCode);
    }

    _removeKeyFromPressed(keyCode) {
        this._pressedKey.remove(keyCode);
    }

    init() {
        document.addEventListener('keydown', (event) => {
            this._addKeyToPressed(event.keyCode);
        });

        document.addEventListener('keyup', (event) => {
            this._removeKeyFromPressed(event.keyCode);
        });
    }
}

const inputHandler = new InputHandler();

class InputUser {
    constructor(trackedKeys) {
        this._trackedKeys = trackedKeys;
    }

    getButtons() {
        return inputHandler.pressedKey.filter((item) => this._trackedKeys.indexOf(item) > -1);
    }

    getLastPressedButton() {
        return inputHandler.lastPressedKey;
    }
}

export { inputHandler, InputUser };
