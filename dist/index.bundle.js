/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/objectsTiles/bridge2.png":
/*!*********************************************!*\
  !*** ./src/assets/objectsTiles/bridge2.png ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "4851f771026d06657a22b8d110382054.png");

/***/ }),

/***/ "./src/constants/keyboard.js":
/*!***********************************!*\
  !*** ./src/constants/keyboard.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a_l": () => (/* binding */ a_l),
/* harmony export */   "w_l": () => (/* binding */ w_l),
/* harmony export */   "d_l": () => (/* binding */ d_l),
/* harmony export */   "s_l": () => (/* binding */ s_l),
/* harmony export */   "awd": () => (/* binding */ awd)
/* harmony export */ });
const a_l = 65;
const w_l = 87;
const d_l = 68;
const s_l = 83;

const awd = [a_l, w_l, d_l, s_l];

/***/ }),

/***/ "./src/constants/types.constants.js":
/*!******************************************!*\
  !*** ./src/constants/types.constants.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "image_tile": () => (/* binding */ image_tile)
/* harmony export */ });
const image_tile = 'image_tile';


/***/ }),

/***/ "./src/controlers/MAP_Controller.js":
/*!******************************************!*\
  !*** ./src/controlers/MAP_Controller.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "map_controller": () => (/* binding */ map_controller)
/* harmony export */ });
/* harmony import */ var _helpers_assetsCacher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/assetsCacher */ "./src/helpers/assetsCacher.js");
/* harmony import */ var _helpers_configurationProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/configurationProvider */ "./src/helpers/configurationProvider.js");
/* harmony import */ var _mechanics_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mechanics/renderer */ "./src/mechanics/renderer.js");




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

    _helpers_assetsCacher__WEBPACK_IMPORTED_MODULE_0__.assets_cacher.downloadAndCacheAssets(uniqueTiles);
  }

  update () {
    this.drawTiles();
    this.drawObjects();


    if (_helpers_configurationProvider__WEBPACK_IMPORTED_MODULE_1__.configurationProvider.isGridAvailable()) {
      this.drawGrid();
    }

    if (_helpers_configurationProvider__WEBPACK_IMPORTED_MODULE_1__.configurationProvider.isGridAvaialable()) {
      this.drawTilesInfo();
    }

    this.drawBorders();
  }

  drawTiles () {
    for (let row in this.tiles) {
      for (let col in this.tiles[row]) {
        this.tiles[row][col].tile.setPosition(col * tileSize, row * tileSize)
        _mechanics_renderer__WEBPACK_IMPORTED_MODULE_2__.renderer.pushToMapLayers(this.tiles[row][col].tile, 0);
      }
    }
  }

  drawObjects () {
    for (let row in this.objects) {
      for (let col in this.objects[row]) {
        this.objects[row][col].objects.forEach(item => {
          item.setPosition(col * tileSize, row * tileSize);
          _mechanics_renderer__WEBPACK_IMPORTED_MODULE_2__.renderer.pushToObjectsLayers(item, 0)
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

const map_controller = new MAP_Controller();

/***/ }),

/***/ "./src/gameObjects/keyBoardDrower.js":
/*!*******************************************!*\
  !*** ./src/gameObjects/keyBoardDrower.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "keyBoardDrawer": () => (/* binding */ keyBoardDrawer)
/* harmony export */ });
/* harmony import */ var _mechanics_keyBoardReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mechanics/keyBoardReader */ "./src/mechanics/keyBoardReader.js");
/* harmony import */ var _constants_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/keyboard */ "./src/constants/keyboard.js");



class KeyBoardDrawer extends _mechanics_keyBoardReader__WEBPACK_IMPORTED_MODULE_0__.InputUser {
  constructor (ctx) {
    super(_constants_keyboard__WEBPACK_IMPORTED_MODULE_1__.awd);
    this.ctx = null;
    this.initialPosition = {
      x: 250, y: 0
    }
  }

  initContext (ctx) {
    this.ctx = ctx;
  }

  update () {
    const pressedButtons = this.getButtons();

    if (pressedButtons.length === 0) return;
    
    if (pressedButtons.includes(_constants_keyboard__WEBPACK_IMPORTED_MODULE_1__.a_l)) this.drowArrowLeft();

    if (pressedButtons.includes(_constants_keyboard__WEBPACK_IMPORTED_MODULE_1__.w_l)) this.drowArrowTop();

    if (pressedButtons.includes(_constants_keyboard__WEBPACK_IMPORTED_MODULE_1__.d_l)) this.drowArrowRight();

    if (pressedButtons.includes(_constants_keyboard__WEBPACK_IMPORTED_MODULE_1__.s_l)) this.drowArrowBottom();
  }

  _lineTo (x, y) {
    this.ctx.lineTo(this.initialPosition.x + x, this.initialPosition.y + y);
  }

  _moveTo (x, y) {
    this.ctx.moveTo(this.initialPosition.x + x, this.initialPosition.y + y);
  }

  drowArrowLeft () {
    this.ctx.beginPath();
    this._moveTo(40, 40);
    this._lineTo(50, 30);
    this._lineTo(50, 50);
    this._lineTo(40, 40);

    this.ctx.stroke();
    this.ctx.strokeStyle = '#000000';
  }

  drowArrowTop () {
    this.ctx.beginPath();
    this._moveTo(55, 27);
    this._lineTo(75, 27);
    this._lineTo(65, 17);
    this._lineTo(55, 27);

    this.ctx.stroke();
    this.ctx.strokeStyle = '#000000';
  }

  drowArrowRight () {
    this.ctx.beginPath();
    this._moveTo(90, 40);
    this._lineTo(80, 30);
    this._lineTo(80, 50);
    this._lineTo(90, 40);

    this.ctx.stroke();
    this.ctx.strokeStyle = '#000000';
  }

  drowArrowBottom () {
    this.ctx.beginPath();
    this._moveTo(55, 57);
    this._lineTo(75, 57);
    this._lineTo(65, 67);
    this._lineTo(55, 57);

    this.ctx.stroke();
    this.ctx.strokeStyle = '#000000';
  }
}


const keyBoardDrawer = new KeyBoardDrawer();

/***/ }),

/***/ "./src/gameObjects/mainCharacter.js":
/*!******************************************!*\
  !*** ./src/gameObjects/mainCharacter.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mainCharacter": () => (/* binding */ mainCharacter)
/* harmony export */ });
/* harmony import */ var _mechanics_keyBoardReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mechanics/keyBoardReader */ "./src/mechanics/keyBoardReader.js");
/* harmony import */ var _constants_keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/keyboard */ "./src/constants/keyboard.js");
/* harmony import */ var _controlers_MAP_Controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controlers/MAP_Controller */ "./src/controlers/MAP_Controller.js");
/* harmony import */ var _resources_objectsTiles_mainCharacterConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../resources/objectsTiles/mainCharacterConstants */ "./src/resources/objectsTiles/mainCharacterConstants.js");
/* harmony import */ var _resources_objectsTiles_mainCharacterDrawer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../resources/objectsTiles/mainCharacterDrawer */ "./src/resources/objectsTiles/mainCharacterDrawer.js");
/* harmony import */ var _helpers_assetsCacher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/assetsCacher */ "./src/helpers/assetsCacher.js");
/* harmony import */ var _mechanics_renderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../mechanics/renderer */ "./src/mechanics/renderer.js");








const maxSpeed = 100; // pixels/second

class MainCharacter extends _mechanics_keyBoardReader__WEBPACK_IMPORTED_MODULE_0__.InputUser {
  constructor () {
    super([_constants_keyboard__WEBPACK_IMPORTED_MODULE_1__.a_l, _constants_keyboard__WEBPACK_IMPORTED_MODULE_1__.w_l, _constants_keyboard__WEBPACK_IMPORTED_MODULE_1__.d_l, _constants_keyboard__WEBPACK_IMPORTED_MODULE_1__.s_l]);
    this.ctx = null;

    this.position = { x: 0, y: 0 };
    this.buttonPressedTimings = { a: 0, w: 0, d: 0 };

    this.speed = 0;
    this.acceleration_x = 0;
    this.acceleration_y = 0;

    this.lookDirection = null;
  }

  initContext (ctx) {
    this.ctx = ctx;
  }

  update (timePassed) {
    const pressedButtons = this.getButtons();

    this._updateSpeed(pressedButtons);

    if (pressedButtons.length) this.updateLookDirection(pressedButtons);
    
    if (pressedButtons.length) this._updateCoordinates(timePassed);
    
    this._drawParams();
    this.drawCharacter(timePassed);
    if (true) this.drawCharacterBorder();
  }

  updateLookDirection (pressedButtons) {
    this.lookDirection = pressedButtons[pressedButtons.length - 1];
  }

  _drawParams () {
    this.ctx.font = '10px serif';
    this.ctx.fillText(`speed: ${this.speed}`, 400, 20);
    this.ctx.fillText(`d_button pressed: ${this.buttonPressedTimings.d}`, 400, 30);
    this.ctx.fillText(`acceleration: ${this.acceleration_x}`, 400, 40);
  }

  _updateSpeed (pressedButtons) {
    this.speed = pressedButtons.length ? maxSpeed : 0; 
  }

  _updateCoordinates (timePassed) {
    const newPositionObject = this._getCoordsOfNextPosition(timePassed);
    const nextTileToGo = this.getNextTiles(newPositionObject.x, newPositionObject.y);
    if (nextTileToGo[0]?.tile.isTilePassable() && nextTileToGo[1]?.tile.isTilePassable()) {
        this.position = newPositionObject;
      }
  }

  _getCoordsOfNextPosition (timePassed) {
    const axisParameters = _resources_objectsTiles_mainCharacterConstants__WEBPACK_IMPORTED_MODULE_3__.buttonToDirectionMapping[this.lookDirection];
    const pixelsToGo = this.speed * (timePassed / 1000) * axisParameters.multiplier;
    const positionObject = {
      x: this.position.x,
      y: this.position.y
    };

    positionObject[axisParameters.value] += pixelsToGo;
    return positionObject;
  }

  drawCharacter (timePassed) {
    const pressedButtons = this.getButtons();
    const currentButton = pressedButtons[pressedButtons.length - 1];

    _resources_objectsTiles_mainCharacterDrawer__WEBPACK_IMPORTED_MODULE_4__.mainCharacterDrawer.setPosition(this.position.x, this.position.y);
    _resources_objectsTiles_mainCharacterDrawer__WEBPACK_IMPORTED_MODULE_4__.mainCharacterDrawer.updateFrameParameters(timePassed, currentButton);
    _mechanics_renderer__WEBPACK_IMPORTED_MODULE_6__.renderer.pushToObjectsLayers(_resources_objectsTiles_mainCharacterDrawer__WEBPACK_IMPORTED_MODULE_4__.mainCharacterDrawer, 0);
  }

  getNextTiles (x, y) {
    const multipliers = _resources_objectsTiles_mainCharacterConstants__WEBPACK_IMPORTED_MODULE_3__.lookupToNeibhourTileModifier[this.lookDirection];
    return [
      _controlers_MAP_Controller__WEBPACK_IMPORTED_MODULE_2__.map_controller.getTileDataByCoords(x + multipliers.firstTile.x, y + multipliers.firstTile.y),
      _controlers_MAP_Controller__WEBPACK_IMPORTED_MODULE_2__.map_controller.getTileDataByCoords(x + multipliers.secondTile.x, y + multipliers.secondTile.y)
    ];
  }

  prepareTiles () {
    _helpers_assetsCacher__WEBPACK_IMPORTED_MODULE_5__.assets_cacher.downloadAndCacheAssets({[_resources_objectsTiles_mainCharacterDrawer__WEBPACK_IMPORTED_MODULE_4__.mainCharacterDrawer.getObjectType()]: _resources_objectsTiles_mainCharacterDrawer__WEBPACK_IMPORTED_MODULE_4__.mainCharacterDrawer});
  }

  drawCharacterBorder () {
    this.ctx.beginPath();
    this.ctx.moveTo(this.position.x, this.position.y);
    this.ctx.lineTo(this.position.x, this.position.y + _resources_objectsTiles_mainCharacterConstants__WEBPACK_IMPORTED_MODULE_3__.spriteHeight);
    this.ctx.lineTo(this.position.x + _resources_objectsTiles_mainCharacterConstants__WEBPACK_IMPORTED_MODULE_3__.spriteWidth, this.position.y + _resources_objectsTiles_mainCharacterConstants__WEBPACK_IMPORTED_MODULE_3__.spriteHeight);
    this.ctx.lineTo(this.position.x + _resources_objectsTiles_mainCharacterConstants__WEBPACK_IMPORTED_MODULE_3__.spriteWidth, this.position.y);
    this.ctx.lineTo(this.position.x, this.position.y);
    this.ctx.strokeStyle = '#FFFB33';
    this.ctx.stroke();
  }
}

const mainCharacter = new MainCharacter();

/***/ }),

/***/ "./src/helpers/assetsCacher.js":
/*!*************************************!*\
  !*** ./src/helpers/assetsCacher.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assets_cacher": () => (/* binding */ assets_cacher)
/* harmony export */ });
class AssetsCacher {
  constructor () {
    this.cachedSprites = {};
  }

  getAsset (assetType) {
    return this.cachedSprites[assetType];
  }

  downloadAndCacheAssets (assetsObject) {
    for (let key in assetsObject) {
      if (this.cachedSprites[key]) continue;
      this.cachedSprites[key] = new Image(); //temporary solution
      assetsObject[key].download()
        .then(data => {
          this.cachedSprites[key] = data;
        })
    }
  }
}

const assets_cacher = new AssetsCacher();

/***/ }),

/***/ "./src/helpers/configurationProvider.js":
/*!**********************************************!*\
  !*** ./src/helpers/configurationProvider.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "configurationProvider": () => (/* binding */ configurationProvider)
/* harmony export */ });
class ConfigurationProvider {

  isGridAvailable () {
    return true;
  }

  isGridAvaialable () {
    return true;
  }

}

const configurationProvider = new ConfigurationProvider();

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _controlers_MAP_Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controlers/MAP_Controller */ "./src/controlers/MAP_Controller.js");
/* harmony import */ var _gameObjects_keyBoardDrower__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameObjects/keyBoardDrower */ "./src/gameObjects/keyBoardDrower.js");
/* harmony import */ var _gameObjects_mainCharacter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameObjects/mainCharacter */ "./src/gameObjects/mainCharacter.js");
/* harmony import */ var _mechanics_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mechanics/renderer */ "./src/mechanics/renderer.js");
/* harmony import */ var _resources_maps_level1__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resources/maps/level1 */ "./src/resources/maps/level1.js");






