import { ITilesMap, IObjectsMap } from '../types';
import { SpriteProperties } from '../sprite';
import bridgeTileAsset from '../assets/objectsTiles/bridge2.png';
import grassTileAsset from '../assets/mapTiles/trees-and-bushes.png';
import waterTileAsset from '../assets/mapTiles/water.png';
import { Tile } from '../entities/tile';

const bridgeTileProperties = {
    spriteSettings: {
        sx: 0,
        sy: 0,
        sWidth: 47,
        sHeight: 59,
    },
    passable: false,
    assetUrl: bridgeTileAsset,
};

const grassTileProperties = {
    spriteSettings: {
        sx: 0,
        sy: 0,
        sWidth: 32,
        sHeight: 32,
    },
    assetUrl: grassTileAsset,
};

const waterTileProperties: SpriteProperties = {
    passable: false,
    spriteSettings: {
        sx: 0,
        sy: 0,
        sWidth: 32,
        sHeight: 32,
    },
    assetUrl: waterTileAsset,
};

const waterTilePassableProperties: SpriteProperties = {
    passable: false,
    spriteSettings: {
        sx: 0,
        sy: 0,
        sWidth: 32,
        sHeight: 32,
    },
    assetUrl: waterTileAsset,
};

export const level_1_objects: IObjectsMap = {
    7: {
        3: {
            objects: [new Tile(bridgeTileProperties)],
        },
    },
};

