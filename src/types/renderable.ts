export type RenderConfiguration = {
    sx: number;
    sy: number;
    assetUrl: string;
    x?: number;
    y?: number;
    sWidth?: number;
    sHeight?: number;
    dWidth?: number;
    dHeight?: number;
}

export interface IRenderable {
  getRenderConfiguration(): RenderConfiguration;
}
