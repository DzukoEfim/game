import { renderer } from '../mechanics/renderer';
import { ITilesMap } from '../resources/mapTiles';
import { IObjectsMap } from '../resources/objectsTiles';

const tileSize = 32;

export type Borders = {
    row: number,
    col: number
}

class MAP_Controller {
    private tiles: ITilesMap = null;
    private objects: IObjectsMap = null;
    private bordersToDraw: Borders[] = [];

    public setTiles(tilesArray: ITilesMap): void {
        this.tiles = tilesArray; // simplified for now
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
                renderer.pushToMapLayers(this.tiles[row][col].tile, 0);
            });
        });
    }

    drawObjects() {
        Object.keys(this.objects).forEach((row) => {
            Object.keys(this.objects[row]).forEach((col) => {
                this.objects[row][col].objects.forEach((item) => {
                    // TODO why col and row counted as string without direct conversion to number?
                    item.setPosition({
                        x: parseInt(col, 10) * tileSize,
                        y: parseInt(row, 10) * tileSize,
                    });
                    renderer.pushToObjectsLayers(item, 0);
                });
            });
        });
    }
}

export const map_controller = new MAP_Controller();
