import { image_tile } from '../constants/types.constants';

type ILayers = {
    backgroundLayers: { [key: number]: any[] },
    mapLayers: { [key: number]: any[] },
    objectsLayers: { [key: number]: any[] },
    interfaceLayers: { [key: number]: any[] },
}

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

    public pushToMapLayers(obj: any, layer: number): void {
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
        this.drawBackgroundLayers();
        this.drawMapLayers();
        this.drawObjectsLayers();
        this.drawinterfaceLayers();

        this.resetLayersObject();
    }

    private drawBackgroundLayers(): void {
        Object.keys(this.layers.backgroundLayers).forEach((layerIndex) => {
            const tiles = this.layers.backgroundLayers[layerIndex];
            if (!this.layers.backgroundLayers[layerIndex].length) return;

            tiles.forEach((tile) => {
                const type = tile.getType();
                if (!type) throw new Error('Renderer: missing or unknown type');

                const renderConfiguration = tile.getRenderConfiguration();
                this.renderByType(type, renderConfiguration);
            });
        });
    }

    private drawMapLayers(): void {
        Object.keys(this.layers.mapLayers).forEach((layerIndex) => {
            const tiles = this.layers.mapLayers[layerIndex];
            if (!this.layers.mapLayers[layerIndex].length) return;

            tiles.forEach((tile) => {
                const type = tile.getType();
                if (!type) throw new Error('Renderer: missing or unknown type');

                const renderConfiguration = tile.getRenderConfiguration();
                this.renderByType(type, renderConfiguration);
            });
        });
    }

    private drawObjectsLayers(): void {
        Object.keys(this.layers.objectsLayers).forEach((layerIndex) => {
            const tiles = this.layers.objectsLayers[layerIndex];
            if (!this.layers.objectsLayers[layerIndex].length) return;

            tiles.forEach((tile) => {
                const type = tile.getType();
                if (!type) throw new Error('Renderer: missing or unknown type');

                const renderConfiguration = tile.getRenderConfiguration();
                this.renderByType(type, renderConfiguration);
            });
        });
    }

    private drawinterfaceLayers(): void {
        Object.keys(this.layers.interfaceLayers).forEach((layerIndex) => {
            const tiles = this.layers.interfaceLayers[layerIndex];
            if (!this.layers.interfaceLayers[layerIndex].length) return;

            tiles.forEach((tile) => {
                const type = tile.getType();
                if (!type) throw new Error('Renderer: missing or unknown type');

                const renderConfiguration = tile.getRenderConfiguration();
                this.renderByType(type, renderConfiguration);
            });
        });
    }

    private renderByType(type: string, renderConfiguration: any): void {
        if (type === image_tile) {
            this.renderImageSprite(renderConfiguration);
        }
    }

    renderImageSprite(renderConfiguration) {
        // TODO DIRTY DIRTY HACK TO AVOID eslint issue
        this.ctx.drawImage.call(this.ctx, ...(renderConfiguration as []));
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
