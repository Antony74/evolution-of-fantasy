import fsp from 'fs/promises';

import jsdomGlobal from 'jsdom-global';

import { maxGraphToSvg } from './maxGraphToSvg';
import { createEvolutionOfFantasyGraph } from './evolutionOfFantasy';
import { Resvg } from '@resvg/resvg-js';

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
    const xml = await maxGraphToSvg(graph, { inlineImages: true });
    await fsp.writeFile('evolution-of-fantasy.svg', xml);

    const resvg = new Resvg(xml, {
        background: '#ffffff',
    });
    const pngData = resvg.render().asPng();
    await fsp.writeFile(`evolution-of-fantasy.png`, pngData);
};

main();
