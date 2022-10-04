class InputHandler {
    public pressedKey: number[];

    public lastPressedKey: number;

    constructor() {
        this.pressedKey = [];
        this.lastPressedKey = null;
    }

    private addKeyToPressed(keyCode) {
        this.lastPressedKey = keyCode;
        if (this.pressedKey.indexOf(keyCode) > -1) return;
        this.pressedKey.push(keyCode);
    }

    private removeKeyFromPressed(keyCode) {
        const index = this.pressedKey.indexOf(keyCode);
        if (index !== -1) {
            this.pressedKey.splice(index, 1);
        }
    }

    init() {
        document.addEventListener('keydown', (event) => {
            // TODO - here potential error (key to keyCode)
            this.addKeyToPressed(event.keyCode);
        });

        document.addEventListener('keyup', (event) => {
            // TODO - here potential error (key to keyCode)
            this.removeKeyFromPressed(event.keyCode);
        });
    }
}

export const inputHandler = new InputHandler();
