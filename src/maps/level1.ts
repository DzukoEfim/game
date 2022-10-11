import { ITilesMap, IObjectsMap } from '../types';
import { Sprite, SpriteProperties } from '../sprite';
import bridgeTileAsset from '../assets/objectsTiles/bridge2.png';
import grassTileAsset from '../assets/mapTiles/trees-and-bushes.png';
import waterTileAsset from '../assets/mapTiles/water.png';

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
            objects: [new Sprite(bridgeTileProperties)],
        },
    },
};

export const level_1_tiles: ITilesMap = {
    0: {
        0: {
            tile: new Sprite(grassTileProperties),
        },
        1: {
            tile: new Sprite(grassTileProperties),
        },
        2: {
            tile: new Sprite(waterTileProperties),
        },
        3: {
            tile: new Sprite(grassTileProperties),
        },
        4: {
            tile: new Sprite(grassTileProperties),
        },
        5: {
            tile: new Sprite(grassTileProperties),
        },
        6: {
            tile: new Sprite(grassTileProperties),
        },
        7: {
            tile: new Sprite(waterTileProperties),
        },
        8: {
            tile: new Sprite(grassTileProperties),
        },
        9: {
            tile: new Sprite(grassTileProperties),
        },
        10: {
            tile: new Sprite(grassTileProperties),
        },
    },

    1: {
        0: {
            tile: new Sprite(grassTileProperties),
        },
        1: {
            tile: new Sprite(waterTileProperties),
        },
        2: {
            tile: new Sprite(waterTileProperties),
        },
        3: {
            tile: new Sprite(grassTileProperties),
        },
        4: {
            tile: new Sprite(grassTileProperties),
        },
        5: {
            tile: new Sprite(waterTileProperties),
        },
        6: {
            tile: new Sprite(waterTileProperties),
        },
        7: {
            tile: new Sprite(waterTileProperties),
        },
        8: {
            tile: new Sprite(grassTileProperties),
        },
        9: {
            tile: new Sprite(grassTileProperties),
        },
        10: {
            tile: new Sprite(grassTileProperties),
        },
    },

    2: {
        0: {
            tile: new Sprite(grassTileProperties),
        },
        1: {
            tile: new Sprite(waterTileProperties),
        },
        2: {
            tile: new Sprite(grassTileProperties),
        },
        3: {
            tile: new Sprite(grassTileProperties),
        },
        4: {
            tile: new Sprite(grassTileProperties),
        },
        5: {
            tile: new Sprite(grassTileProperties),
        },
        6: {
            tile: new Sprite(waterTileProperties),
        },
        7: {
            tile: new Sprite(waterTileProperties),
        },
        8: {
            tile: new Sprite(waterTileProperties),
        },
        9: {
            tile: new Sprite(grassTileProperties),
        },
        10: {
            tile: new Sprite(grassTileProperties),
        },
    },

    3: {
        0: {
            tile: new Sprite(grassTileProperties),
        },
        1: {
            tile: new Sprite(waterTileProperties),
        },
        2: {
            tile: new Sprite(waterTileProperties),
        },
        3: {
            tile: new Sprite(waterTileProperties),
        },
        4: {
            tile: new Sprite(grassTileProperties),
        },
        5: {
            tile: new Sprite(grassTileProperties),
        },
        6: {
            tile: new Sprite(grassTileProperties),
        },
        7: {
            tile: new Sprite(waterTileProperties),
        },
        8: {
            tile: new Sprite(waterTileProperties),
        },
        9: {
            tile: new Sprite(grassTileProperties),
        },
        10: {
            tile: new Sprite(grassTileProperties),
        },
    },

    4: {
        0: {
            tile: new Sprite(grassTileProperties),
        },
        1: {
            tile: new Sprite(grassTileProperties),
        },
        2: {
            tile: new Sprite(grassTileProperties),
        },
        3: {
            tile: new Sprite(waterTileProperties),
        },
        4: {
            tile: new Sprite(grassTileProperties),
        },
        5: {
            tile: new Sprite(grassTileProperties),
        },
        6: {
            tile: new Sprite(grassTileProperties),
        },
        7: {
            tile: new Sprite(waterTileProperties),
        },
        8: {
            tile: new Sprite(grassTileProperties),
        },
        9: {
            tile: new Sprite(grassTileProperties),
        },
        10: {
            tile: new Sprite(grassTileProperties),
        },
    },

    5: {
        0: {
            tile: new Sprite(grassTileProperties),
        },
        1: {
            tile: new Sprite(grassTileProperties),
        },
        2: {
            tile: new Sprite(grassTileProperties),
        },
        3: {
            tile: new Sprite(waterTileProperties),
        },
        4: {
            tile: new Sprite(waterTileProperties),
        },
        5: {
            tile: new Sprite(waterTileProperties),
        },
        6: {
            tile: new Sprite(waterTileProperties),
        },
        7: {
            tile: new Sprite(waterTileProperties),
        },
        8: {
            tile: new Sprite(grassTileProperties),
        },
        9: {
            tile: new Sprite(grassTileProperties),
        },
        10: {
            tile: new Sprite(grassTileProperties),
        },
    },

    6: {
        0: {
            tile: new Sprite(grassTileProperties),
        },
        1: {
            tile: new Sprite(grassTileProperties),
        },
        2: {
            tile: new Sprite(grassTileProperties),
        },
        3: {
            tile: new Sprite(waterTileProperties),
        },
        4: {
            tile: new Sprite(grassTileProperties),
        },
        5: {
            tile: new Sprite(grassTileProperties),
        },
        6: {
            tile: new Sprite(grassTileProperties),
        },
        7: {
            tile: new Sprite(grassTileProperties),
        },
        8: {
            tile: new Sprite(grassTileProperties),
        },
        9: {
            tile: new Sprite(grassTileProperties),
        },
        10: {
            tile: new Sprite(grassTileProperties),
        },
    },

    7: {
        0: {
            tile: new Sprite(grassTileProperties),
        },
        1: {
            tile: new Sprite(grassTileProperties),
        },
        2: {
            tile: new Sprite(grassTileProperties),
        },
        3: {
            tile: new Sprite(waterTilePassableProperties),
        },
        4: {
            tile: new Sprite(grassTileProperties),
        },
        5: {
            tile: new Sprite(grassTileProperties),
        },
        6: {
            tile: new Sprite(grassTileProperties),
        },
        7: {
            tile: new Sprite(grassTileProperties),
        },
        8: {
            tile: new Sprite(grassTileProperties),
        },
        9: {
            tile: new Sprite(grassTileProperties),
        },
        10: {
            tile: new Sprite(grassTileProperties),
        },
    },

    8: {
        0: {
            tile: new Sprite(grassTileProperties),
        },
        1: {
            tile: new Sprite(grassTileProperties),
        },
        2: {
            tile: new Sprite(grassTileProperties),
        },
        3: {
            tile: new Sprite(waterTileProperties),
        },
        4: {
            tile: new Sprite(grassTileProperties),
        },
        5: {
            tile: new Sprite(grassTileProperties),
        },
        6: {
            tile: new Sprite(grassTileProperties),
        },
        7: {
            tile: new Sprite(grassTileProperties),
        },
        8: {
            tile: new Sprite(grassTileProperties),
        },
        9: {
            tile: new Sprite(grassTileProperties),
        },
        10: {
            tile: new Sprite(grassTileProperties),
        },
    },

    9: {
        0: {
            tile: new Sprite(grassTileProperties),
        },
        1: {
            tile: new Sprite(grassTileProperties),
        },
        2: {
            tile: new Sprite(grassTileProperties),
        },
        3: {
            tile: new Sprite(waterTileProperties),
        },
        4: {
            tile: new Sprite(grassTileProperties),
        },
        5: {
            tile: new Sprite(grassTileProperties),
        },
        6: {
            tile: new Sprite(grassTileProperties),
        },
        7: {
            tile: new Sprite(grassTileProperties),
        },
        8: {
            tile: new Sprite(grassTileProperties),
        },
        9: {
            tile: new Sprite(grassTileProperties),
        },
        10: {
            tile: new Sprite(grassTileProperties),
        },
    },

    10: {
        0: {
            tile: new Sprite(grassTileProperties),
        },
        1: {
            tile: new Sprite(grassTileProperties),
        },
        2: {
            tile: new Sprite(grassTileProperties),
        },
        3: {
            tile: new Sprite(waterTileProperties),
        },
        4: {
            tile: new Sprite(grassTileProperties),
        },
        5: {
            tile: new Sprite(grassTileProperties),
        },
        6: {
            tile: new Sprite(grassTileProperties),
        },
        7: {
            tile: new Sprite(grassTileProperties),
        },
        8: {
            tile: new Sprite(grassTileProperties),
        },
        9: {
            tile: new Sprite(grassTileProperties),
        },
        10: {
            tile: new Sprite(grassTileProperties),
        },
    },
};
