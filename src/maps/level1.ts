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
    assetUrl: bridgeTileAsset,
};

const grassTileProperties: SpriteProperties = {
    spriteSettings: {
        sx: 0,
        sy: 0,
        sWidth: 32,
        sHeight: 32,
    },
    assetUrl: grassTileAsset,
};

const waterTileProperties: SpriteProperties = {
    spriteSettings: {
        sx: 0,
        sy: 0,
        sWidth: 32,
        sHeight: 32,
    },
    assetUrl: waterTileAsset,
};

export class LevelOne {
    static level1Objects: IObjectsMap = {};

    static level1Tiles: ITilesMap = {};

    static getLevel1Objects() {
        return {
            7: {
                3: {
                    objects: [new Tile(bridgeTileProperties)],
                },
            },
        };
    }

    static getLevel1Tiles() {
        return {
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
    }
}
