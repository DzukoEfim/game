import {
    a_l, w_l, d_l, s_l,
} from '../../constants/keyboard';

export const right = 'right';
export const top = 'top';
export const left = 'left';
export const bottom = 'bottom';

export const spriteWidth = 33;
export const spriteHeight = 41;

export const buttonToDirectionMapping = {
    [a_l]: {
        value: 'x',
        multiplier: -1,
        direction: 'left',
    },
    [w_l]: {
        value: 'y',
        multiplier: -1,
        direction: 'top',
    },
    [d_l]: {
        value: 'x',
        multiplier: 1,
        direction: 'right',
    },
    [s_l]: {
        value: 'y',
        multiplier: 1,
        direction: 'bottom',
    },
};

export const lookupToNeibhourTileModifier = {
    [a_l]: {
        firstTile: { x: 0, y: spriteHeight - 3 },
        secondTile: { x: 0, y: spriteHeight / 2 + 3 },
    },
    [w_l]: {
        firstTile: { x: 0, y: spriteHeight / 2 },
        secondTile: { x: spriteWidth, y: spriteHeight / 2 },
    },
    [d_l]: {
        firstTile: { x: spriteWidth, y: spriteHeight - 3 },
        secondTile: { x: spriteWidth, y: spriteHeight / 2 + 3 },
    },
    [s_l]: {
        firstTile: { x: 0, y: spriteHeight },
        secondTile: { x: spriteWidth, y: spriteHeight },
    },
};

export const animationTimings = {
    [a_l]: {
        framesCount: 3,
        0: {
            sx: 438,
            sy: 55,
            sWidth: spriteWidth,
            sHeight: spriteHeight,
            frameDuration: 90,
        },
        1: {
            sx: 486,
            sy: 55,
            sWidth: spriteWidth,
            sHeight: spriteHeight,
            frameDuration: 90,
        },
        2: {
            sx: 534,
            sy: 55,
            sWidth: spriteWidth,
            sHeight: spriteHeight,
            frameDuration: 90,
        },
    },

    [w_l]: {
        framesCount: 3,
        0: {
            sx: 438,
            sy: 150,
            sWidth: spriteWidth,
            sHeight: spriteHeight,
            frameDuration: 90,
        },
        1: {
            sx: 486,
            sy: 150,
            sWidth: spriteWidth,
            sHeight: spriteHeight,
            frameDuration: 90,
        },
        2: {
            sx: 534,
            sy: 150,
            sWidth: spriteWidth,
            sHeight: spriteHeight,
            frameDuration: 90,
        },
    },

    [d_l]: {
        framesCount: 3,
        0: {
            sx: 438,
            sy: 102,
            sWidth: spriteWidth,
            sHeight: spriteHeight,
            frameDuration: 90,
        },
        1: {
            sx: 486,
            sy: 102,
            sWidth: spriteWidth,
            sHeight: spriteHeight,
            frameDuration: 90,
        },
        2: {
            sx: 534,
            sy: 102,
            sWidth: spriteWidth,
            sHeight: spriteHeight,
            frameDuration: 90,
        },
    },

    [s_l]: {
        framesCount: 3,
        0: {
            sx: 438,
            sy: 8,
            sWidth: spriteWidth,
            sHeight: spriteHeight,
            frameDuration: 90,
        },

        1: {
            sx: 486,
            sy: 8,
            sWidth: spriteWidth,
            sHeight: spriteHeight,
            frameDuration: 90,
        },

        2: {
            sx: 534,
            sy: 8,
            sWidth: spriteWidth,
            sHeight: spriteHeight,
            frameDuration: 90,
        },
    },
};
