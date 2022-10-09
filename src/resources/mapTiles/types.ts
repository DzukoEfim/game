import { ISprite } from '../../sprite';

export type ITilesMap = Record<
    string,
    Record<string, { tile: ISprite }>
>;
