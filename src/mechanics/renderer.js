import { image_tile } from '../constants/types.constants';

class Renderer {
    constructor() {
        this.ctx = null;
        this.layers = {
            backgroundLayers: { 0: [] },
            mapLayers: { 0: [] },
            objectsLayers: { 0: [] },
            interfaceLayers: { 0: [] },
        };

        this.typeToDrawingFunctionMapping = {};
    }

    initialize(ctx) {
        this.ctx = ctx;
    }

    pushToBackgroundLayers(obj, layer) {
        if (layer === undefined) throw new Error('Renderer: layer is not specified');
        if (!this.layers.backgroundLayers[layer]) {
            this.layers.backgroundLayers[layer] = [obj];
        } else {
            this.layers.backgroundLayers[layer].push(obj);
        }
    }

    pushToMapLayers(obj, layer) {
        if (layer === undefined) throw new Error('Renderer: layer is not specified');
        if (!this.layers.mapLayers[layer]) {
            this.layers.mapLayers[layer] = [obj];
        } else {
            this.layers.mapLayers[layer].push(obj);
        }
    }

    pushToObjectsLayers(obj, layer) {
        if (layer === undefined) throw new Error('Renderer: layer is not specified');
        if (!this.layers.objectsLayers[layer]) {
            this.layers.objectsLayers[layer] = [obj];
        } else {
            this.layers.objectsLayers[layer].push(obj);
        }
    }

    draw() {
        this.drawBackgroundLayers();
        this.drawMapLayers();
        this.drawObjectsLayers();
        this.drawinterfaceLayers();

        this.resetLayersObject();
    }

    drawBackgroundLayers() {
        for (const layerIndex in this.layers.backgroundLayers) {
            const tiles = this.layers.backgroundLayers[layerIndex];
            if (!this.layers.backgroundLayers[layerIndex].length) continue;

            tiles.forEach((tile) => {
                const type = tile.getType();
                if (!type) throw new Error('Renderer: missing or unknown type');

                const renderConfiguration = tile.getRenderConfiguration();
                this.renderByType(type, renderConfiguration);
            });
        }
    }

    drawMapLayers() {
        for (const layerIndex in this.layers.mapLayers) {
            const tiles = this.layers.mapLayers[layerIndex];
            if (!this.layers.mapLayers[layerIndex].length) continue;

            tiles.forEach((tile) => {
                const type = tile.getType();
                if (!type) throw new Error('Renderer: missing or unknown type');

                const renderConfiguration = tile.getRenderConfiguration();
                this.renderByType(type, renderConfiguration);
            });
        }
    }

    drawObjectsLayers() {
        for (const layerIndex in this.layers.objectsLayers) {
            const tiles = this.layers.objectsLayers[layerIndex];
            if (!this.layers.objectsLayers[layerIndex].length) continue;

            tiles.forEach((tile) => {
                const type = tile.getType();
                if (!type) throw new Error('Renderer: missing or unknown type');

                const renderConfiguration = tile.getRenderConfiguration();
                this.renderByType(type, renderConfiguration);
            });
        }
    }

    drawinterfaceLayers() {
        for (const layerIndex in this.layers.interfaceLayers) {
            const tiles = this.layers.interfaceLayers[layerIndex];
            if (!this.layers.interfaceLayers[layerIndex].length) continue;

            tiles.forEach((tile) => {
                const type = tile.getType();
                if (!type) throw new Error('Renderer: missing or unknown type');

                const renderConfiguration = tile.getRenderConfiguration();
                this.renderByType(type, renderConfiguration);
            });
        }
    }

    renderByType(type, renderConfiguration) {
        if (type === image_tile) {
            this.renderImageSprite(renderConfiguration);
        }
    }

    renderImageSprite(renderConfiguration = []) {
        this.ctx.drawImage(...renderConfiguration);
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
