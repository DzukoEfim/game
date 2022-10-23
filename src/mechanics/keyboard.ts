export type PressedKeyObject = {
    key: number;
    pressDuration: number;
}

export class Keyboard {
    public pressedKey: PressedKeyObject[];

    constructor() {
        this.pressedKey = [];
    }

    private addKeyToPressed(key: number) {
        if (this.pressedKey.findIndex((keyObject) => keyObject.key === key) === -1) {
            this.pressedKey.push({ key, pressDuration: 0 });
        }
    }

    private removeKeyFromPressed(key: number) {
        const keyIndex = this.pressedKey.findIndex((keyObject) => keyObject.key === key);
        this.pressedKey.splice(keyIndex, 1);
    }

    public init() {
        document.addEventListener('keydown', (event) => {
            this.addKeyToPressed(event.keyCode);
        });

        document.addEventListener('keyup', (event) => {
            this.removeKeyFromPressed(event.keyCode);
        });
    }

    // Will be needed to calculate velocity in future
    public update(timestamp: number) {
        this.pressedKey.forEach((keyObject) => {
            keyObject.pressDuration += timestamp;
        });
    }
}

export const keyboardController = new Keyboard();
