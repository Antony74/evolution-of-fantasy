import { InternalEvent, maxGraphToSvg } from 'maxgraph-core-commonjs';
import { createEvolutionOfFantasyGraph } from './evolutionOfFantasy';

const container = document.getElementById('graph-container');

if (!container) {
    throw new Error(`Element graph-container not found`);
}

const width = 480;
const height = 600;

InternalEvent.disableContextMenu(container);

const graph = createEvolutionOfFantasyGraph(
    container,
    width,
    height,
    '',
);

const button = document.getElementById('download-button');

if (!button) {
    throw new Error(`Element download-button not found`);
}

button.addEventListener('click', async () => {
    const xml = await maxGraphToSvg(graph);

    const blob = new Blob([xml], {
        type: 'image/svg+xml',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'evolution-of-fantasy.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
});
