import { Graph, InternalEvent } from '@maxgraph/core';

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

graph.batchUpdate(() => {
    graph.cellsLocked = true;
    graph.cellsSelectable = false;

    const a = graph.insertVertex({
        parent,
        position: [10, 10],
        size: [100, 100],
        value: 'a',
    });

    const b = graph.insertVertex({
        parent,
        position: [10, 10],
        size: [100, 100],
        value: 'b',
    });

    const c = graph.insertVertex({
        parent,
        position: [10, 10],
        size: [100, 100],
        value: 'c',
    });

    const d = graph.insertVertex({
        parent,
        position: [10, 10],
        size: [100, 100],
        value: 'd',
    });

    graph.insertEdge({
        parent,
        source: a,
        target: b,
        value: 'edge',
        style: {
            edgeStyle: 'orthogonalEdgeStyle',
            rounded: true,
        },
    });
});
