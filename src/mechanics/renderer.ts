import { AssetManager } from '../assetManager';
import { ISprite, RenderConfiguration } from '../sprite';

type ILayers = {
    backgroundLayers: Record<string, ISprite[]>,
    mapLayers: Record<string, ISprite[]>,
    objectsLayers: Record<string, ISprite[]>,
    interfaceLayers: Record<string, ISprite[]>,
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

    public pushToBackgroundLayers(obj: any, layer: number): void {
        if (!this.layers.backgroundLayers[layer]) {
            this.layers.backgroundLayers[layer] = [obj];
        } else {
            this.layers.backgroundLayers[layer].push(obj);
        }
    }

    public pushToMapLayers(obj: ISprite, layer: number): void {
        if (!this.layers.mapLayers[layer]) {
            this.layers.mapLayers[layer] = [obj];
        } else {
            this.layers.mapLayers[layer].push(obj);
        }
    }

    public pushToObjectsLayers(obj: any, layer: number): void {
        if (!this.layers.objectsLayers[layer]) {
            this.layers.objectsLayers[layer] = [obj];
        } else {
            this.layers.objectsLayers[layer].push(obj);
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
