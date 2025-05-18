import fsp from 'fs/promises';

import jsdomGlobal from 'jsdom-global';
import { maxGraphToSvg } from 'maxgraph-core-commonjs';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

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
    const xml = await maxGraphToSvg(graph as any, { inlineImages: true });
    await fsp.writeFile('evolution-of-fantasy.svg', xml);

    const resvg = new Resvg(xml, {
        background: '#ffffff',
    });
    const pngData = resvg.render().asPng();
    await fsp.writeFile(`temp.png`, pngData);

    await sharp(`temp.png`)
        .extend({
            left: 0,
            top: 0,
            right: 10,
            bottom: 10,
            background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .toFile(`evolution-of-fantasy.png`);
};

main();
