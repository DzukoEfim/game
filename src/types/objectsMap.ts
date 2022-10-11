import { ISprite } from '../sprite';

export type IObjectsMap = Record<
    string,
    Record<string, { objects: ISprite[] }>
>;
