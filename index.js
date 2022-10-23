import Game from './src/main';
import bridgeTileAsset from './src/assets/objectsTiles/bridge2.png';
import grassTileAsset from './src/assets/mapTiles/trees-and-bushes.png';
import waterTileAsset from './src/assets/mapTiles/water.png';
import mainCharacterSprite from './src/assets/chracterTiles/mainCharacter.png';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid black';

document.body.appendChild(canvas);

Game.initResources([bridgeTileAsset, grassTileAsset, waterTileAsset, mainCharacterSprite])
    .then(() => {
        const game = new Game(canvas.getContext('2d'));
        game.init();
    });