class Game {
    constructor(context) {
        this.ctx = context;

        this.initGameObjects();
    }

    initGameObjects() {
        _mechanics_renderer__WEBPACK_IMPORTED_MODULE_3__.renderer.initialize(this.ctx);
        _gameObjects_keyBoardDrower__WEBPACK_IMPORTED_MODULE_1__.keyBoardDrawer.initContext(this.ctx);
        _gameObjects_mainCharacter__WEBPACK_IMPORTED_MODULE_2__.mainCharacter.initContext(this.ctx);
        _gameObjects_mainCharacter__WEBPACK_IMPORTED_MODULE_2__.mainCharacter.prepareTiles();
        _controlers_MAP_Controller__WEBPACK_IMPORTED_MODULE_0__.map_controller.initContext(this.ctx);
        _controlers_MAP_Controller__WEBPACK_IMPORTED_MODULE_0__.map_controller.setTiles(_resources_maps_level1__WEBPACK_IMPORTED_MODULE_4__.level_1_tiles);
        _controlers_MAP_Controller__WEBPACK_IMPORTED_MODULE_0__.map_controller.setObjects(_resources_maps_level1__WEBPACK_IMPORTED_MODULE_4__.level_1_objects);
        _controlers_MAP_Controller__WEBPACK_IMPORTED_MODULE_0__.map_controller.prepareAssets();
    }

    init() {
        let time = 0;
        let prevTimeStemp = 0;
        const draw = (timestamp) => {
            if (!time) time = timestamp;

            this.ctx.clearRect(0, 0, 500, 500);
            const timePassed = timestamp - time;
            const timeStepDiff = timestamp - prevTimeStemp;
            _controlers_MAP_Controller__WEBPACK_IMPORTED_MODULE_0__.map_controller.update(timeStepDiff);
            _gameObjects_mainCharacter__WEBPACK_IMPORTED_MODULE_2__.mainCharacter.update(timeStepDiff);

            _mechanics_renderer__WEBPACK_IMPORTED_MODULE_3__.renderer.draw();

            if (timePassed > 1000) {
                time = null;
            }

            _gameObjects_keyBoardDrower__WEBPACK_IMPORTED_MODULE_1__.keyBoardDrawer.update(timePassed);

            prevTimeStemp = timestamp;
            requestAnimationFrame(draw);
        };

        requestAnimationFrame(draw);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);


/***/ }),

/***/ "./src/mechanics/keyBoardReader.js":
/*!*****************************************!*\
  !*** ./src/mechanics/keyBoardReader.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inputHandler": () => (/* binding */ inputHandler),
/* harmony export */   "InputUser": () => (/* binding */ InputUser)
/* harmony export */ });
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




/***/ }),

/***/ "./src/mechanics/renderer.js":
/*!***********************************!*\
  !*** ./src/mechanics/renderer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderer": () => (/* binding */ renderer)
/* harmony export */ });
/* harmony import */ var _constants_types_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/types.constants */ "./src/constants/types.constants.js");


class Renderer {
    constructor() {
        this.ctx = null;
        this.layers = {
            backgroundLayers: { 0: [] },
            mapLayers: { 0: [] },
            objectsLayers: { 0: [] },
            interfaceLayers: { 0: [] },
        };

        this.typeToDrawingFunctionMapping = {};
    }

    initialize(ctx) {
        this.ctx = ctx;
    }

    pushToBackgroundLayers(obj, layer) {
        if (layer === undefined) throw new Error('Renderer: layer is not specified');
        if (!this.layers.backgroundLayers[layer]) {
            this.layers.backgroundLayers[layer] = [obj];
        } else {
            this.layers.backgroundLayers[layer].push(obj);
        }
    }

    pushToMapLayers(obj, layer) {
        if (layer === undefined) throw new Error('Renderer: layer is not specified');
        if (!this.layers.mapLayers[layer]) {
            this.layers.mapLayers[layer] = [obj];
        } else {
            this.layers.mapLayers[layer].push(obj);
        }
    }

    pushToObjectsLayers(obj, layer) {
        if (layer === undefined) throw new Error('Renderer: layer is not specified');
        if (!this.layers.objectsLayers[layer]) {
            this.layers.objectsLayers[layer] = [obj];
        } else {
            this.layers.objectsLayers[layer].push(obj);
        }
    }

    draw() {
        this.drawBackgroundLayers();
        this.drawMapLayers();
        this.drawObjectsLayers();
        this.drawinterfaceLayers();

        this.resetLayersObject();
    }

    drawBackgroundLayers() {
        for (let layerIndex in this.layers.backgroundLayers) {
            const tiles = this.layers.backgroundLayers[layerIndex];
            if (!this.layers.backgroundLayers[layerIndex].length) continue;

            tiles.forEach((tile) => {
                const type = tile.getType();
                if (!type) throw new Error('Renderer: missing or unknown type');

                const renderConfiguration = tile.getRenderConfiguration();
                this.renderByType(type, renderConfiguration);
            });
        }
    }

    drawMapLayers() {
        for (let layerIndex in this.layers.mapLayers) {
            const tiles = this.layers.mapLayers[layerIndex];
            if (!this.layers.mapLayers[layerIndex].length) continue;

            tiles.forEach((tile) => {
                const type = tile.getType();
                if (!type) throw new Error('Renderer: missing or unknown type');

                const renderConfiguration = tile.getRenderConfiguration();
                this.renderByType(type, renderConfiguration);
            });
        }
    }

    drawObjectsLayers() {
        for (let layerIndex in this.layers.objectsLayers) {
            const tiles = this.layers.objectsLayers[layerIndex];
            if (!this.layers.objectsLayers[layerIndex].length) continue;

            tiles.forEach((tile) => {
                const type = tile.getType();
                if (!type) throw new Error('Renderer: missing or unknown type');

                const renderConfiguration = tile.getRenderConfiguration();
                this.renderByType(type, renderConfiguration);
            });
        }
    }

    drawinterfaceLayers() {
        for (let layerIndex in this.layers.interfaceLayers) {
            const tiles = this.layers.interfaceLayers[layerIndex];
            if (!this.layers.interfaceLayers[layerIndex].length) continue;

            tiles.forEach((tile) => {
                const type = tile.getType();
                if (!type) throw new Error('Renderer: missing or unknown type');

                const renderConfiguration = tile.getRenderConfiguration();
                this.renderByType(type, renderConfiguration);
            });
        }
    }

    renderByType(type, renderConfiguration) {
        if (type === _constants_types_constants__WEBPACK_IMPORTED_MODULE_0__.image_tile) {
            this.renderImageSprite(renderConfiguration);
            return;
        }
    }

    renderImageSprite(renderConfiguration = []) {
        this.ctx.drawImage(...renderConfiguration);
    }

    resetLayersObject() {
        this.layers = {
            backgroundLayers: { 0: [] },
            mapLayers: { 0: [] },
            objectsLayers: { 0: [] },
            interfaceLayers: { 0: [] },
        };
    }
}

const renderer = new Renderer();


/***/ }),

/***/ "./src/resources/imageTile.js":
/*!************************************!*\
  !*** ./src/resources/imageTile.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImageTile)
/* harmony export */ });
class ImageTile {
    constructor(type, assetUrl) {
        this.type = type;
        this.assetUrl = assetUrl;
    }

    getType() {
        return this.type;
    }

    download() {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve(img);
            };

            img.onerror = (err) => {
                reject(err);
            };

            img.src = this.assetUrl;
        });
    }
}


/***/ }),

/***/ "./src/resources/mapImageTile.js":
/*!***************************************!*\
  !*** ./src/resources/mapImageTile.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MapImageTile)
/* harmony export */ });
/* harmony import */ var _imageTile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imageTile */ "./src/resources/imageTile.js");


class MapImageTile extends _imageTile__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(objectType, ...props) {
        super(...props);
        this.position = {
            x: 0,
            y: 0,
        };

        this.objectType = objectType;
    }

    getObjectType() {
        return this.objectType;
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    getPosition() {
        return { ...this.position };
    }
}


/***/ }),

/***/ "./src/resources/mapTiles/bridgeTile.js":
/*!**********************************************!*\
  !*** ./src/resources/mapTiles/bridgeTile.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BridgeTile)
/* harmony export */ });
/* harmony import */ var _mapImageTile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mapImageTile */ "./src/resources/mapImageTile.js");
/* harmony import */ var _helpers_assetsCacher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/assetsCacher */ "./src/helpers/assetsCacher.js");
/* harmony import */ var _constants_types_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/types.constants */ "./src/constants/types.constants.js");
/* harmony import */ var _assets_objectsTiles_bridge2_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/objectsTiles/bridge2.png */ "./src/assets/objectsTiles/bridge2.png");





class BridgeTile extends _mapImageTile__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor () {
    super('bridge', _constants_types_constants__WEBPACK_IMPORTED_MODULE_2__.image_tile, _assets_objectsTiles_bridge2_png__WEBPACK_IMPORTED_MODULE_3__.default);
    this.tileSettings = {
      sx: 0,
      sy: 0,
      sWidth: 47,
      sHeight: 59
    }
  }

  getRenderConfiguration () {
    return [
      _helpers_assetsCacher__WEBPACK_IMPORTED_MODULE_1__.assets_cacher.getAsset(this.getObjectType()),
      this.tileSettings.sx,
      this.tileSettings.sy,
      this.tileSettings.sWidth,
      this.tileSettings.sHeight,
      this.position.x - 5,
      this.position.y - 10,
      this.tileSettings.sWidth,
      this.tileSettings.sHeight
    ];
  }

  positionModifier (char_x0, char_x1, char_y0, char_y1) {
    console.log()
  }
}

/***/ }),

/***/ "./src/resources/mapTiles/grassTile.js":
/*!*********************************************!*\
  !*** ./src/resources/mapTiles/grassTile.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GrassTile)
/* harmony export */ });
/* harmony import */ var _mapImageTile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mapImageTile */ "./src/resources/mapImageTile.js");
/* harmony import */ var _helpers_assetsCacher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/assetsCacher */ "./src/helpers/assetsCacher.js");
/* harmony import */ var _constants_types_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/types.constants */ "./src/constants/types.constants.js");




class GrassTile extends _mapImageTile__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor (passable = true) {
    super('grass', _constants_types_constants__WEBPACK_IMPORTED_MODULE_2__.image_tile, 'dist/mapTiles/trees-and-bushes.png');
    this.tileSettings = {
      sx: 0,
      sy: 0,
      sWidth: 32,
      sHeight: 32
    };
    this.passable = passable;
  }

  getRenderConfiguration () {
    return [
      _helpers_assetsCacher__WEBPACK_IMPORTED_MODULE_1__.assets_cacher.getAsset(this.getObjectType()),
      this.tileSettings.sx,
      this.tileSettings.sy,
      this.tileSettings.sWidth,
      this.tileSettings.sHeight,
      this.position.x,
      this.position.y,
      this.tileSettings.sWidth,
      this.tileSettings.sHeight,
    ]
  }

  isTilePassable () {
    return this.passable;
  }
}

/***/ }),

/***/ "./src/resources/mapTiles/riverTile.js":
/*!*********************************************!*\
  !*** ./src/resources/mapTiles/riverTile.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WaterTile)
/* harmony export */ });
/* harmony import */ var _mapImageTile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mapImageTile */ "./src/resources/mapImageTile.js");
/* harmony import */ var _helpers_assetsCacher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/assetsCacher */ "./src/helpers/assetsCacher.js");
/* harmony import */ var _constants_types_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants/types.constants */ "./src/constants/types.constants.js");




class WaterTile extends _mapImageTile__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor (passable = false) {
    super('water', _constants_types_constants__WEBPACK_IMPORTED_MODULE_2__.image_tile, 'dist/mapTiles/water.png');

    this.passable = passable;
    this.tileSettings = {
      sx: 0,
      sy: 0,
      sWidth: 32,
      sHeight: 32
    };
  }

  getRenderConfiguration () {
    return [
      _helpers_assetsCacher__WEBPACK_IMPORTED_MODULE_1__.assets_cacher.getAsset(this.getObjectType()),
      this.position.x,
      this.position.y
    ]
  }

  isTilePassable () {
    return this.passable;
  }

}

/***/ }),

/***/ "./src/resources/maps/level1.js":
/*!**************************************!*\
  !*** ./src/resources/maps/level1.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "level_1_objects": () => (/* binding */ level_1_objects),
/* harmony export */   "level_1_tiles": () => (/* binding */ level_1_tiles)
/* harmony export */ });
/* harmony import */ var _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mapTiles/grassTile */ "./src/resources/mapTiles/grassTile.js");
/* harmony import */ var _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mapTiles/riverTile */ "./src/resources/mapTiles/riverTile.js");
/* harmony import */ var _mapTiles_bridgeTile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mapTiles/bridgeTile */ "./src/resources/mapTiles/bridgeTile.js");




const level_1_objects = {
  7: {
    3: {
      objects: [new _mapTiles_bridgeTile__WEBPACK_IMPORTED_MODULE_2__.default()]
    }
  }
}

