import { configurationProvider } from '../helpers/configurationProvider';
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
    private ctx: CanvasRenderingContext2D = null;
    private objects: IObjectsMap = null;
    private bordersToDraw: Borders[] = [];

    public initContext(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
    }

    public setTiles(tilesArray: ITilesMap): void {
        this.tiles = tilesArray; // simplified for now
    }

    public setObjects(objectsArray: IObjectsMap): void {
        this.objects = objectsArray;
    }

    public getTitleData(x: number, y: number) {
        if (!this.tiles[x] || !this.tiles[x]?.[y]) throw new Error(`no such tile - {x: ${x}, y: ${y}}`);

        return this.tiles[x][y];
    }

    public getTileDataByCoords(x: number, y: number) {
        const tile_row = Math.trunc(y / tileSize);
        const tile_col = Math.trunc(x / tileSize);
        this.bordersToDraw.push({ col: tile_row, row: tile_col });
        return this.tiles[tile_row]?.[tile_col];
    }

    public prepareAssets(): void {
        const uniqueTiles = {};
        Object.keys(this.tiles).forEach((row) => {
            Object.keys(this.tiles[row]).forEach((col) => {
                uniqueTiles[this.tiles[row][col].tile.objectType] = this.tiles[row][col].tile;
            });
        });

        Object.keys(this.objects).forEach((row) => {
            Object.keys(this.objects[row]).forEach((col) => {
                this.objects[row][col].objects.forEach((item) => {
                    uniqueTiles[item.objectType] = item;
                });
            });
        });
    }

    public update(): void {
        this.drawTiles();
        this.drawObjects();

        if (configurationProvider.isGridAvailable()) {
            this.drawGrid();
        }

        if (configurationProvider.isGridAvaialable()) {
            this.drawTilesInfo();
        }

        this.drawBorders();
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

    drawGrid() {
        const rowsAmount = Object.keys(this.tiles).length;
        const colsAmount = Object.keys(this.tiles['0']).length;
        // rows
        for (let i = 0; i <= rowsAmount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * tileSize, 0);
            this.ctx.lineTo(i * tileSize, rowsAmount * tileSize);
            this.ctx.strokeStyle = '#000000';
            this.ctx.stroke();
        }

        for (let i = 0; i <= colsAmount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * tileSize);
            this.ctx.lineTo(rowsAmount * tileSize, i * tileSize);
            this.ctx.strokeStyle = '#000000';
            this.ctx.stroke();
        }
    }

    drawBorders() {
        for (let i = 0; i < this.bordersToDraw.length; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.bordersToDraw[i].row * tileSize, this.bordersToDraw[i].col * tileSize);
            this.ctx.lineTo(this.bordersToDraw[i].row * tileSize, this.bordersToDraw[i].col * tileSize + tileSize);
            this.ctx.lineTo(this.bordersToDraw[i].row * tileSize + tileSize, this.bordersToDraw[i].col * tileSize + tileSize);
            this.ctx.lineTo(this.bordersToDraw[i].row * tileSize + tileSize, this.bordersToDraw[i].col * tileSize);
            this.ctx.lineTo(this.bordersToDraw[i].row * tileSize, this.bordersToDraw[i].col * tileSize);
            this.ctx.strokeStyle = '#FF5733';
            this.ctx.stroke();
        }

        this.bordersToDraw = []; // clear array for next render;
    }

    drawTilesInfo() {
        this.ctx.font = '10px serif white';
        Object.keys(this.tiles).forEach((row) => {
            Object.keys(this.tiles[row]).forEach((col) => {
                // TODO why col and row counted as string without direct conversion to number?
                this.ctx.strokeText(`${row}/${col}`, 5 + +col * tileSize, 10 + +row * tileSize);
            });
        });
    }
}

export const map_controller = new MAP_Controller();
