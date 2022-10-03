import { assets_cacher } from '../helpers/assetsCacher';
import { configurationProvider } from '../helpers/configurationProvider';
import { renderer } from '../mechanics/renderer';

const tileSize = 32;

class MAP_Controller {
  constructor (mapTiles = {}, mapObjects = {}) {
    this.tiles = mapTiles;
    this.objects = mapObjects;

    this.ctx = null;
    this.bordersToDraw = [];
  }

  initContext (ctx) {
    this.ctx = ctx;
  }

  setTiles (tilesArray) {
    this.tiles = tilesArray; // simplified for now
  }

  setObjects (objectsArray) {
    this.objects = objectsArray;
  }

  getTitleData (x, y) {
    if (!this.tiles[x] || !this.tiles[x]?.[y]) throw new Error (`no such tile - {x: ${x}, y: ${y}}`);

    return this.tiles[x][y];
  }

  getTileDataByCoords (x, y) {
    const tile_row = Math.trunc(y / tileSize);
    const tile_col = Math.trunc(x / tileSize);
    this.bordersToDraw.push({ col: tile_row, row: tile_col });
    return this.tiles[tile_row]?.[tile_col];
  }

  prepareAssets () {
    const uniqueTiles = {};
    for (let row in this.tiles) {
      for (let col in this.tiles[row]) {
        uniqueTiles[this.tiles[row][col].tile.getObjectType()] = this.tiles[row][col].tile;
      }
    }

    for (let row in this.objects) {
      for (let col in this.objects[row]) {
        this.objects[row][col].objects.forEach(item => {
          uniqueTiles[item.getObjectType()] = item;
        })
      }
    }

    assets_cacher.downloadAndCacheAssets(uniqueTiles);
  }

  update () {
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

  drawTiles () {
    for (let row in this.tiles) {
      for (let col in this.tiles[row]) {
        this.tiles[row][col].tile.setPosition(col * tileSize, row * tileSize)
        renderer.pushToMapLayers(this.tiles[row][col].tile, 0);
      }
    }
  }

  drawObjects () {
    for (let row in this.objects) {
      for (let col in this.objects[row]) {
        this.objects[row][col].objects.forEach(item => {
          item.setPosition(col * tileSize, row * tileSize);
          renderer.pushToObjectsLayers(item, 0)
        })
        
      }
    }
  }


  drawGrid () {
    let rowsAmount = Object.keys(this.tiles).length;
    let colsAmount = Object.keys(this.tiles['0']).length;
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

  drawBorders () {
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

    this.bordersToDraw = []; //clear array for next render;
  }

  drawTilesInfo () {
    this.ctx.font = '10px serif white';
    for (let row in this.tiles) {
      for (let col in this.tiles[row]) {
        this.ctx.strokeText(`${row}/${col}`, 5 + col * tileSize, 10 + row * tileSize);
      }
    }
    
    
    // this.ctx.strokeStyle = '#fffff';
  }
}

export const map_controller = new MAP_Controller();