const level_1_tiles = {
  0: {
    0: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    1: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    2: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    3:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    4: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    5: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    6: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    7: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    8: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    9: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    10: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
  },

  1: {
    0: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    1: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    2: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    3: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    4:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    5: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    6: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    7: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    8: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    9: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    10: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
  },

  2: {
    0:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    1: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    2: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    3: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    4: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    5: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    6: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    7: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    8: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    9: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    10: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
  },

  3: {
    0: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    1: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    2: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default(),
    },
    3: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    4: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    5: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    6: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    7: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    8: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    9: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    10: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    }
  },
  
  4: {
    0:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    1: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    2: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    3:{
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    4:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    5: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    6: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    7: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    8: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    9: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    10: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
  },

  5: {
    0:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    1: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    2: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    3:{
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    4:{
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    5: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    6: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    7: {
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default() 
    },
    8: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    9: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    10: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
  },

  6: {
    0:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    1: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    2: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    3:{
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    4:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    5: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    6: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    7: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    8: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    9: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    10: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
  },

  7: {
    0:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    1: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    2: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    3:{
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default(true)
    },
    4:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    5: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    6: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    7: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    8: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    9: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    10: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
  },

  8: {
    0:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    1: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    2: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    3:{
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    4:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    5: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    6: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    7: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    8: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    9: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    10: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
  },

  9: {
    0:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    1: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    2: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    3:{
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    4:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    5: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    6: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    7: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    8: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    9: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    10: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
  },

  10: {
    0:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    1: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    2: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    3:{
      tile: new _mapTiles_riverTile__WEBPACK_IMPORTED_MODULE_1__.default()
    },
    4:{
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    5: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    6: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    7: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    8: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    9: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
    10: {
      tile: new _mapTiles_grassTile__WEBPACK_IMPORTED_MODULE_0__.default()
    },
  }
};

/***/ }),

/***/ "./src/resources/objectsTiles/mainCharacterConstants.js":
/*!**************************************************************!*\
  !*** ./src/resources/objectsTiles/mainCharacterConstants.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "top": () => (/* binding */ top),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "bottom": () => (/* binding */ bottom),
/* harmony export */   "spriteWidth": () => (/* binding */ spriteWidth),
/* harmony export */   "spriteHeight": () => (/* binding */ spriteHeight),
/* harmony export */   "buttonToDirectionMapping": () => (/* binding */ buttonToDirectionMapping),
/* harmony export */   "lookupToNeibhourTileModifier": () => (/* binding */ lookupToNeibhourTileModifier),
/* harmony export */   "animationTimings": () => (/* binding */ animationTimings)
/* harmony export */ });
/* harmony import */ var _constants_keyboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/keyboard */ "./src/constants/keyboard.js");


const right = 'right';
const top = 'top';
const left = 'left';
const bottom = 'bottom';

const spriteWidth = 33;
const spriteHeight = 41;

const buttonToDirectionMapping = {
  [_constants_keyboard__WEBPACK_IMPORTED_MODULE_0__.a_l]: {
    value: 'x',
    multiplier: -1,
    direction: 'left',
  },
  [_constants_keyboard__WEBPACK_IMPORTED_MODULE_0__.w_l]: {
    value: 'y',
    multiplier: -1,
    direction: 'top'
  },
  [_constants_keyboard__WEBPACK_IMPORTED_MODULE_0__.d_l]: {    
    value: 'x',
    multiplier: 1,
    direction: 'right'
  },
  [_constants_keyboard__WEBPACK_IMPORTED_MODULE_0__.s_l]: {
    value: 'y',
    multiplier: 1,
    direction: 'bottom'
  }
};

const lookupToNeibhourTileModifier = {
  [_constants_keyboard__WEBPACK_IMPORTED_MODULE_0__.a_l]: {
    firstTile: { x: 0, y: spriteHeight - 3 },
    secondTile: { x: 0, y: spriteHeight / 2 + 3 }
  },
  [_constants_keyboard__WEBPACK_IMPORTED_MODULE_0__.w_l]: {
    firstTile: { x: 0, y: spriteHeight / 2 },
    secondTile: { x: spriteWidth, y: spriteHeight / 2 }
  },
  [_constants_keyboard__WEBPACK_IMPORTED_MODULE_0__.d_l]: {
    firstTile: { x: spriteWidth, y: spriteHeight - 3 },
    secondTile: { x: spriteWidth, y: spriteHeight / 2 + 3 }
  },
  [_constants_keyboard__WEBPACK_IMPORTED_MODULE_0__.s_l]: {
    firstTile: { x: 0, y: spriteHeight },
    secondTile: { x: spriteWidth, y: spriteHeight }
  }
};

const animationTimings = {
  [_constants_keyboard__WEBPACK_IMPORTED_MODULE_0__.a_l]: {
    framesCount: 3,
    [0]: {
      sx: 438,
      sy: 55,
      sWidth: spriteWidth,
      sHeight: spriteHeight,
      frameDuration: 90
    },
    [1]: {
      sx: 486,
      sy: 55,
      sWidth: spriteWidth,
      sHeight: spriteHeight,
      frameDuration: 90
    },
    [2]: {
      sx: 534,
      sy: 55,
      sWidth: spriteWidth,
      sHeight: spriteHeight,
      frameDuration: 90
    }
  },
  
  [_constants_keyboard__WEBPACK_IMPORTED_MODULE_0__.w_l]: {
    framesCount: 3,
    [0]: {
      sx: 438,
      sy: 150,
      sWidth: spriteWidth,
      sHeight: spriteHeight,
      frameDuration: 90
    },
    [1]: {
      sx: 486,
      sy: 150,
      sWidth: spriteWidth,
      sHeight: spriteHeight,
      frameDuration: 90
    },
    [2]: {
      sx: 534,
      sy: 150,
      sWidth: spriteWidth,
      sHeight: spriteHeight,
      frameDuration: 90
    }
  },

  [_constants_keyboard__WEBPACK_IMPORTED_MODULE_0__.d_l]: {
    framesCount: 3,
    [0]: {
      sx: 438,
      sy: 102,
      sWidth: spriteWidth,
      sHeight: spriteHeight,
      frameDuration: 90
    },
    [1]: {
      sx: 486,
      sy: 102,
      sWidth: spriteWidth,
      sHeight: spriteHeight,
      frameDuration: 90
    },
    [2]: {
      sx: 534,
      sy: 102,
      sWidth: spriteWidth,
      sHeight: spriteHeight,
      frameDuration: 90
    }
  },

  [_constants_keyboard__WEBPACK_IMPORTED_MODULE_0__.s_l]: {
    framesCount: 3,
    [0]: {
      sx: 438,
      sy: 8,
      sWidth: spriteWidth,
      sHeight: spriteHeight,
      frameDuration: 90
    },

    [1]: {
      sx: 486,
      sy: 8,
      sWidth: spriteWidth,
      sHeight: spriteHeight,
      frameDuration: 90
    },

    [2]: {
      sx: 534,
      sy: 8,
      sWidth: spriteWidth,
      sHeight: spriteHeight,
      frameDuration: 90
    },
  }
}

/***/ }),

/***/ "./src/resources/objectsTiles/mainCharacterDrawer.js":
/*!***********************************************************!*\
  !*** ./src/resources/objectsTiles/mainCharacterDrawer.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainCharacterDrawer),
/* harmony export */   "mainCharacterDrawer": () => (/* binding */ mainCharacterDrawer)
/* harmony export */ });
/* harmony import */ var _mapImageTile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mapImageTile */ "./src/resources/mapImageTile.js");
/* harmony import */ var _helpers_assetsCacher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/assetsCacher */ "./src/helpers/assetsCacher.js");
/* harmony import */ var _mainCharacterConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mainCharacterConstants */ "./src/resources/objectsTiles/mainCharacterConstants.js");
/* harmony import */ var _constants_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants/keyboard */ "./src/constants/keyboard.js");
/* harmony import */ var _constants_types_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../constants/types.constants */ "./src/constants/types.constants.js");






class MainCharacterDrawer extends _mapImageTile__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor () {
    super('main_character', _constants_types_constants__WEBPACK_IMPORTED_MODULE_4__.image_tile, 'dist/chracterTiles/mainCharacter.png');
    this.currentFrame = {
      direction: _constants_keyboard__WEBPACK_IMPORTED_MODULE_3__.s_l,
      frameNumber: 0,
      frameTime: 0
    }
  }

  getRenderConfiguration () {
    const currentFrameParameters = _mainCharacterConstants__WEBPACK_IMPORTED_MODULE_2__.animationTimings[this.currentFrame.direction][this.currentFrame.frameNumber];

    return [
      _helpers_assetsCacher__WEBPACK_IMPORTED_MODULE_1__.assets_cacher.getAsset(this.getObjectType()),
      currentFrameParameters.sx,
      currentFrameParameters.sy,
      currentFrameParameters.sWidth,
      currentFrameParameters.sHeight,
      this.position.x,
      this.position.y,
      currentFrameParameters.sWidth,
      currentFrameParameters.sHeight,
    ]
  }

  updateFrameParameters (timePassed, currentButton) {
    if (!currentButton) {
      this.currentFrame.frameNumber = 0;
      this.currentFrame.frameTime = 0;

      return;
    }

    if (this.currentFrame.direction !== currentButton) {
      this.resetFrameParameters(currentButton);

      return;
    }

    const parameters = _mainCharacterConstants__WEBPACK_IMPORTED_MODULE_2__.animationTimings[this.currentFrame.direction];

    if (this.currentFrame.frameTime + timePassed >= parameters[this.currentFrame.frameNumber].frameDuration) {
      this.currentFrame.frameNumber = this.currentFrame.frameNumber + 1 === parameters.framesCount ? 0 : this.currentFrame.frameNumber + 1;
      this.currentFrame.frameTime = 0;

      return;
    }

    this.currentFrame.frameTime += timePassed;
  }

  resetFrameParameters (currentButton) {
    this.currentFrame.direction = currentButton;
    this.currentFrame.frameNumber = 0;
    this.currentFrame.frameTime = 0
  }
  
}

const mainCharacterDrawer = new MainCharacterDrawer();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/main */ "./src/main.js");
/* harmony import */ var _src_mechanics_keyBoardReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/mechanics/keyBoardReader */ "./src/mechanics/keyBoardReader.js");



Array.prototype.remove = function (item) {
  const index = this.indexOf(item);
  if (index > -1) {
    this.splice(index, 1);
  }
}

const canvas = document.createElement('canvas');
canvas.width  = 500;
canvas.height = 500;
canvas.style.border = "1px solid black";

document.body.appendChild(canvas);

