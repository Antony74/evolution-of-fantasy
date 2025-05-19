import fsp from 'fs/promises';

import jsdomGlobal from 'jsdom-global';
import { Rectangle } from '@maxgraph/core';
import { Resvg } from '@resvg/resvg-js';
import { svgElementInlineImages } from 'svg-inline-images';

import { createEvolutionOfFantasyGraph } from './evolutionOfFantasy';

const main = async () => {
    jsdomGlobal(`<!DOCTYPE html><div id="graph-container"></div>`);

    const container = document.getElementById('graph-container');

    if (!container) {
        throw new Error(`Element graph-container not found`);
    }

    const width = 480;
    const height = 600;

    const imageLocation = 'file://./static';

    const graph = createEvolutionOfFantasyGraph(
        container,
        width,
        height,
        imageLocation,
    );

    const svg = container.firstElementChild!;

    const margin = 20;
    const graphBounds = graph.getGraphBounds();
    const bounds = new Rectangle(
        graphBounds.x - margin,
        graphBounds.y - margin,
        graphBounds.width + 2 * margin,
        graphBounds.height + 2 * margin,
    );

    svg.setAttribute(`width`, `${bounds.width}`);
    svg.setAttribute('height', `${bounds.height}`);
    svg.setAttribute(
        `viewBox`,
        `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`,
    );

    const xml = await svgElementInlineImages(
        graph.container.firstElementChild!,
        fsp.readFile,
    );
    await fsp.writeFile('evolution-of-fantasy.svg', xml);

    const resvg = new Resvg(xml, {
        background: '#ffffff',
    });
    const pngData = resvg.render().asPng();
    await fsp.writeFile(`evolution-of-fantasy.png`, pngData);
};

main();