export const level_1_tiles: ITilesMap = {
    0: {
        0: {
            tile: new Tile(grassTileProperties),
        },
        1: {
            tile: new Tile(grassTileProperties),
        },
        2: {
            tile: new Tile(waterTileProperties),
        },
        3: {
            tile: new Tile(grassTileProperties),
        },
        4: {
            tile: new Tile(grassTileProperties),
        },
        5: {
            tile: new Tile(grassTileProperties),
        },
        6: {
            tile: new Tile(grassTileProperties),
        },
        7: {
            tile: new Tile(waterTileProperties),
        },
        8: {
            tile: new Tile(grassTileProperties),
        },
        9: {
            tile: new Tile(grassTileProperties),
        },
        10: {
            tile: new Tile(grassTileProperties),
        },
    },

    1: {
        0: {
            tile: new Tile(grassTileProperties),
        },
        1: {
            tile: new Tile(waterTileProperties),
        },
        2: {
            tile: new Tile(waterTileProperties),
        },
        3: {
            tile: new Tile(grassTileProperties),
        },
        4: {
            tile: new Tile(grassTileProperties),
        },
        5: {
            tile: new Tile(waterTileProperties),
        },
        6: {
            tile: new Tile(waterTileProperties),
        },
        7: {
            tile: new Tile(waterTileProperties),
        },
        8: {
            tile: new Tile(grassTileProperties),
        },
        9: {
            tile: new Tile(grassTileProperties),
        },
        10: {
            tile: new Tile(grassTileProperties),
        },
    },

    2: {
        0: {
            tile: new Tile(grassTileProperties),
        },
        1: {
            tile: new Tile(waterTileProperties),
        },
        2: {
            tile: new Tile(grassTileProperties),
        },
        3: {
            tile: new Tile(grassTileProperties),
        },
        4: {
            tile: new Tile(grassTileProperties),
        },
        5: {
            tile: new Tile(grassTileProperties),
        },
        6: {
            tile: new Tile(waterTileProperties),
        },
        7: {
            tile: new Tile(waterTileProperties),
        },
        8: {
            tile: new Tile(waterTileProperties),
        },
        9: {
            tile: new Tile(grassTileProperties),
        },
        10: {
            tile: new Tile(grassTileProperties),
        },
    },

    3: {
        0: {
            tile: new Tile(grassTileProperties),
        },
        1: {
            tile: new Tile(waterTileProperties),
        },
        2: {
            tile: new Tile(waterTileProperties),
        },
        3: {
            tile: new Tile(waterTileProperties),
        },
        4: {
            tile: new Tile(grassTileProperties),
        },
        5: {
            tile: new Tile(grassTileProperties),
        },
        6: {
            tile: new Tile(grassTileProperties),
        },
        7: {
            tile: new Tile(waterTileProperties),
        },
        8: {
            tile: new Tile(waterTileProperties),
        },
        9: {
            tile: new Tile(grassTileProperties),
        },
        10: {
            tile: new Tile(grassTileProperties),
        },
    },

    4: {
        0: {
            tile: new Tile(grassTileProperties),
        },
        1: {
            tile: new Tile(grassTileProperties),
        },
        2: {
            tile: new Tile(grassTileProperties),
        },
        3: {
            tile: new Tile(waterTileProperties),
        },
        4: {
            tile: new Tile(grassTileProperties),
        },
        5: {
            tile: new Tile(grassTileProperties),
        },
        6: {
            tile: new Tile(grassTileProperties),
        },
        7: {
            tile: new Tile(waterTileProperties),
        },
        8: {
            tile: new Tile(grassTileProperties),
        },
        9: {
            tile: new Tile(grassTileProperties),
        },
        10: {
            tile: new Tile(grassTileProperties),
        },
    },

    5: {
        0: {
            tile: new Tile(grassTileProperties),
        },
        1: {
            tile: new Tile(grassTileProperties),
        },
        2: {
            tile: new Tile(grassTileProperties),
        },
        3: {
            tile: new Tile(waterTileProperties),
        },
        4: {
            tile: new Tile(waterTileProperties),
        },
        5: {
            tile: new Tile(waterTileProperties),
        },
        6: {
            tile: new Tile(waterTileProperties),
        },
        7: {
            tile: new Tile(waterTileProperties),
        },
        8: {
            tile: new Tile(grassTileProperties),
        },
        9: {
            tile: new Tile(grassTileProperties),
        },
        10: {
            tile: new Tile(grassTileProperties),
        },
    },

    6: {
        0: {
            tile: new Tile(grassTileProperties),
        },
        1: {
            tile: new Tile(grassTileProperties),
        },
        2: {
            tile: new Tile(grassTileProperties),
        },
        3: {
            tile: new Tile(waterTileProperties),
        },
        4: {
            tile: new Tile(grassTileProperties),
        },
        5: {
            tile: new Tile(grassTileProperties),
        },
        6: {
            tile: new Tile(grassTileProperties),
        },
        7: {
            tile: new Tile(grassTileProperties),
        },
        8: {
            tile: new Tile(grassTileProperties),
        },
        9: {
            tile: new Tile(grassTileProperties),
        },
        10: {
            tile: new Tile(grassTileProperties),
        },
    },

    7: {
        0: {
            tile: new Tile(grassTileProperties),
        },
        1: {
            tile: new Tile(grassTileProperties),
        },
        2: {
            tile: new Tile(grassTileProperties),
        },
        3: {
            tile: new Tile(waterTilePassableProperties),
        },
        4: {
            tile: new Tile(grassTileProperties),
        },
        5: {
            tile: new Tile(grassTileProperties),
        },
        6: {
            tile: new Tile(grassTileProperties),
        },
        7: {
            tile: new Tile(grassTileProperties),
        },
        8: {
            tile: new Tile(grassTileProperties),
        },
        9: {
            tile: new Tile(grassTileProperties),
        },
        10: {
            tile: new Tile(grassTileProperties),
        },
    },

    8: {
        0: {
            tile: new Tile(grassTileProperties),
        },
        1: {
            tile: new Tile(grassTileProperties),
        },
        2: {
            tile: new Tile(grassTileProperties),
        },
        3: {
            tile: new Tile(waterTileProperties),
        },
        4: {
            tile: new Tile(grassTileProperties),
        },
        5: {
            tile: new Tile(grassTileProperties),
        },
        6: {
            tile: new Tile(grassTileProperties),
        },
        7: {
            tile: new Tile(grassTileProperties),
        },
        8: {
            tile: new Tile(grassTileProperties),
        },
        9: {
            tile: new Tile(grassTileProperties),
        },
        10: {
            tile: new Tile(grassTileProperties),
        },
    },

    9: {
        0: {
            tile: new Tile(grassTileProperties),
        },
        1: {
            tile: new Tile(grassTileProperties),
        },
        2: {
            tile: new Tile(grassTileProperties),
        },
        3: {
            tile: new Tile(waterTileProperties),
        },
        4: {
            tile: new Tile(grassTileProperties),
        },
        5: {
            tile: new Tile(grassTileProperties),
        },
        6: {
            tile: new Tile(grassTileProperties),
        },
        7: {
            tile: new Tile(grassTileProperties),
        },
        8: {
            tile: new Tile(grassTileProperties),
        },
        9: {
            tile: new Tile(grassTileProperties),
        },
        10: {
            tile: new Tile(grassTileProperties),
        },
    },

    10: {
        0: {
            tile: new Tile(grassTileProperties),
        },
        1: {
            tile: new Tile(grassTileProperties),
        },
        2: {
            tile: new Tile(grassTileProperties),
        },
        3: {
            tile: new Tile(waterTileProperties),
        },
        4: {
            tile: new Tile(grassTileProperties),
        },
        5: {
            tile: new Tile(grassTileProperties),
        },
        6: {
            tile: new Tile(grassTileProperties),
        },
        7: {
            tile: new Tile(grassTileProperties),
        },
        8: {
            tile: new Tile(grassTileProperties),
        },
        9: {
            tile: new Tile(grassTileProperties),
        },
        10: {
            tile: new Tile(grassTileProperties),
        },
    },
};
