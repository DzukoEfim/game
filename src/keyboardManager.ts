import { ViewDirections } from './animationManager';
import { ValueOf } from './types';

const keyActionMapper = {
    w: ViewDirections.UP,
    a: ViewDirections.LEFT,
    s: ViewDirections.DOWN,
    d: ViewDirections.RIGHT,
};

type KeyboardActions = ValueOf<typeof keyActionMapper>

export class KeyboardManager {
    private pressedKey: string[];
    private keyActionMapper = keyActionMapper;

    constructor() {
        this.pressedKey = [];

        this.init();
    }

    private addKeyToPressed(key: string) {
        if (this.pressedKey.indexOf(key) > -1) return;
        this.pressedKey.push(key);
    }

    private removeKeyFromPressed(key: string) {
        const index = this.pressedKey.indexOf(key);
        if (index !== -1) {
            this.pressedKey.splice(index, 1);
        }
    }

    private mapKeyToAction(key: string): KeyboardActions | undefined {
        return this.keyActionMapper[key];
    }

    getActions(): KeyboardActions[] {
        return this.pressedKey.map((key) => this.mapKeyToAction(key)).filter(Boolean);
    }

    private init() {
        document.addEventListener('keydown', ((event) => {
            this.addKeyToPressed(event.key);
        }));

        document.addEventListener('keyup', ((event) => {
            this.removeKeyFromPressed(event.key);
        }));
    }
}
