import { Tile } from '../entities/tile';

export type IObjectsMap = Record<
    string,
    Record<string, { objects: Tile[] }>
>;
