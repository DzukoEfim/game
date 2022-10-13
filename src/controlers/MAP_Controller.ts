import { renderer } from '../mechanics/renderer';
import { ITilesMap, IObjectsMap } from '../types';

const tileSize = 32;

export type Borders = {
    row: number,
    col: number
}

export class MAP_Controller {
    private tiles: ITilesMap = null;
    private objects: IObjectsMap = null;
    private bordersToDraw: Borders[] = [];

    public setTiles(tilesArray: ITilesMap): void {
        this.tiles = tilesArray;
    }

    public setObjects(objectsArray: IObjectsMap): void {
        this.objects = objectsArray;
    }

    public getTileDataByCoords(x: number, y: number) {
        const tile_row = Math.trunc(y / tileSize);
        const tile_col = Math.trunc(x / tileSize);
        this.bordersToDraw.push({ col: tile_row, row: tile_col });
        return this.tiles[tile_row]?.[tile_col];
    }

    public update(): void {
        this.drawTiles();
        this.drawObjects();
    }

    public drawTiles(): void {
        Object.keys(this.tiles).forEach((row) => {
            Object.keys(this.tiles[row]).forEach((col) => {
                this.tiles[row][col].tile.setPosition({
                    x: parseInt(col, 10) * tileSize,
                    y: parseInt(row, 10) * tileSize,
                });
                renderer.pushLayer('mapLayers', this.tiles[row][col].tile);
            });
        });
    }

    drawObjects() {
        Object.keys(this.objects).forEach((row) => {
            Object.keys(this.objects[row]).forEach((col) => {
                this.objects[row][col].objects.forEach((item) => {
                    item.setPosition({
                        x: parseInt(col, 10) * tileSize,
                        y: parseInt(row, 10) * tileSize,
                    });
                    renderer.pushLayer('objectsLayers', item);
                });
            });
        });
    }
}
