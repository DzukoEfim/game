import { InputUser } from '../mechanics/keyBoardReader';
import { a_l, w_l, d_l, s_l } from '../constants/keyboard';
import { map_controller } from '../controlers/MAP_Controller';
import { buttonToDirectionMapping, lookupToNeibhourTileModifier, spriteWidth, spriteHeight } from '../resources/objectsTiles/mainCharacterConstants';
import { mainCharacterDrawer } from '../resources/objectsTiles/mainCharacterDrawer';
import { assets_cacher } from '../helpers/assetsCacher';
import { renderer } from '../mechanics/renderer';

const maxSpeed = 100; // pixels/second

class MainCharacter extends InputUser {
  constructor () {
    super([a_l, w_l, d_l, s_l]);
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
    const axisParameters = buttonToDirectionMapping[this.lookDirection];
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

    mainCharacterDrawer.setPosition(this.position.x, this.position.y);
    mainCharacterDrawer.updateFrameParameters(timePassed, currentButton);
    renderer.pushToObjectsLayers(mainCharacterDrawer, 0);
  }

  getNextTiles (x, y) {
    const multipliers = lookupToNeibhourTileModifier[this.lookDirection];
    return [
      map_controller.getTileDataByCoords(x + multipliers.firstTile.x, y + multipliers.firstTile.y),
      map_controller.getTileDataByCoords(x + multipliers.secondTile.x, y + multipliers.secondTile.y)
    ];
  }

  prepareTiles () {
    assets_cacher.downloadAndCacheAssets({[mainCharacterDrawer.getObjectType()]: mainCharacterDrawer});
  }

  drawCharacterBorder () {
    this.ctx.beginPath();
    this.ctx.moveTo(this.position.x, this.position.y);
    this.ctx.lineTo(this.position.x, this.position.y + spriteHeight);
    this.ctx.lineTo(this.position.x + spriteWidth, this.position.y + spriteHeight);
    this.ctx.lineTo(this.position.x + spriteWidth, this.position.y);
    this.ctx.lineTo(this.position.x, this.position.y);
    this.ctx.strokeStyle = '#FFFB33';
    this.ctx.stroke();
  }
}

export const mainCharacter = new MainCharacter();