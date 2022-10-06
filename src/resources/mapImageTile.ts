import ImageTile from './imageTile';

type IPosition = {
    x: number;
    y: number;
}

export default class MapImageTile extends ImageTile {
    private objectType: string = null;
    private tile: HTMLImageElement = null;
    protected position: IPosition = {
        x: 0,
        y: 0,
    };

    constructor(objectType, type, tile) {
        super(type, tile);

        this.objectType = objectType;
    }

    getObjectType() {
        return this.objectType;
    }

    setPosition(x: number, y: number) {
        this.position.x = x;
        this.position.y = y;
    }

    getPosition() {
        return { ...this.position };
    }
}
