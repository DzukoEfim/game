import { Tile } from '../entities/tile';

export type ITilesMap = Record<
    string,
    Record<string, { tile: Tile }>
>;