_src_mechanics_keyBoardReader__WEBPACK_IMPORTED_MODULE_1__.inputHandler.init();
const game = new _src_main__WEBPACK_IMPORTED_MODULE_0__.default(canvas.getContext('2d'));
game.init();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lLy4vc3JjL2Fzc2V0cy9vYmplY3RzVGlsZXMvYnJpZGdlMi5wbmciLCJ3ZWJwYWNrOi8vZ2FtZS8uL3NyYy9jb25zdGFudHMva2V5Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vZ2FtZS8uL3NyYy9jb25zdGFudHMvdHlwZXMuY29uc3RhbnRzLmpzIiwid2VicGFjazovL2dhbWUvLi9zcmMvY29udHJvbGVycy9NQVBfQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9nYW1lLy4vc3JjL2dhbWVPYmplY3RzL2tleUJvYXJkRHJvd2VyLmpzIiwid2VicGFjazovL2dhbWUvLi9zcmMvZ2FtZU9iamVjdHMvbWFpbkNoYXJhY3Rlci5qcyIsIndlYnBhY2s6Ly9nYW1lLy4vc3JjL2hlbHBlcnMvYXNzZXRzQ2FjaGVyLmpzIiwid2VicGFjazovL2dhbWUvLi9zcmMvaGVscGVycy9jb25maWd1cmF0aW9uUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vZ2FtZS8uL3NyYy9tYWluLmpzIiwid2VicGFjazovL2dhbWUvLi9zcmMvbWVjaGFuaWNzL2tleUJvYXJkUmVhZGVyLmpzIiwid2VicGFjazovL2dhbWUvLi9zcmMvbWVjaGFuaWNzL3JlbmRlcmVyLmpzIiwid2VicGFjazovL2dhbWUvLi9zcmMvcmVzb3VyY2VzL2ltYWdlVGlsZS5qcyIsIndlYnBhY2s6Ly9nYW1lLy4vc3JjL3Jlc291cmNlcy9tYXBJbWFnZVRpbGUuanMiLCJ3ZWJwYWNrOi8vZ2FtZS8uL3NyYy9yZXNvdXJjZXMvbWFwVGlsZXMvYnJpZGdlVGlsZS5qcyIsIndlYnBhY2s6Ly9nYW1lLy4vc3JjL3Jlc291cmNlcy9tYXBUaWxlcy9ncmFzc1RpbGUuanMiLCJ3ZWJwYWNrOi8vZ2FtZS8uL3NyYy9yZXNvdXJjZXMvbWFwVGlsZXMvcml2ZXJUaWxlLmpzIiwid2VicGFjazovL2dhbWUvLi9zcmMvcmVzb3VyY2VzL21hcHMvbGV2ZWwxLmpzIiwid2VicGFjazovL2dhbWUvLi9zcmMvcmVzb3VyY2VzL29iamVjdHNUaWxlcy9tYWluQ2hhcmFjdGVyQ29uc3RhbnRzLmpzIiwid2VicGFjazovL2dhbWUvLi9zcmMvcmVzb3VyY2VzL29iamVjdHNUaWxlcy9tYWluQ2hhcmFjdGVyRHJhd2VyLmpzIiwid2VicGFjazovL2dhbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2dhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2FtZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9nYW1lLy4vaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBZSxxQkFBdUIseUNBQXlDLEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0F4RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQzs7Ozs7Ozs7Ozs7Ozs7QUNMQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQWlEO0FBQ2lCO0FBQ3hCOztBQUVqRDs7QUFFQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlGQUFpRixLQUFLLEVBQUUsT0FBTyxHQUFHOztBQUVsRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QiwrQkFBK0I7QUFDNUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBLElBQUksdUZBQW9D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LEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QjtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGdCQUFnQix3REFBUztBQUN6QixLQUFLO0FBQ0w7QUFDQSxnQkFBZ0Isd0RBQVM7QUFDekIsS0FBSztBQUNMO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCLEtBQUs7QUFDTDtBQUNBLGdCQUFnQix3REFB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X3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiNDg1MWY3NzEwMjZkMDY2NTdhMjJiOGQxMTAzODIwNTQucG5nXCI7IiwiZXhwb3J0IGNvbnN0IGFfbCA9IDY1O1xuZXhwb3J0IGNvbnN0IHdfbCA9IDg3O1xuZXhwb3J0IGNvbnN0IGRfbCA9IDY4O1xuZXhwb3J0IGNvbnN0IHNfbCA9IDgzO1xuXG5leHBvcnQgY29uc3QgYXdkID0gW2FfbCwgd19sLCBkX2wsIHNfbF07IiwiZXhwb3J0IGNvbnN0IGltYWdlX3RpbGUgPSAnaW1hZ2VfdGlsZSc7XG4iLCJpbXBvcnQgeyBhc3NldHNfY2FjaGVyIH0gZnJvbSAnLi4vaGVscGVycy9hc3NldHNDYWNoZXInO1xuaW1wb3J0IHsgY29uZmlndXJhdGlvblByb3ZpZGVyIH0gZnJvbSAnLi4vaGVscGVycy9jb25maWd1cmF0aW9uUHJvdmlkZXInO1xuaW1wb3J0IHsgcmVuZGVyZXIgfSBmcm9tICcuLi9tZWNoYW5pY3MvcmVuZGVyZXInO1xuXG5jb25zdCB0aWxlU2l6ZSA9IDMyO1xuXG5jbGFzcyBNQVBfQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yIChtYXBUaWxlcyA9IHt9LCBtYXBPYmplY3RzID0ge30pIHtcbiAgICB0aGlzLnRpbGVzID0gbWFwVGlsZXM7XG4gICAgdGhpcy5vYmplY3RzID0gbWFwT2JqZWN0cztcblxuICAgIHRoaXMuY3R4ID0gbnVsbDtcbiAgICB0aGlzLmJvcmRlcnNUb0RyYXcgPSBbXTtcbiAgfVxuXG4gIGluaXRDb250ZXh0IChjdHgpIHtcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgfVxuXG4gIHNldFRpbGVzICh0aWxlc0FycmF5KSB7XG4gICAgdGhpcy50aWxlcyA9IHRpbGVzQXJyYXk7IC8vIHNpbXBsaWZpZWQgZm9yIG5vd1xuICB9XG5cbiAgc2V0T2JqZWN0cyAob2JqZWN0c0FycmF5KSB7XG4gICAgdGhpcy5vYmplY3RzID0gb2JqZWN0c0FycmF5O1xuICB9XG5cbiAgZ2V0VGl0bGVEYXRhICh4LCB5KSB7XG4gICAgaWYgKCF0aGlzLnRpbGVzW3hdIHx8ICF0aGlzLnRpbGVzW3hdPy5beV0pIHRocm93IG5ldyBFcnJvciAoYG5vIHN1Y2ggdGlsZSAtIHt4OiAke3h9LCB5OiAke3l9fWApO1xuXG4gICAgcmV0dXJuIHRoaXMudGlsZXNbeF1beV07XG4gIH1cblxuICBnZXRUaWxlRGF0YUJ5Q29vcmRzICh4LCB5KSB7XG4gICAgY29uc3QgdGlsZV9yb3cgPSBNYXRoLnRydW5jKHkgLyB0aWxlU2l6ZSk7XG4gICAgY29uc3QgdGlsZV9jb2wgPSBNYXRoLnRydW5jKHggLyB0aWxlU2l6ZSk7XG4gICAgdGhpcy5ib3JkZXJzVG9EcmF3LnB1c2goeyBjb2w6IHRpbGVfcm93LCByb3c6IHRpbGVfY29sIH0pO1xuICAgIHJldHVybiB0aGlzLnRpbGVzW3RpbGVfcm93XT8uW3RpbGVfY29sXTtcbiAgfVxuXG4gIHByZXBhcmVBc3NldHMgKCkge1xuICAgIGNvbnN0IHVuaXF1ZVRpbGVzID0ge307XG4gICAgZm9yIChsZXQgcm93IGluIHRoaXMudGlsZXMpIHtcbiAgICAgIGZvciAobGV0IGNvbCBpbiB0aGlzLnRpbGVzW3Jvd10pIHtcbiAgICAgICAgdW5pcXVlVGlsZXNbdGhpcy50aWxlc1tyb3ddW2NvbF0udGlsZS5nZXRPYmplY3RUeXBlKCldID0gdGhpcy50aWxlc1tyb3ddW2NvbF0udGlsZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCByb3cgaW4gdGhpcy5vYmplY3RzKSB7XG4gICAgICBmb3IgKGxldCBjb2wgaW4gdGhpcy5vYmplY3RzW3Jvd10pIHtcbiAgICAgICAgdGhpcy5vYmplY3RzW3Jvd11bY29sXS5vYmplY3RzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgdW5pcXVlVGlsZXNbaXRlbS5nZXRPYmplY3RUeXBlKCldID0gaXRlbTtcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhc3NldHNfY2FjaGVyLmRvd25sb2FkQW5kQ2FjaGVBc3NldHModW5pcXVlVGlsZXMpO1xuICB9XG5cbiAgdXBkYXRlICgpIHtcbiAgICB0aGlzLmRyYXdUaWxlcygpO1xuICAgIHRoaXMuZHJhd09iamVjdHMoKTtcblxuXG4gICAgaWYgKGNvbmZpZ3VyYXRpb25Qcm92aWRlci5pc0dyaWRBdmFpbGFibGUoKSkge1xuICAgICAgdGhpcy5kcmF3R3JpZCgpO1xuICAgIH1cblxuICAgIGlmIChjb25maWd1cmF0aW9uUHJvdmlkZXIuaXNHcmlkQXZhaWFsYWJsZSgpKSB7XG4gICAgICB0aGlzLmRyYXdUaWxlc0luZm8oKTtcbiAgICB9XG5cbiAgICB0aGlzLmRyYXdCb3JkZXJzKCk7XG4gIH1cblxuICBkcmF3VGlsZXMgKCkge1xuICAgIGZvciAobGV0IHJvdyBpbiB0aGlzLnRpbGVzKSB7XG4gICAgICBmb3IgKGxldCBjb2wgaW4gdGhpcy50aWxlc1tyb3ddKSB7XG4gICAgICAgIHRoaXMudGlsZXNbcm93XVtjb2xdLnRpbGUuc2V0UG9zaXRpb24oY29sICogdGlsZVNpemUsIHJvdyAqIHRpbGVTaXplKVxuICAgICAgICByZW5kZXJlci5wdXNoVG9NYXBMYXllcnModGhpcy50aWxlc1tyb3ddW2NvbF0udGlsZSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJhd09iamVjdHMgKCkge1xuICAgIGZvciAobGV0IHJvdyBpbiB0aGlzLm9iamVjdHMpIHtcbiAgICAgIGZvciAobGV0IGNvbCBpbiB0aGlzLm9iamVjdHNbcm93XSkge1xuICAgICAgICB0aGlzLm9iamVjdHNbcm93XVtjb2xdLm9iamVjdHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpdGVtLnNldFBvc2l0aW9uKGNvbCAqIHRpbGVTaXplLCByb3cgKiB0aWxlU2l6ZSk7XG4gICAgICAgICAgcmVuZGVyZXIucHVzaFRvT2JqZWN0c0xheWVycyhpdGVtLCAwKVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGRyYXdHcmlkICgpIHtcbiAgICBsZXQgcm93c0Ftb3VudCA9IE9iamVjdC5rZXlzKHRoaXMudGlsZXMpLmxlbmd0aDtcbiAgICBsZXQgY29sc0Ftb3VudCA9IE9iamVjdC5rZXlzKHRoaXMudGlsZXNbJzAnXSkubGVuZ3RoO1xuICAgIC8vIHJvd3NcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSByb3dzQW1vdW50OyBpKyspIHtcbiAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jdHgubW92ZVRvKGkgKiB0aWxlU2l6ZSwgMCk7XG4gICAgICB0aGlzLmN0eC5saW5lVG8oaSAqIHRpbGVTaXplLCByb3dzQW1vdW50ICogdGlsZVNpemUpO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgIFxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGNvbHNBbW91bnQ7IGkrKykge1xuICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgaSAqIHRpbGVTaXplKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyhyb3dzQW1vdW50ICogdGlsZVNpemUsIGkgKiB0aWxlU2l6ZSk7XG4gICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcbiAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgXG4gICAgfVxuXG4gIH1cblxuICBkcmF3Qm9yZGVycyAoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJvcmRlcnNUb0RyYXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jdHgubW92ZVRvKHRoaXMuYm9yZGVyc1RvRHJhd1tpXS5yb3cgKiB0aWxlU2l6ZSwgdGhpcy5ib3JkZXJzVG9EcmF3W2ldLmNvbCAqIHRpbGVTaXplKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLmJvcmRlcnNUb0RyYXdbaV0ucm93ICogdGlsZVNpemUsIHRoaXMuYm9yZGVyc1RvRHJhd1tpXS5jb2wgKiB0aWxlU2l6ZSArIHRpbGVTaXplKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLmJvcmRlcnNUb0RyYXdbaV0ucm93ICogdGlsZVNpemUgKyB0aWxlU2l6ZSwgdGhpcy5ib3JkZXJzVG9EcmF3W2ldLmNvbCAqIHRpbGVTaXplICsgdGlsZVNpemUpO1xuICAgICAgdGhpcy5jdHgubGluZVRvKHRoaXMuYm9yZGVyc1RvRHJhd1tpXS5yb3cgKiB0aWxlU2l6ZSArIHRpbGVTaXplLCB0aGlzLmJvcmRlcnNUb0RyYXdbaV0uY29sICogdGlsZVNpemUpO1xuICAgICAgdGhpcy5jdHgubGluZVRvKHRoaXMuYm9yZGVyc1RvRHJhd1tpXS5yb3cgKiB0aWxlU2l6ZSwgdGhpcy5ib3JkZXJzVG9EcmF3W2ldLmNvbCAqIHRpbGVTaXplKTtcbiAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gJyNGRjU3MzMnO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICBcbiAgICB9XG5cbiAgICB0aGlzLmJvcmRlcnNUb0RyYXcgPSBbXTsgLy9jbGVhciBhcnJheSBmb3IgbmV4dCByZW5kZXI7XG4gIH1cblxuICBkcmF3VGlsZXNJbmZvICgpIHtcbiAgICB0aGlzLmN0eC5mb250ID0gJzEwcHggc2VyaWYgd2hpdGUnO1xuICAgIGZvciAobGV0IHJvdyBpbiB0aGlzLnRpbGVzKSB7XG4gICAgICBmb3IgKGxldCBjb2wgaW4gdGhpcy50aWxlc1tyb3ddKSB7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQoYCR7cm93fS8ke2NvbH1gLCA1ICsgY29sICogdGlsZVNpemUsIDEwICsgcm93ICogdGlsZVNpemUpO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBcbiAgICAvLyB0aGlzLmN0eC5zdHJva2VTdHlsZSA9ICcjZmZmZmYnO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtYXBfY29udHJvbGxlciA9IG5ldyBNQVBfQ29udHJvbGxlcigpOyIsImltcG9ydCB7IElucHV0VXNlciB9IGZyb20gJy4uL21lY2hhbmljcy9rZXlCb2FyZFJlYWRlcic7XG5pbXBvcnQgeyBhX2wsIHdfbCwgZF9sLCBzX2wsIGF3ZCB9IGZyb20gJy4uL2NvbnN0YW50cy9rZXlib2FyZCc7XG5cbmNsYXNzIEtleUJvYXJkRHJhd2VyIGV4dGVuZHMgSW5wdXRVc2VyIHtcbiAgY29uc3RydWN0b3IgKGN0eCkge1xuICAgIHN1cGVyKGF3ZCk7XG4gICAgdGhpcy5jdHggPSBudWxsO1xuICAgIHRoaXMuaW5pdGlhbFBvc2l0aW9uID0ge1xuICAgICAgeDogMjUwLCB5OiAwXG4gICAgfVxuICB9XG5cbiAgaW5pdENvbnRleHQgKGN0eCkge1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICB9XG5cbiAgdXBkYXRlICgpIHtcbiAgICBjb25zdCBwcmVzc2VkQnV0dG9ucyA9IHRoaXMuZ2V0QnV0dG9ucygpO1xuXG4gICAgaWYgKHByZXNzZWRCdXR0b25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIFxuICAgIGlmIChwcmVzc2VkQnV0dG9ucy5pbmNsdWRlcyhhX2wpKSB0aGlzLmRyb3dBcnJvd0xlZnQoKTtcblxuICAgIGlmIChwcmVzc2VkQnV0dG9ucy5pbmNsdWRlcyh3X2wpKSB0aGlzLmRyb3dBcnJvd1RvcCgpO1xuXG4gICAgaWYgKHByZXNzZWRCdXR0b25zLmluY2x1ZGVzKGRfbCkpIHRoaXMuZHJvd0Fycm93UmlnaHQoKTtcblxuICAgIGlmIChwcmVzc2VkQnV0dG9ucy5pbmNsdWRlcyhzX2wpKSB0aGlzLmRyb3dBcnJvd0JvdHRvbSgpO1xuICB9XG5cbiAgX2xpbmVUbyAoeCwgeSkge1xuICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLmluaXRpYWxQb3NpdGlvbi54ICsgeCwgdGhpcy5pbml0aWFsUG9zaXRpb24ueSArIHkpO1xuICB9XG5cbiAgX21vdmVUbyAoeCwgeSkge1xuICAgIHRoaXMuY3R4Lm1vdmVUbyh0aGlzLmluaXRpYWxQb3NpdGlvbi54ICsgeCwgdGhpcy5pbml0aWFsUG9zaXRpb24ueSArIHkpO1xuICB9XG5cbiAgZHJvd0Fycm93TGVmdCAoKSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5fbW92ZVRvKDQwLCA0MCk7XG4gICAgdGhpcy5fbGluZVRvKDUwLCAzMCk7XG4gICAgdGhpcy5fbGluZVRvKDUwLCA1MCk7XG4gICAgdGhpcy5fbGluZVRvKDQwLCA0MCk7XG5cbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcbiAgfVxuXG4gIGRyb3dBcnJvd1RvcCAoKSB7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5fbW92ZVRvKDU1LCAyNyk7XG4gICAgdGhpcy5fbGluZVRvKDc1LCAyNyk7XG4gICAgdGhpcy5fbGluZVRvKDY1LCAxNyk7XG4gICAgdGhpcy5fbGluZVRvKDU1LCAyNyk7XG5cbiAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcbiAgfVxuXG4gIGRyb3dBcnJvd1JpZ2h0ICgpIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLl9tb3ZlVG8oOTAsIDQwKTtcbiAgICB0aGlzLl9saW5lVG8oODAsIDMwKTtcbiAgICB0aGlzLl9saW5lVG8oODAsIDUwKTtcbiAgICB0aGlzLl9saW5lVG8oOTAsIDQwKTtcblxuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xuICB9XG5cbiAgZHJvd0Fycm93Qm90dG9tICgpIHtcbiAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLl9tb3ZlVG8oNTUsIDU3KTtcbiAgICB0aGlzLl9saW5lVG8oNzUsIDU3KTtcbiAgICB0aGlzLl9saW5lVG8oNjUsIDY3KTtcbiAgICB0aGlzLl9saW5lVG8oNTUsIDU3KTtcblxuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xuICB9XG59XG5cblxuZXhwb3J0IGNvbnN0IGtleUJvYXJkRHJhd2VyID0gbmV3IEtleUJvYXJkRHJhd2VyKCk7IiwiaW1wb3J0IHsgSW5wdXRVc2VyIH0gZnJvbSAnLi4vbWVjaGFuaWNzL2tleUJvYXJkUmVhZGVyJztcbmltcG9ydCB7IGFfbCwgd19sLCBkX2wsIHNfbCB9IGZyb20gJy4uL2NvbnN0YW50cy9rZXlib2FyZCc7XG5pbXBvcnQgeyBtYXBfY29udHJvbGxlciB9IGZyb20gJy4uL2NvbnRyb2xlcnMvTUFQX0NvbnRyb2xsZXInO1xuaW1wb3J0IHsgYnV0dG9uVG9EaXJlY3Rpb25NYXBwaW5nLCBsb29rdXBUb05laWJob3VyVGlsZU1vZGlmaWVyLCBzcHJpdGVXaWR0aCwgc3ByaXRlSGVpZ2h0IH0gZnJvbSAnLi4vcmVzb3VyY2VzL29iamVjdHNUaWxlcy9tYWluQ2hhcmFjdGVyQ29uc3RhbnRzJztcbmltcG9ydCB7IG1haW5DaGFyYWN0ZXJEcmF3ZXIgfSBmcm9tICcuLi9yZXNvdXJjZXMvb2JqZWN0c1RpbGVzL21haW5DaGFyYWN0ZXJEcmF3ZXInO1xuaW1wb3J0IHsgYXNzZXRzX2NhY2hlciB9IGZyb20gJy4uL2hlbHBlcnMvYXNzZXRzQ2FjaGVyJztcbmltcG9ydCB7IHJlbmRlcmVyIH0gZnJvbSAnLi4vbWVjaGFuaWNzL3JlbmRlcmVyJztcblxuY29uc3QgbWF4U3BlZWQgPSAxMDA7IC8vIHBpeGVscy9zZWNvbmRcblxuY2xhc3MgTWFpbkNoYXJhY3RlciBleHRlbmRzIElucHV0VXNlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcihbYV9sLCB3X2wsIGRfbCwgc19sXSk7XG4gICAgdGhpcy5jdHggPSBudWxsO1xuXG4gICAgdGhpcy5wb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9O1xuICAgIHRoaXMuYnV0dG9uUHJlc3NlZFRpbWluZ3MgPSB7IGE6IDAsIHc6IDAsIGQ6IDAgfTtcblxuICAgIHRoaXMuc3BlZWQgPSAwO1xuICAgIHRoaXMuYWNjZWxlcmF0aW9uX3ggPSAwO1xuICAgIHRoaXMuYWNjZWxlcmF0aW9uX3kgPSAwO1xuXG4gICAgdGhpcy5sb29rRGlyZWN0aW9uID0gbnVsbDtcbiAgfVxuXG4gIGluaXRDb250ZXh0IChjdHgpIHtcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgfVxuXG4gIHVwZGF0ZSAodGltZVBhc3NlZCkge1xuICAgIGNvbnN0IHByZXNzZWRCdXR0b25zID0gdGhpcy5nZXRCdXR0b25zKCk7XG5cbiAgICB0aGlzLl91cGRhdGVTcGVlZChwcmVzc2VkQnV0dG9ucyk7XG5cbiAgICBpZiAocHJlc3NlZEJ1dHRvbnMubGVuZ3RoKSB0aGlzLnVwZGF0ZUxvb2tEaXJlY3Rpb24ocHJlc3NlZEJ1dHRvbnMpO1xuICAgIFxuICAgIGlmIChwcmVzc2VkQnV0dG9ucy5sZW5ndGgpIHRoaXMuX3VwZGF0ZUNvb3JkaW5hdGVzKHRpbWVQYXNzZWQpO1xuICAgIFxuICAgIHRoaXMuX2RyYXdQYXJhbXMoKTtcbiAgICB0aGlzLmRyYXdDaGFyYWN0ZXIodGltZVBhc3NlZCk7XG4gICAgaWYgKHRydWUpIHRoaXMuZHJhd0NoYXJhY3RlckJvcmRlcigpO1xuICB9XG5cbiAgdXBkYXRlTG9va0RpcmVjdGlvbiAocHJlc3NlZEJ1dHRvbnMpIHtcbiAgICB0aGlzLmxvb2tEaXJlY3Rpb24gPSBwcmVzc2VkQnV0dG9uc1twcmVzc2VkQnV0dG9ucy5sZW5ndGggLSAxXTtcbiAgfVxuXG4gIF9kcmF3UGFyYW1zICgpIHtcbiAgICB0aGlzLmN0eC5mb250ID0gJzEwcHggc2VyaWYnO1xuICAgIHRoaXMuY3R4LmZpbGxUZXh0KGBzcGVlZDogJHt0aGlzLnNwZWVkfWAsIDQwMCwgMjApO1xuICAgIHRoaXMuY3R4LmZpbGxUZXh0KGBkX2J1dHRvbiBwcmVzc2VkOiAke3RoaXMuYnV0dG9uUHJlc3NlZFRpbWluZ3MuZH1gLCA0MDAsIDMwKTtcbiAgICB0aGlzLmN0eC5maWxsVGV4dChgYWNjZWxlcmF0aW9uOiAke3RoaXMuYWNjZWxlcmF0aW9uX3h9YCwgNDAwLCA0MCk7XG4gIH1cblxuICBfdXBkYXRlU3BlZWQgKHByZXNzZWRCdXR0b25zKSB7XG4gICAgdGhpcy5zcGVlZCA9IHByZXNzZWRCdXR0b25zLmxlbmd0aCA/IG1heFNwZWVkIDogMDsgXG4gIH1cblxuICBfdXBkYXRlQ29vcmRpbmF0ZXMgKHRpbWVQYXNzZWQpIHtcbiAgICBjb25zdCBuZXdQb3NpdGlvbk9iamVjdCA9IHRoaXMuX2dldENvb3Jkc09mTmV4dFBvc2l0aW9uKHRpbWVQYXNzZWQpO1xuICAgIGNvbnN0IG5leHRUaWxlVG9HbyA9IHRoaXMuZ2V0TmV4dFRpbGVzKG5ld1Bvc2l0aW9uT2JqZWN0LngsIG5ld1Bvc2l0aW9uT2JqZWN0LnkpO1xuICAgIGlmIChuZXh0VGlsZVRvR29bMF0/LnRpbGUuaXNUaWxlUGFzc2FibGUoKSAmJiBuZXh0VGlsZVRvR29bMV0/LnRpbGUuaXNUaWxlUGFzc2FibGUoKSkge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gbmV3UG9zaXRpb25PYmplY3Q7XG4gICAgICB9XG4gIH1cblxuICBfZ2V0Q29vcmRzT2ZOZXh0UG9zaXRpb24gKHRpbWVQYXNzZWQpIHtcbiAgICBjb25zdCBheGlzUGFyYW1ldGVycyA9IGJ1dHRvblRvRGlyZWN0aW9uTWFwcGluZ1t0aGlzLmxvb2tEaXJlY3Rpb25dO1xuICAgIGNvbnN0IHBpeGVsc1RvR28gPSB0aGlzLnNwZWVkICogKHRpbWVQYXNzZWQgLyAxMDAwKSAqIGF4aXNQYXJhbWV0ZXJzLm11bHRpcGxpZXI7XG4gICAgY29uc3QgcG9zaXRpb25PYmplY3QgPSB7XG4gICAgICB4OiB0aGlzLnBvc2l0aW9uLngsXG4gICAgICB5OiB0aGlzLnBvc2l0aW9uLnlcbiAgICB9O1xuXG4gICAgcG9zaXRpb25PYmplY3RbYXhpc1BhcmFtZXRlcnMudmFsdWVdICs9IHBpeGVsc1RvR287XG4gICAgcmV0dXJuIHBvc2l0aW9uT2JqZWN0O1xuICB9XG5cbiAgZHJhd0NoYXJhY3RlciAodGltZVBhc3NlZCkge1xuICAgIGNvbnN0IHByZXNzZWRCdXR0b25zID0gdGhpcy5nZXRCdXR0b25zKCk7XG4gICAgY29uc3QgY3VycmVudEJ1dHRvbiA9IHByZXNzZWRCdXR0b25zW3ByZXNzZWRCdXR0b25zLmxlbmd0aCAtIDFdO1xuXG4gICAgbWFpbkNoYXJhY3RlckRyYXdlci5zZXRQb3NpdGlvbih0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgbWFpbkNoYXJhY3RlckRyYXdlci51cGRhdGVGcmFtZVBhcmFtZXRlcnModGltZVBhc3NlZCwgY3VycmVudEJ1dHRvbik7XG4gICAgcmVuZGVyZXIucHVzaFRvT2JqZWN0c0xheWVycyhtYWluQ2hhcmFjdGVyRHJhd2VyLCAwKTtcbiAgfVxuXG4gIGdldE5leHRUaWxlcyAoeCwgeSkge1xuICAgIGNvbnN0IG11bHRpcGxpZXJzID0gbG9va3VwVG9OZWliaG91clRpbGVNb2RpZmllclt0aGlzLmxvb2tEaXJlY3Rpb25dO1xuICAgIHJldHVybiBbXG4gICAgICBtYXBfY29udHJvbGxlci5nZXRUaWxlRGF0YUJ5Q29vcmRzKHggKyBtdWx0aXBsaWVycy5maXJzdFRpbGUueCwgeSArIG11bHRpcGxpZXJzLmZpcnN0VGlsZS55KSxcbiAgICAgIG1hcF9jb250cm9sbGVyLmdldFRpbGVEYXRhQnlDb29yZHMoeCArIG11bHRpcGxpZXJzLnNlY29uZFRpbGUueCwgeSArIG11bHRpcGxpZXJzLnNlY29uZFRpbGUueSlcbiAgICBdO1xuICB9XG5cbiAgcHJlcGFyZVRpbGVzICgpIHtcbiAgICBhc3NldHNfY2FjaGVyLmRvd25sb2FkQW5kQ2FjaGVBc3NldHMoe1ttYWluQ2hhcmFjdGVyRHJhd2VyLmdldE9iamVjdFR5cGUoKV06IG1haW5DaGFyYWN0ZXJEcmF3ZXJ9KTtcbiAgfVxuXG4gIGRyYXdDaGFyYWN0ZXJCb3JkZXIgKCkge1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4Lm1vdmVUbyh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgdGhpcy5jdHgubGluZVRvKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55ICsgc3ByaXRlSGVpZ2h0KTtcbiAgICB0aGlzLmN0eC5saW5lVG8odGhpcy5wb3NpdGlvbi54ICsgc3ByaXRlV2lkdGgsIHRoaXMucG9zaXRpb24ueSArIHNwcml0ZUhlaWdodCk7XG4gICAgdGhpcy5jdHgubGluZVRvKHRoaXMucG9zaXRpb24ueCArIHNwcml0ZVdpZHRoLCB0aGlzLnBvc2l0aW9uLnkpO1xuICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSk7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSAnI0ZGRkIzMyc7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1haW5DaGFyYWN0ZXIgPSBuZXcgTWFpbkNoYXJhY3RlcigpOyIsImNsYXNzIEFzc2V0c0NhY2hlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmNhY2hlZFNwcml0ZXMgPSB7fTtcbiAgfVxuXG4gIGdldEFzc2V0IChhc3NldFR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5jYWNoZWRTcHJpdGVzW2Fzc2V0VHlwZV07XG4gIH1cblxuICBkb3dubG9hZEFuZENhY2hlQXNzZXRzIChhc3NldHNPYmplY3QpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gYXNzZXRzT2JqZWN0KSB7XG4gICAgICBpZiAodGhpcy5jYWNoZWRTcHJpdGVzW2tleV0pIGNvbnRpbnVlO1xuICAgICAgdGhpcy5jYWNoZWRTcHJpdGVzW2tleV0gPSBuZXcgSW1hZ2UoKTsgLy90ZW1wb3Jhcnkgc29sdXRpb25cbiAgICAgIGFzc2V0c09iamVjdFtrZXldLmRvd25sb2FkKClcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgdGhpcy5jYWNoZWRTcHJpdGVzW2tleV0gPSBkYXRhO1xuICAgICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYXNzZXRzX2NhY2hlciA9IG5ldyBBc3NldHNDYWNoZXIoKTsiLCJjbGFzcyBDb25maWd1cmF0aW9uUHJvdmlkZXIge1xuXG4gIGlzR3JpZEF2YWlsYWJsZSAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0dyaWRBdmFpYWxhYmxlICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBjb25maWd1cmF0aW9uUHJvdmlkZXIgPSBuZXcgQ29uZmlndXJhdGlvblByb3ZpZGVyKCk7IiwiaW1wb3J0IHsgbWFwX2NvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xlcnMvTUFQX0NvbnRyb2xsZXInO1xuaW1wb3J0IHsga2V5Qm9hcmREcmF3ZXIgfSBmcm9tICcuL2dhbWVPYmplY3RzL2tleUJvYXJkRHJvd2VyJztcbmltcG9ydCB7IG1haW5DaGFyYWN0ZXIgfSBmcm9tICcuL2dhbWVPYmplY3RzL21haW5DaGFyYWN0ZXInO1xuaW1wb3J0IHsgcmVuZGVyZXIgfSBmcm9tICcuL21lY2hhbmljcy9yZW5kZXJlcic7XG5pbXBvcnQgeyBsZXZlbF8xX3RpbGVzLCBsZXZlbF8xX29iamVjdHMgfSBmcm9tICcuL3Jlc291cmNlcy9tYXBzL2xldmVsMSc7XG5cbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjb250ZXh0O1xuXG4gICAgICAgIHRoaXMuaW5pdEdhbWVPYmplY3RzKCk7XG4gICAgfVxuXG4gICAgaW5pdEdhbWVPYmplY3RzKCkge1xuICAgICAgICByZW5kZXJlci5pbml0aWFsaXplKHRoaXMuY3R4KTtcbiAgICAgICAga2V5Qm9hcmREcmF3ZXIuaW5pdENvbnRleHQodGhpcy5jdHgpO1xuICAgICAgICBtYWluQ2hhcmFjdGVyLmluaXRDb250ZXh0KHRoaXMuY3R4KTtcbiAgICAgICAgbWFpbkNoYXJhY3Rlci5wcmVwYXJlVGlsZXMoKTtcbiAgICAgICAgbWFwX2NvbnRyb2xsZXIuaW5pdENvbnRleHQodGhpcy5jdHgpO1xuICAgICAgICBtYXBfY29udHJvbGxlci5zZXRUaWxlcyhsZXZlbF8xX3RpbGVzKTtcbiAgICAgICAgbWFwX2NvbnRyb2xsZXIuc2V0T2JqZWN0cyhsZXZlbF8xX29iamVjdHMpO1xuICAgICAgICBtYXBfY29udHJvbGxlci5wcmVwYXJlQXNzZXRzKCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgbGV0IHRpbWUgPSAwO1xuICAgICAgICBsZXQgcHJldlRpbWVTdGVtcCA9IDA7XG4gICAgICAgIGNvbnN0IGRyYXcgPSAodGltZXN0YW1wKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRpbWUpIHRpbWUgPSB0aW1lc3RhbXA7XG5cbiAgICAgICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCA1MDAsIDUwMCk7XG4gICAgICAgICAgICBjb25zdCB0aW1lUGFzc2VkID0gdGltZXN0YW1wIC0gdGltZTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVTdGVwRGlmZiA9IHRpbWVzdGFtcCAtIHByZXZUaW1lU3RlbXA7XG4gICAgICAgICAgICBtYXBfY29udHJvbGxlci51cGRhdGUodGltZVN0ZXBEaWZmKTtcbiAgICAgICAgICAgIG1haW5DaGFyYWN0ZXIudXBkYXRlKHRpbWVTdGVwRGlmZik7XG5cbiAgICAgICAgICAgIHJlbmRlcmVyLmRyYXcoKTtcblxuICAgICAgICAgICAgaWYgKHRpbWVQYXNzZWQgPiAxMDAwKSB7XG4gICAgICAgICAgICAgICAgdGltZSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGtleUJvYXJkRHJhd2VyLnVwZGF0ZSh0aW1lUGFzc2VkKTtcblxuICAgICAgICAgICAgcHJldlRpbWVTdGVtcCA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiY2xhc3MgSW5wdXRIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcHJlc3NlZEtleSA9IFtdO1xuICAgICAgICB0aGlzLl9sYXN0UHJlc3NlZEtleSA9ICcnO1xuICAgIH1cblxuICAgIGdldCBwcmVzc2VkS2V5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJlc3NlZEtleTtcbiAgICB9XG5cbiAgICBnZXQgbGFzdFByZXNzZWRLZXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0UHJlc3NlZEtleTtcbiAgICB9XG5cbiAgICBfYWRkS2V5VG9QcmVzc2VkKGtleUNvZGUpIHtcbiAgICAgICAgdGhpcy5fbGFzdFByZXNzZWRLZXkgPSBrZXlDb2RlO1xuICAgICAgICBpZiAodGhpcy5fcHJlc3NlZEtleS5pbmRleE9mKGtleUNvZGUpID4gLTEpIHJldHVybjtcbiAgICAgICAgdGhpcy5fcHJlc3NlZEtleS5wdXNoKGtleUNvZGUpO1xuICAgIH1cblxuICAgIF9yZW1vdmVLZXlGcm9tUHJlc3NlZChrZXlDb2RlKSB7XG4gICAgICAgIHRoaXMuX3ByZXNzZWRLZXkucmVtb3ZlKGtleUNvZGUpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2FkZEtleVRvUHJlc3NlZChldmVudC5rZXlDb2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUtleUZyb21QcmVzc2VkKGV2ZW50LmtleUNvZGUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IGlucHV0SGFuZGxlciA9IG5ldyBJbnB1dEhhbmRsZXIoKTtcblxuY2xhc3MgSW5wdXRVc2VyIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmFja2VkS2V5cykge1xuICAgICAgICB0aGlzLl90cmFja2VkS2V5cyA9IHRyYWNrZWRLZXlzO1xuICAgIH1cblxuICAgIGdldEJ1dHRvbnMoKSB7XG4gICAgICAgIHJldHVybiBpbnB1dEhhbmRsZXIucHJlc3NlZEtleS5maWx0ZXIoKGl0ZW0pID0+IHRoaXMuX3RyYWNrZWRLZXlzLmluZGV4T2YoaXRlbSkgPiAtMSk7XG4gICAgfVxuXG4gICAgZ2V0TGFzdFByZXNzZWRCdXR0b24oKSB7XG4gICAgICAgIHJldHVybiBpbnB1dEhhbmRsZXIubGFzdFByZXNzZWRLZXk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBpbnB1dEhhbmRsZXIsIElucHV0VXNlciB9O1xuIiwiaW1wb3J0IHsgaW1hZ2VfdGlsZSB9IGZyb20gJy4uL2NvbnN0YW50cy90eXBlcy5jb25zdGFudHMnO1xuXG5jbGFzcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXllcnMgPSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kTGF5ZXJzOiB7IDA6IFtdIH0sXG4gICAgICAgICAgICBtYXBMYXllcnM6IHsgMDogW10gfSxcbiAgICAgICAgICAgIG9iamVjdHNMYXllcnM6IHsgMDogW10gfSxcbiAgICAgICAgICAgIGludGVyZmFjZUxheWVyczogeyAwOiBbXSB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMudHlwZVRvRHJhd2luZ0Z1bmN0aW9uTWFwcGluZyA9IHt9O1xuICAgIH1cblxuICAgIGluaXRpYWxpemUoY3R4KSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIH1cblxuICAgIHB1c2hUb0JhY2tncm91bmRMYXllcnMob2JqLCBsYXllcikge1xuICAgICAgICBpZiAobGF5ZXIgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKCdSZW5kZXJlcjogbGF5ZXIgaXMgbm90IHNwZWNpZmllZCcpO1xuICAgICAgICBpZiAoIXRoaXMubGF5ZXJzLmJhY2tncm91bmRMYXllcnNbbGF5ZXJdKSB7XG4gICAgICAgICAgICB0aGlzLmxheWVycy5iYWNrZ3JvdW5kTGF5ZXJzW2xheWVyXSA9IFtvYmpdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYXllcnMuYmFja2dyb3VuZExheWVyc1tsYXllcl0ucHVzaChvYmopO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVzaFRvTWFwTGF5ZXJzKG9iaiwgbGF5ZXIpIHtcbiAgICAgICAgaWYgKGxheWVyID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignUmVuZGVyZXI6IGxheWVyIGlzIG5vdCBzcGVjaWZpZWQnKTtcbiAgICAgICAgaWYgKCF0aGlzLmxheWVycy5tYXBMYXllcnNbbGF5ZXJdKSB7XG4gICAgICAgICAgICB0aGlzLmxheWVycy5tYXBMYXllcnNbbGF5ZXJdID0gW29ial07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxheWVycy5tYXBMYXllcnNbbGF5ZXJdLnB1c2gob2JqKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1c2hUb09iamVjdHNMYXllcnMob2JqLCBsYXllcikge1xuICAgICAgICBpZiAobGF5ZXIgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKCdSZW5kZXJlcjogbGF5ZXIgaXMgbm90IHNwZWNpZmllZCcpO1xuICAgICAgICBpZiAoIXRoaXMubGF5ZXJzLm9iamVjdHNMYXllcnNbbGF5ZXJdKSB7XG4gICAgICAgICAgICB0aGlzLmxheWVycy5vYmplY3RzTGF5ZXJzW2xheWVyXSA9IFtvYmpdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYXllcnMub2JqZWN0c0xheWVyc1tsYXllcl0ucHVzaChvYmopO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5kcmF3QmFja2dyb3VuZExheWVycygpO1xuICAgICAgICB0aGlzLmRyYXdNYXBMYXllcnMoKTtcbiAgICAgICAgdGhpcy5kcmF3T2JqZWN0c0xheWVycygpO1xuICAgICAgICB0aGlzLmRyYXdpbnRlcmZhY2VMYXllcnMoKTtcblxuICAgICAgICB0aGlzLnJlc2V0TGF5ZXJzT2JqZWN0KCk7XG4gICAgfVxuXG4gICAgZHJhd0JhY2tncm91bmRMYXllcnMoKSB7XG4gICAgICAgIGZvciAobGV0IGxheWVySW5kZXggaW4gdGhpcy5sYXllcnMuYmFja2dyb3VuZExheWVycykge1xuICAgICAgICAgICAgY29uc3QgdGlsZXMgPSB0aGlzLmxheWVycy5iYWNrZ3JvdW5kTGF5ZXJzW2xheWVySW5kZXhdO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxheWVycy5iYWNrZ3JvdW5kTGF5ZXJzW2xheWVySW5kZXhdLmxlbmd0aCkgY29udGludWU7XG5cbiAgICAgICAgICAgIHRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gdGlsZS5nZXRUeXBlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCF0eXBlKSB0aHJvdyBuZXcgRXJyb3IoJ1JlbmRlcmVyOiBtaXNzaW5nIG9yIHVua25vd24gdHlwZScpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyQ29uZmlndXJhdGlvbiA9IHRpbGUuZ2V0UmVuZGVyQ29uZmlndXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQnlUeXBlKHR5cGUsIHJlbmRlckNvbmZpZ3VyYXRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3TWFwTGF5ZXJzKCkge1xuICAgICAgICBmb3IgKGxldCBsYXllckluZGV4IGluIHRoaXMubGF5ZXJzLm1hcExheWVycykge1xuICAgICAgICAgICAgY29uc3QgdGlsZXMgPSB0aGlzLmxheWVycy5tYXBMYXllcnNbbGF5ZXJJbmRleF07XG4gICAgICAgICAgICBpZiAoIXRoaXMubGF5ZXJzLm1hcExheWVyc1tsYXllckluZGV4XS5sZW5ndGgpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB0aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHRpbGUuZ2V0VHlwZSgpO1xuICAgICAgICAgICAgICAgIGlmICghdHlwZSkgdGhyb3cgbmV3IEVycm9yKCdSZW5kZXJlcjogbWlzc2luZyBvciB1bmtub3duIHR5cGUnKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbmRlckNvbmZpZ3VyYXRpb24gPSB0aWxlLmdldFJlbmRlckNvbmZpZ3VyYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckJ5VHlwZSh0eXBlLCByZW5kZXJDb25maWd1cmF0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd09iamVjdHNMYXllcnMoKSB7XG4gICAgICAgIGZvciAobGV0IGxheWVySW5kZXggaW4gdGhpcy5sYXllcnMub2JqZWN0c0xheWVycykge1xuICAgICAgICAgICAgY29uc3QgdGlsZXMgPSB0aGlzLmxheWVycy5vYmplY3RzTGF5ZXJzW2xheWVySW5kZXhdO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxheWVycy5vYmplY3RzTGF5ZXJzW2xheWVySW5kZXhdLmxlbmd0aCkgY29udGludWU7XG5cbiAgICAgICAgICAgIHRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gdGlsZS5nZXRUeXBlKCk7XG4gICAgICAgICAgICAgICAgaWYgKCF0eXBlKSB0aHJvdyBuZXcgRXJyb3IoJ1JlbmRlcmVyOiBtaXNzaW5nIG9yIHVua25vd24gdHlwZScpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyQ29uZmlndXJhdGlvbiA9IHRpbGUuZ2V0UmVuZGVyQ29uZmlndXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQnlUeXBlKHR5cGUsIHJlbmRlckNvbmZpZ3VyYXRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3aW50ZXJmYWNlTGF5ZXJzKCkge1xuICAgICAgICBmb3IgKGxldCBsYXllckluZGV4IGluIHRoaXMubGF5ZXJzLmludGVyZmFjZUxheWVycykge1xuICAgICAgICAgICAgY29uc3QgdGlsZXMgPSB0aGlzLmxheWVycy5pbnRlcmZhY2VMYXllcnNbbGF5ZXJJbmRleF07XG4gICAgICAgICAgICBpZiAoIXRoaXMubGF5ZXJzLmludGVyZmFjZUxheWVyc1tsYXllckluZGV4XS5sZW5ndGgpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB0aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHRpbGUuZ2V0VHlwZSgpO1xuICAgICAgICAgICAgICAgIGlmICghdHlwZSkgdGhyb3cgbmV3IEVycm9yKCdSZW5kZXJlcjogbWlzc2luZyBvciB1bmtub3duIHR5cGUnKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbmRlckNvbmZpZ3VyYXRpb24gPSB0aWxlLmdldFJlbmRlckNvbmZpZ3VyYXRpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckJ5VHlwZSh0eXBlLCByZW5kZXJDb25maWd1cmF0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyQnlUeXBlKHR5cGUsIHJlbmRlckNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgaWYgKHR5cGUgPT09IGltYWdlX3RpbGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVySW1hZ2VTcHJpdGUocmVuZGVyQ29uZmlndXJhdGlvbik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJJbWFnZVNwcml0ZShyZW5kZXJDb25maWd1cmF0aW9uID0gW10pIHtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKC4uLnJlbmRlckNvbmZpZ3VyYXRpb24pO1xuICAgIH1cblxuICAgIHJlc2V0TGF5ZXJzT2JqZWN0KCkge1xuICAgICAgICB0aGlzLmxheWVycyA9IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRMYXllcnM6IHsgMDogW10gfSxcbiAgICAgICAgICAgIG1hcExheWVyczogeyAwOiBbXSB9LFxuICAgICAgICAgICAgb2JqZWN0c0xheWVyczogeyAwOiBbXSB9LFxuICAgICAgICAgICAgaW50ZXJmYWNlTGF5ZXJzOiB7IDA6IFtdIH0sXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlVGlsZSB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgYXNzZXRVcmwpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5hc3NldFVybCA9IGFzc2V0VXJsO1xuICAgIH1cblxuICAgIGdldFR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XG4gICAgfVxuXG4gICAgZG93bmxvYWQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpbWcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpbWcuc3JjID0gdGhpcy5hc3NldFVybDtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEltYWdlVGlsZSBmcm9tICcuL2ltYWdlVGlsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcEltYWdlVGlsZSBleHRlbmRzIEltYWdlVGlsZSB7XG4gICAgY29uc3RydWN0b3Iob2JqZWN0VHlwZSwgLi4ucHJvcHMpIHtcbiAgICAgICAgc3VwZXIoLi4ucHJvcHMpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5vYmplY3RUeXBlID0gb2JqZWN0VHlwZTtcbiAgICB9XG5cbiAgICBnZXRPYmplY3RUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RUeXBlO1xuICAgIH1cblxuICAgIHNldFBvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi54ID0geDtcbiAgICAgICAgdGhpcy5wb3NpdGlvbi55ID0geTtcbiAgICB9XG5cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4udGhpcy5wb3NpdGlvbiB9O1xuICAgIH1cbn1cbiIsImltcG9ydCBNYXBJbWFnZVRpbGUgZnJvbSAnLi4vbWFwSW1hZ2VUaWxlJztcbmltcG9ydCB7IGFzc2V0c19jYWNoZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2Fzc2V0c0NhY2hlcic7XG5pbXBvcnQgeyBpbWFnZV90aWxlIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzLmNvbnN0YW50cyc7XG5pbXBvcnQgZiBmcm9tICcuLi8uLi9hc3NldHMvb2JqZWN0c1RpbGVzL2JyaWRnZTIucG5nJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcmlkZ2VUaWxlIGV4dGVuZHMgTWFwSW1hZ2VUaWxlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCdicmlkZ2UnLCBpbWFnZV90aWxlLCBmKTtcbiAgICB0aGlzLnRpbGVTZXR0aW5ncyA9IHtcbiAgICAgIHN4OiAwLFxuICAgICAgc3k6IDAsXG4gICAgICBzV2lkdGg6IDQ3LFxuICAgICAgc0hlaWdodDogNTlcbiAgICB9XG4gIH1cblxuICBnZXRSZW5kZXJDb25maWd1cmF0aW9uICgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgYXNzZXRzX2NhY2hlci5nZXRBc3NldCh0aGlzLmdldE9iamVjdFR5cGUoKSksXG4gICAgICB0aGlzLnRpbGVTZXR0aW5ncy5zeCxcbiAgICAgIHRoaXMudGlsZVNldHRpbmdzLnN5LFxuICAgICAgdGhpcy50aWxlU2V0dGluZ3Muc1dpZHRoLFxuICAgICAgdGhpcy50aWxlU2V0dGluZ3Muc0hlaWdodCxcbiAgICAgIHRoaXMucG9zaXRpb24ueCAtIDUsXG4gICAgICB0aGlzLnBvc2l0aW9uLnkgLSAxMCxcbiAgICAgIHRoaXMudGlsZVNldHRpbmdzLnNXaWR0aCxcbiAgICAgIHRoaXMudGlsZVNldHRpbmdzLnNIZWlnaHRcbiAgICBdO1xuICB9XG5cbiAgcG9zaXRpb25Nb2RpZmllciAoY2hhcl94MCwgY2hhcl94MSwgY2hhcl95MCwgY2hhcl95MSkge1xuICAgIGNvbnNvbGUubG9nKClcbiAgfVxufSIsImltcG9ydCBNYXBJbWFnZVRpbGUgZnJvbSAnLi4vbWFwSW1hZ2VUaWxlJztcbmltcG9ydCB7IGFzc2V0c19jYWNoZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2Fzc2V0c0NhY2hlcic7XG5pbXBvcnQgeyBpbWFnZV90aWxlIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzLmNvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXNzVGlsZSBleHRlbmRzIE1hcEltYWdlVGlsZSB7XG4gIGNvbnN0cnVjdG9yIChwYXNzYWJsZSA9IHRydWUpIHtcbiAgICBzdXBlcignZ3Jhc3MnLCBpbWFnZV90aWxlLCAnZGlzdC9tYXBUaWxlcy90cmVlcy1hbmQtYnVzaGVzLnBuZycpO1xuICAgIHRoaXMudGlsZVNldHRpbmdzID0ge1xuICAgICAgc3g6IDAsXG4gICAgICBzeTogMCxcbiAgICAgIHNXaWR0aDogMzIsXG4gICAgICBzSGVpZ2h0OiAzMlxuICAgIH07XG4gICAgdGhpcy5wYXNzYWJsZSA9IHBhc3NhYmxlO1xuICB9XG5cbiAgZ2V0UmVuZGVyQ29uZmlndXJhdGlvbiAoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIGFzc2V0c19jYWNoZXIuZ2V0QXNzZXQodGhpcy5nZXRPYmplY3RUeXBlKCkpLFxuICAgICAgdGhpcy50aWxlU2V0dGluZ3Muc3gsXG4gICAgICB0aGlzLnRpbGVTZXR0aW5ncy5zeSxcbiAgICAgIHRoaXMudGlsZVNldHRpbmdzLnNXaWR0aCxcbiAgICAgIHRoaXMudGlsZVNldHRpbmdzLnNIZWlnaHQsXG4gICAgICB0aGlzLnBvc2l0aW9uLngsXG4gICAgICB0aGlzLnBvc2l0aW9uLnksXG4gICAgICB0aGlzLnRpbGVTZXR0aW5ncy5zV2lkdGgsXG4gICAgICB0aGlzLnRpbGVTZXR0aW5ncy5zSGVpZ2h0LFxuICAgIF1cbiAgfVxuXG4gIGlzVGlsZVBhc3NhYmxlICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXNzYWJsZTtcbiAgfVxufSIsImltcG9ydCBNYXBJbWFnZVRpbGUgZnJvbSAnLi4vbWFwSW1hZ2VUaWxlJztcbmltcG9ydCB7IGFzc2V0c19jYWNoZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2Fzc2V0c0NhY2hlcic7XG5pbXBvcnQgeyBpbWFnZV90aWxlIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzLmNvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhdGVyVGlsZSBleHRlbmRzIE1hcEltYWdlVGlsZSB7XG4gIGNvbnN0cnVjdG9yIChwYXNzYWJsZSA9IGZhbHNlKSB7XG4gICAgc3VwZXIoJ3dhdGVyJywgaW1hZ2VfdGlsZSwgJ2Rpc3QvbWFwVGlsZXMvd2F0ZXIucG5nJyk7XG5cbiAgICB0aGlzLnBhc3NhYmxlID0gcGFzc2FibGU7XG4gICAgdGhpcy50aWxlU2V0dGluZ3MgPSB7XG4gICAgICBzeDogMCxcbiAgICAgIHN5OiAwLFxuICAgICAgc1dpZHRoOiAzMixcbiAgICAgIHNIZWlnaHQ6IDMyXG4gICAgfTtcbiAgfVxuXG4gIGdldFJlbmRlckNvbmZpZ3VyYXRpb24gKCkge1xuICAgIHJldHVybiBbXG4gICAgICBhc3NldHNfY2FjaGVyLmdldEFzc2V0KHRoaXMuZ2V0T2JqZWN0VHlwZSgpKSxcbiAgICAgIHRoaXMucG9zaXRpb24ueCxcbiAgICAgIHRoaXMucG9zaXRpb24ueVxuICAgIF1cbiAgfVxuXG4gIGlzVGlsZVBhc3NhYmxlICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXNzYWJsZTtcbiAgfVxuXG59IiwiaW1wb3J0IEdyYXNzVGlsZSBmcm9tICcuLi9tYXBUaWxlcy9ncmFzc1RpbGUnO1xuaW1wb3J0IFdhdGVyVGlsZSBmcm9tICcuLi9tYXBUaWxlcy9yaXZlclRpbGUnO1xuaW1wb3J0IEJyaWRnZVRpbGUgZnJvbSAnLi4vbWFwVGlsZXMvYnJpZGdlVGlsZSc7XG5cbmV4cG9ydCBjb25zdCBsZXZlbF8xX29iamVjdHMgPSB7XG4gIDc6IHtcbiAgICAzOiB7XG4gICAgICBvYmplY3RzOiBbbmV3IEJyaWRnZVRpbGUoKV1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGxldmVsXzFfdGlsZXMgPSB7XG4gIDA6IHtcbiAgICAwOiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDE6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgMjoge1xuICAgICAgdGlsZTogbmV3IFdhdGVyVGlsZSgpXG4gICAgfSxcbiAgICAzOntcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgNDoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICA1OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDY6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgNzoge1xuICAgICAgdGlsZTogbmV3IFdhdGVyVGlsZSgpXG4gICAgfSxcbiAgICA4OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDk6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgMTA6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gIH0sXG5cbiAgMToge1xuICAgIDA6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgMToge1xuICAgICAgdGlsZTogbmV3IFdhdGVyVGlsZSgpXG4gICAgfSxcbiAgICAyOiB7XG4gICAgICB0aWxlOiBuZXcgV2F0ZXJUaWxlKClcbiAgICB9LFxuICAgIDM6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgNDp7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDU6IHtcbiAgICAgIHRpbGU6IG5ldyBXYXRlclRpbGUoKVxuICAgIH0sXG4gICAgNjoge1xuICAgICAgdGlsZTogbmV3IFdhdGVyVGlsZSgpXG4gICAgfSxcbiAgICA3OiB7XG4gICAgICB0aWxlOiBuZXcgV2F0ZXJUaWxlKClcbiAgICB9LFxuICAgIDg6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgOToge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICAxMDoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgfSxcblxuICAyOiB7XG4gICAgMDp7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDE6IHtcbiAgICAgIHRpbGU6IG5ldyBXYXRlclRpbGUoKVxuICAgIH0sXG4gICAgMjoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICAzOiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDQ6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgNToge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICA2OiB7XG4gICAgICB0aWxlOiBuZXcgV2F0ZXJUaWxlKClcbiAgICB9LFxuICAgIDc6IHtcbiAgICAgIHRpbGU6IG5ldyBXYXRlclRpbGUoKVxuICAgIH0sXG4gICAgODoge1xuICAgICAgdGlsZTogbmV3IFdhdGVyVGlsZSgpXG4gICAgfSxcbiAgICA5OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDEwOiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICB9LFxuXG4gIDM6IHtcbiAgICAwOiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDE6IHtcbiAgICAgIHRpbGU6IG5ldyBXYXRlclRpbGUoKVxuICAgIH0sXG4gICAgMjoge1xuICAgICAgdGlsZTogbmV3IFdhdGVyVGlsZSgpLFxuICAgIH0sXG4gICAgMzoge1xuICAgICAgdGlsZTogbmV3IFdhdGVyVGlsZSgpXG4gICAgfSxcbiAgICA0OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDU6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgNjoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICA3OiB7XG4gICAgICB0aWxlOiBuZXcgV2F0ZXJUaWxlKClcbiAgICB9LFxuICAgIDg6IHtcbiAgICAgIHRpbGU6IG5ldyBXYXRlclRpbGUoKVxuICAgIH0sXG4gICAgOToge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICAxMDoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfVxuICB9LFxuICBcbiAgNDoge1xuICAgIDA6e1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICAxOiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDI6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgMzp7XG4gICAgICB0aWxlOiBuZXcgV2F0ZXJUaWxlKClcbiAgICB9LFxuICAgIDQ6e1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICA1OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDY6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgNzoge1xuICAgICAgdGlsZTogbmV3IFdhdGVyVGlsZSgpXG4gICAgfSxcbiAgICA4OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDk6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgMTA6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gIH0sXG5cbiAgNToge1xuICAgIDA6e1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICAxOiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDI6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgMzp7XG4gICAgICB0aWxlOiBuZXcgV2F0ZXJUaWxlKClcbiAgICB9LFxuICAgIDQ6e1xuICAgICAgdGlsZTogbmV3IFdhdGVyVGlsZSgpXG4gICAgfSxcbiAgICA1OiB7XG4gICAgICB0aWxlOiBuZXcgV2F0ZXJUaWxlKClcbiAgICB9LFxuICAgIDY6IHtcbiAgICAgIHRpbGU6IG5ldyBXYXRlclRpbGUoKVxuICAgIH0sXG4gICAgNzoge1xuICAgICAgdGlsZTogbmV3IFdhdGVyVGlsZSgpIFxuICAgIH0sXG4gICAgODoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICA5OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDEwOiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICB9LFxuXG4gIDY6IHtcbiAgICAwOntcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgMToge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICAyOiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDM6e1xuICAgICAgdGlsZTogbmV3IFdhdGVyVGlsZSgpXG4gICAgfSxcbiAgICA0OntcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgNToge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICA2OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDc6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgODoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICA5OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDEwOiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICB9LFxuXG4gIDc6IHtcbiAgICAwOntcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgMToge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICAyOiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDM6e1xuICAgICAgdGlsZTogbmV3IFdhdGVyVGlsZSh0cnVlKVxuICAgIH0sXG4gICAgNDp7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDU6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgNjoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICA3OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDg6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgOToge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICAxMDoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgfSxcblxuICA4OiB7XG4gICAgMDp7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDE6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgMjoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICAzOntcbiAgICAgIHRpbGU6IG5ldyBXYXRlclRpbGUoKVxuICAgIH0sXG4gICAgNDp7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDU6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgNjoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICA3OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDg6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgOToge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICAxMDoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgfSxcblxuICA5OiB7XG4gICAgMDp7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDE6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgMjoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICAzOntcbiAgICAgIHRpbGU6IG5ldyBXYXRlclRpbGUoKVxuICAgIH0sXG4gICAgNDp7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDU6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgNjoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICA3OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDg6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgOToge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICAxMDoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgfSxcblxuICAxMDoge1xuICAgIDA6e1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICAxOiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDI6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgMzp7XG4gICAgICB0aWxlOiBuZXcgV2F0ZXJUaWxlKClcbiAgICB9LFxuICAgIDQ6e1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICA1OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDY6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgNzoge1xuICAgICAgdGlsZTogbmV3IEdyYXNzVGlsZSgpXG4gICAgfSxcbiAgICA4OiB7XG4gICAgICB0aWxlOiBuZXcgR3Jhc3NUaWxlKClcbiAgICB9LFxuICAgIDk6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gICAgMTA6IHtcbiAgICAgIHRpbGU6IG5ldyBHcmFzc1RpbGUoKVxuICAgIH0sXG4gIH1cbn07IiwiaW1wb3J0IHsgYV9sLCB3X2wsIGRfbCwgc19sIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2tleWJvYXJkJztcblxuZXhwb3J0IGNvbnN0IHJpZ2h0ID0gJ3JpZ2h0JztcbmV4cG9ydCBjb25zdCB0b3AgPSAndG9wJztcbmV4cG9ydCBjb25zdCBsZWZ0ID0gJ2xlZnQnO1xuZXhwb3J0IGNvbnN0IGJvdHRvbSA9ICdib3R0b20nO1xuXG5leHBvcnQgY29uc3Qgc3ByaXRlV2lkdGggPSAzMztcbmV4cG9ydCBjb25zdCBzcHJpdGVIZWlnaHQgPSA0MTtcblxuZXhwb3J0IGNvbnN0IGJ1dHRvblRvRGlyZWN0aW9uTWFwcGluZyA9IHtcbiAgW2FfbF06IHtcbiAgICB2YWx1ZTogJ3gnLFxuICAgIG11bHRpcGxpZXI6IC0xLFxuICAgIGRpcmVjdGlvbjogJ2xlZnQnLFxuICB9LFxuICBbd19sXToge1xuICAgIHZhbHVlOiAneScsXG4gICAgbXVsdGlwbGllcjogLTEsXG4gICAgZGlyZWN0aW9uOiAndG9wJ1xuICB9LFxuICBbZF9sXTogeyAgICBcbiAgICB2YWx1ZTogJ3gnLFxuICAgIG11bHRpcGxpZXI6IDEsXG4gICAgZGlyZWN0aW9uOiAncmlnaHQnXG4gIH0sXG4gIFtzX2xdOiB7XG4gICAgdmFsdWU6ICd5JyxcbiAgICBtdWx0aXBsaWVyOiAxLFxuICAgIGRpcmVjdGlvbjogJ2JvdHRvbSdcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGxvb2t1cFRvTmVpYmhvdXJUaWxlTW9kaWZpZXIgPSB7XG4gIFthX2xdOiB7XG4gICAgZmlyc3RUaWxlOiB7IHg6IDAsIHk6IHNwcml0ZUhlaWdodCAtIDMgfSxcbiAgICBzZWNvbmRUaWxlOiB7IHg6IDAsIHk6IHNwcml0ZUhlaWdodCAvIDIgKyAzIH1cbiAgfSxcbiAgW3dfbF06IHtcbiAgICBmaXJzdFRpbGU6IHsgeDogMCwgeTogc3ByaXRlSGVpZ2h0IC8gMiB9LFxuICAgIHNlY29uZFRpbGU6IHsgeDogc3ByaXRlV2lkdGgsIHk6IHNwcml0ZUhlaWdodCAvIDIgfVxuICB9LFxuICBbZF9sXToge1xuICAgIGZpcnN0VGlsZTogeyB4OiBzcHJpdGVXaWR0aCwgeTogc3ByaXRlSGVpZ2h0IC0gMyB9LFxuICAgIHNlY29uZFRpbGU6IHsgeDogc3ByaXRlV2lkdGgsIHk6IHNwcml0ZUhlaWdodCAvIDIgKyAzIH1cbiAgfSxcbiAgW3NfbF06IHtcbiAgICBmaXJzdFRpbGU6IHsgeDogMCwgeTogc3ByaXRlSGVpZ2h0IH0sXG4gICAgc2Vjb25kVGlsZTogeyB4OiBzcHJpdGVXaWR0aCwgeTogc3ByaXRlSGVpZ2h0IH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGFuaW1hdGlvblRpbWluZ3MgPSB7XG4gIFthX2xdOiB7XG4gICAgZnJhbWVzQ291bnQ6IDMsXG4gICAgWzBdOiB7XG4gICAgICBzeDogNDM4LFxuICAgICAgc3k6IDU1LFxuICAgICAgc1dpZHRoOiBzcHJpdGVXaWR0aCxcbiAgICAgIHNIZWlnaHQ6IHNwcml0ZUhlaWdodCxcbiAgICAgIGZyYW1lRHVyYXRpb246IDkwXG4gICAgfSxcbiAgICBbMV06IHtcbiAgICAgIHN4OiA0ODYsXG4gICAgICBzeTogNTUsXG4gICAgICBzV2lkdGg6IHNwcml0ZVdpZHRoLFxuICAgICAgc0hlaWdodDogc3ByaXRlSGVpZ2h0LFxuICAgICAgZnJhbWVEdXJhdGlvbjogOTBcbiAgICB9LFxuICAgIFsyXToge1xuICAgICAgc3g6IDUzNCxcbiAgICAgIHN5OiA1NSxcbiAgICAgIHNXaWR0aDogc3ByaXRlV2lkdGgsXG4gICAgICBzSGVpZ2h0OiBzcHJpdGVIZWlnaHQsXG4gICAgICBmcmFtZUR1cmF0aW9uOiA5MFxuICAgIH1cbiAgfSxcbiAgXG4gIFt3X2xdOiB7XG4gICAgZnJhbWVzQ291bnQ6IDMsXG4gICAgWzBdOiB7XG4gICAgICBzeDogNDM4LFxuICAgICAgc3k6IDE1MCxcbiAgICAgIHNXaWR0aDogc3ByaXRlV2lkdGgsXG4gICAgICBzSGVpZ2h0OiBzcHJpdGVIZWlnaHQsXG4gICAgICBmcmFtZUR1cmF0aW9uOiA5MFxuICAgIH0sXG4gICAgWzFdOiB7XG4gICAgICBzeDogNDg2LFxuICAgICAgc3k6IDE1MCxcbiAgICAgIHNXaWR0aDogc3ByaXRlV2lkdGgsXG4gICAgICBzSGVpZ2h0OiBzcHJpdGVIZWlnaHQsXG4gICAgICBmcmFtZUR1cmF0aW9uOiA5MFxuICAgIH0sXG4gICAgWzJdOiB7XG4gICAgICBzeDogNTM0LFxuICAgICAgc3k6IDE1MCxcbiAgICAgIHNXaWR0aDogc3ByaXRlV2lkdGgsXG4gICAgICBzSGVpZ2h0OiBzcHJpdGVIZWlnaHQsXG4gICAgICBmcmFtZUR1cmF0aW9uOiA5MFxuICAgIH1cbiAgfSxcblxuICBbZF9sXToge1xuICAgIGZyYW1lc0NvdW50OiAzLFxuICAgIFswXToge1xuICAgICAgc3g6IDQzOCxcbiAgICAgIHN5OiAxMDIsXG4gICAgICBzV2lkdGg6IHNwcml0ZVdpZHRoLFxuICAgICAgc0hlaWdodDogc3ByaXRlSGVpZ2h0LFxuICAgICAgZnJhbWVEdXJhdGlvbjogOTBcbiAgICB9LFxuICAgIFsxXToge1xuICAgICAgc3g6IDQ4NixcbiAgICAgIHN5OiAxMDIsXG4gICAgICBzV2lkdGg6IHNwcml0ZVdpZHRoLFxuICAgICAgc0hlaWdodDogc3ByaXRlSGVpZ2h0LFxuICAgICAgZnJhbWVEdXJhdGlvbjogOTBcbiAgICB9LFxuICAgIFsyXToge1xuICAgICAgc3g6IDUzNCxcbiAgICAgIHN5OiAxMDIsXG4gICAgICBzV2lkdGg6IHNwcml0ZVdpZHRoLFxuICAgICAgc0hlaWdodDogc3ByaXRlSGVpZ2h0LFxuICAgICAgZnJhbWVEdXJhdGlvbjogOTBcbiAgICB9XG4gIH0sXG5cbiAgW3NfbF06IHtcbiAgICBmcmFtZXNDb3VudDogMyxcbiAgICBbMF06IHtcbiAgICAgIHN4OiA0MzgsXG4gICAgICBzeTogOCxcbiAgICAgIHNXaWR0aDogc3ByaXRlV2lkdGgsXG4gICAgICBzSGVpZ2h0OiBzcHJpdGVIZWlnaHQsXG4gICAgICBmcmFtZUR1cmF0aW9uOiA5MFxuICAgIH0sXG5cbiAgICBbMV06IHtcbiAgICAgIHN4OiA0ODYsXG4gICAgICBzeTogOCxcbiAgICAgIHNXaWR0aDogc3ByaXRlV2lkdGgsXG4gICAgICBzSGVpZ2h0OiBzcHJpdGVIZWlnaHQsXG4gICAgICBmcmFtZUR1cmF0aW9uOiA5MFxuICAgIH0sXG5cbiAgICBbMl06IHtcbiAgICAgIHN4OiA1MzQsXG4gICAgICBzeTogOCxcbiAgICAgIHNXaWR0aDogc3ByaXRlV2lkdGgsXG4gICAgICBzSGVpZ2h0OiBzcHJpdGVIZWlnaHQsXG4gICAgICBmcmFtZUR1cmF0aW9uOiA5MFxuICAgIH0sXG4gIH1cbn0iLCJpbXBvcnQgTWFwSW1hZ2VUaWxlIGZyb20gJy4uL21hcEltYWdlVGlsZSc7XG5pbXBvcnQgeyBhc3NldHNfY2FjaGVyIH0gZnJvbSAnLi4vLi4vaGVscGVycy9hc3NldHNDYWNoZXInO1xuaW1wb3J0IHsgYW5pbWF0aW9uVGltaW5ncyB9IGZyb20gJy4vbWFpbkNoYXJhY3RlckNvbnN0YW50cyc7XG5pbXBvcnQgeyBzX2wsIGFfbCB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9rZXlib2FyZCc7XG5pbXBvcnQgeyBpbWFnZV90aWxlIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzLmNvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5DaGFyYWN0ZXJEcmF3ZXIgZXh0ZW5kcyBNYXBJbWFnZVRpbGUge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoJ21haW5fY2hhcmFjdGVyJywgaW1hZ2VfdGlsZSwgJ2Rpc3QvY2hyYWN0ZXJUaWxlcy9tYWluQ2hhcmFjdGVyLnBuZycpO1xuICAgIHRoaXMuY3VycmVudEZyYW1lID0ge1xuICAgICAgZGlyZWN0aW9uOiBzX2wsXG4gICAgICBmcmFtZU51bWJlcjogMCxcbiAgICAgIGZyYW1lVGltZTogMFxuICAgIH1cbiAgfVxuXG4gIGdldFJlbmRlckNvbmZpZ3VyYXRpb24gKCkge1xuICAgIGNvbnN0IGN1cnJlbnRGcmFtZVBhcmFtZXRlcnMgPSBhbmltYXRpb25UaW1pbmdzW3RoaXMuY3VycmVudEZyYW1lLmRpcmVjdGlvbl1bdGhpcy5jdXJyZW50RnJhbWUuZnJhbWVOdW1iZXJdO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIGFzc2V0c19jYWNoZXIuZ2V0QXNzZXQodGhpcy5nZXRPYmplY3RUeXBlKCkpLFxuICAgICAgY3VycmVudEZyYW1lUGFyYW1ldGVycy5zeCxcbiAgICAgIGN1cnJlbnRGcmFtZVBhcmFtZXRlcnMuc3ksXG4gICAgICBjdXJyZW50RnJhbWVQYXJhbWV0ZXJzLnNXaWR0aCxcbiAgICAgIGN1cnJlbnRGcmFtZVBhcmFtZXRlcnMuc0hlaWdodCxcbiAgICAgIHRoaXMucG9zaXRpb24ueCxcbiAgICAgIHRoaXMucG9zaXRpb24ueSxcbiAgICAgIGN1cnJlbnRGcmFtZVBhcmFtZXRlcnMuc1dpZHRoLFxuICAgICAgY3VycmVudEZyYW1lUGFyYW1ldGVycy5zSGVpZ2h0LFxuICAgIF1cbiAgfVxuXG4gIHVwZGF0ZUZyYW1lUGFyYW1ldGVycyAodGltZVBhc3NlZCwgY3VycmVudEJ1dHRvbikge1xuICAgIGlmICghY3VycmVudEJ1dHRvbikge1xuICAgICAgdGhpcy5jdXJyZW50RnJhbWUuZnJhbWVOdW1iZXIgPSAwO1xuICAgICAgdGhpcy5jdXJyZW50RnJhbWUuZnJhbWVUaW1lID0gMDtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmN1cnJlbnRGcmFtZS5kaXJlY3Rpb24gIT09IGN1cnJlbnRCdXR0b24pIHtcbiAgICAgIHRoaXMucmVzZXRGcmFtZVBhcmFtZXRlcnMoY3VycmVudEJ1dHRvbik7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJhbWV0ZXJzID0gYW5pbWF0aW9uVGltaW5nc1t0aGlzLmN1cnJlbnRGcmFtZS5kaXJlY3Rpb25dO1xuXG4gICAgaWYgKHRoaXMuY3VycmVudEZyYW1lLmZyYW1lVGltZSArIHRpbWVQYXNzZWQgPj0gcGFyYW1ldGVyc1t0aGlzLmN1cnJlbnRGcmFtZS5mcmFtZU51bWJlcl0uZnJhbWVEdXJhdGlvbikge1xuICAgICAgdGhpcy5jdXJyZW50RnJhbWUuZnJhbWVOdW1iZXIgPSB0aGlzLmN1cnJlbnRGcmFtZS5mcmFtZU51bWJlciArIDEgPT09IHBhcmFtZXRlcnMuZnJhbWVzQ291bnQgPyAwIDogdGhpcy5jdXJyZW50RnJhbWUuZnJhbWVOdW1iZXIgKyAxO1xuICAgICAgdGhpcy5jdXJyZW50RnJhbWUuZnJhbWVUaW1lID0gMDtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY3VycmVudEZyYW1lLmZyYW1lVGltZSArPSB0aW1lUGFzc2VkO1xuICB9XG5cbiAgcmVzZXRGcmFtZVBhcmFtZXRlcnMgKGN1cnJlbnRCdXR0b24pIHtcbiAgICB0aGlzLmN1cnJlbnRGcmFtZS5kaXJlY3Rpb24gPSBjdXJyZW50QnV0dG9uO1xuICAgIHRoaXMuY3VycmVudEZyYW1lLmZyYW1lTnVtYmVyID0gMDtcbiAgICB0aGlzLmN1cnJlbnRGcmFtZS5mcmFtZVRpbWUgPSAwXG4gIH1cbiAgXG59XG5cbmV4cG9ydCBjb25zdCBtYWluQ2hhcmFjdGVyRHJhd2VyID0gbmV3IE1haW5DaGFyYWN0ZXJEcmF3ZXIoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgR2FtZSBmcm9tICcuL3NyYy9tYWluJztcbmltcG9ydCB7IGlucHV0SGFuZGxlciB9IGZyb20gJy4vc3JjL21lY2hhbmljcy9rZXlCb2FyZFJlYWRlcic7XG5cbkFycmF5LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICBjb25zdCBpbmRleCA9IHRoaXMuaW5kZXhPZihpdGVtKTtcbiAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICB0aGlzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cbn1cblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5jYW52YXMud2lkdGggID0gNTAwO1xuY2FudmFzLmhlaWdodCA9IDUwMDtcbmNhbnZhcy5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBibGFja1wiO1xuXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbmlucHV0SGFuZGxlci5pbml0KCk7XG5jb25zdCBnYW1lID0gbmV3IEdhbWUoY2FudmFzLmdldENvbnRleHQoJzJkJykpO1xuZ2FtZS5pbml0KCk7Il0sInNvdXJjZVJvb3QiOiIifQ==