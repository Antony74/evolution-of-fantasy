import {
    EdgeParameters,
    Graph,
    InternalEvent,
    VertexParameters,
} from '@maxgraph/core';
import { centerCoords } from './utils';

const container = document.getElementById('graph-container');

if (!container) {
    throw new Error(`Element graph-container not found`);
}

const width = 500;
const height = 500;

container.style.width = `${width}`;
container.style.height = `${height}`;

InternalEvent.disableContextMenu(container);

const graph = new Graph(container);

const parent = graph.getDefaultParent();

const margin = 80;
const yCenter = width / 2;
const xCenter = height / 2;
const yOffset = 10;
const top = margin;
const bottom = height - margin;
const left = margin;
const right = width - margin;

graph.batchUpdate(() => {
    graph.cellsLocked = true;
    graph.cellsSelectable = false;

    const vertexCommon: VertexParameters = {
        parent,
        size: [100, 100],
        style: { verticalAlign: 'middle' },
    };

    const a = graph.insertVertex(
        centerCoords({
            ...vertexCommon,
            position: [xCenter, top],
            value: 'a',
        }),
    );

    const b = graph.insertVertex(
        centerCoords({
            ...vertexCommon,
            position: [left, yCenter],
            value: 'b',
        }),
    );

    const c = graph.insertVertex(
        centerCoords({
            ...vertexCommon,
            position: [right, yCenter],
            value: 'c',
        }),
    );

    const d = graph.insertVertex(
        centerCoords({
            ...vertexCommon,
            position: [xCenter, bottom],
            value: 'd',
        }),
    );

    const edgeCommon: EdgeParameters = {
        parent,
        style: {
            edgeStyle: 'orthogonalEdgeStyle',
            rounded: true,
        },
    };

    graph.insertEdge({
        ...edgeCommon,
        source: a,
        target: b,
    });

    graph.insertEdge({
        ...edgeCommon,
        source: a,
        target: c,
    });

    graph.insertEdge({
        ...edgeCommon,
        source: b,
        target: d,
    });

    graph.insertEdge({
        ...edgeCommon,
        source: c,
        target: d,
    });
});
