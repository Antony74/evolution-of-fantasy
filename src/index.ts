import { Graph, InternalEvent } from '@maxgraph/core';

const container = document.getElementById('graph-container');

if (!container) {
    throw new Error(`Element graph-container not found`);
}

InternalEvent.disableContextMenu(container);

const graph = new Graph(container);

const parent = graph.getDefaultParent();

graph.batchUpdate(() => {
    graph.cellsLocked = true;
    graph.cellsSelectable = false;

    const vertex01 = graph.insertVertex({
        parent,
        position: [10, 10],
        size: [100, 100],
        value: 'rectangle',
    });

    const vertex02 = graph.insertVertex({
        parent,
        position: [350, 90],
        size: [50, 50],
        style: {
            fillColor: 'orange',
            shape: 'ellipse',
            verticalAlign: 'top',
            verticalLabelPosition: 'bottom',
        },
        value: 'ellipse',
    });

    graph.insertEdge({
        parent,
        source: vertex01,
        target: vertex02,
        value: 'edge',
        style: {
            edgeStyle: 'orthogonalEdgeStyle',
            rounded: true,
        },
    });
});
