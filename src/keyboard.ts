export class Keyboard {
    private pressedKey: number[];
    private listeners: Array<[(p: number[]) => void, number[]]> = [];

    constructor() {
        this.pressedKey = [];

        this.init();
    }

    listenKeyBoard(bindKeys: number[], callback: (pressedKey: number[]) => void) {
        this.listeners.push([callback, bindKeys]);
    }

    private addKeyToPressed(key: number) {
        if (this.pressedKey.indexOf(key) > -1) return;
        this.pressedKey.push(key);
    }

    private removeKeyFromPressed(key: number) {
        const index = this.pressedKey.indexOf(key);
        if (index !== -1) {
            this.pressedKey.splice(index, 1);
        }
    }

    private notifyListeners(keyCode: number) {
        this.listeners.forEach(([callback, keys]) => {
            if (keys.includes(keyCode)) callback(this.pressedKey);
        });
    }

    private init() {
        document.addEventListener('keydown', (event) => {
            this.addKeyToPressed(event.keyCode);
            this.notifyListeners(event.keyCode);
        });

        document.addEventListener('keyup', (event) => {
            this.removeKeyFromPressed(event.keyCode);
            this.notifyListeners(event.keyCode);
        });
    }
}
