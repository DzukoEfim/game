import { AssetManager } from '../assetManager';
import { IRenderable, RenderConfiguration } from '../types/renderable';

type ILayers = {
    backgroundLayers: Record<string, IRenderable[]>,
    mapLayers: Record<string, IRenderable[]>,
    objectsLayers: Record<string, IRenderable[]>,
    interfaceLayers: Record<string, IRenderable[]>,
}

type LayerNames = keyof ILayers;

class Renderer {
    private ctx: CanvasRenderingContext2D = null;
    private layers: ILayers = {
        backgroundLayers: { 0: [] },
        mapLayers: { 0: [] },
        objectsLayers: { 0: [] },
        interfaceLayers: { 0: [] },
    };

    public initialize(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
    }

    public pushLayer(layerName: LayerNames, obj: IRenderable, layer: number = 0): void {
        if (!this.layers.objectsLayers[layer]) {
            this.layers[layerName][layer] = [obj];
        } else {
            this.layers[layerName][layer].push(obj);
        }
    }

    public draw(): void {
        this.drawLayer('backgroundLayers');
        this.drawLayer('mapLayers');
        this.drawLayer('objectsLayers');
        this.drawLayer('interfaceLayers');
        this.drawLayer('interfaceLayers');
        this.resetLayersObject();
    }

    private drawLayer(layerName: LayerNames) {
        Object.keys(this.layers[layerName]).forEach((layerIndex) => {
            const tiles = this.layers[layerName][layerIndex];
            if (!this.layers[layerName][layerIndex].length) return;

            tiles.forEach((tile) => {
                const renderConfiguration = tile.getRenderConfiguration();
                this.renderImageSprite(renderConfiguration);
            });
        });
    }

    async renderImageSprite(renderConfiguration: RenderConfiguration) {
        const image = await AssetManager.loadAsset(renderConfiguration.assetUrl);
        this.ctx.drawImage(
            image,
            renderConfiguration.sx,
            renderConfiguration.sy,
            renderConfiguration.sWidth,
            renderConfiguration.sHeight,
            renderConfiguration.x,
            renderConfiguration.y,
            renderConfiguration.sWidth,
            renderConfiguration.sHeight,
        );
    }

    resetLayersObject() {
        this.layers = {
            backgroundLayers: { 0: [] },
            mapLayers: { 0: [] },
            objectsLayers: { 0: [] },
            interfaceLayers: { 0: [] },
        };
    }
}

export const renderer = new Renderer();
