import MapImageTile from '../mapImageTile';
import { assets_cacher } from '../../helpers/assetsCacher';
import { animationTimings } from './mainCharacterConstants';
import { s_l, a_l } from '../../constants/keyboard';
import { image_tile } from '../../constants/types.constants';
import mainCharacterSprite from '../../assets/chracterTiles/mainCharacter.png'

export default class MainCharacterDrawer extends MapImageTile {
  constructor () {
    super('main_character', image_tile, mainCharacterSprite);
    this.currentFrame = {
      direction: s_l,
      frameNumber: 0,
      frameTime: 0
    }
  }

  getRenderConfiguration () {
    const currentFrameParameters = animationTimings[this.currentFrame.direction][this.currentFrame.frameNumber];

    return [
      assets_cacher.getAsset(this.getObjectType()),
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

    const parameters = animationTimings[this.currentFrame.direction];

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

export const mainCharacterDrawer = new MainCharacterDrawer();