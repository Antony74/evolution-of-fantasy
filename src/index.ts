import {
    EdgeParameters,
    Graph,
    InternalEvent,
    VertexParameters,
} from '@maxgraph/core';

const container = document.getElementById('graph-container');

if (!container) {
    throw new Error(`Element graph-container not found`);
}

const width = 500;
const height = 500;

container.style.width = `${width}`;
container.style.height = `${height}`;

const yCenter = width / 2;
const xCenter = height / 2;
const yOffset = 10;
const top = 10;
const bottom = 300;
const left = 10;
const right = 300;

InternalEvent.disableContextMenu(container);

const graph = new Graph(container);

const parent = graph.getDefaultParent();

const centerCoords = ({
    position,
    ...params
}: VertexParameters): VertexParameters => {
    if (position) {
        return { ...params, position: [position[0], position[1]] };
    } else {
        return { ...params };
    }
};

graph.batchUpdate(() => {
    graph.cellsLocked = true;
    graph.cellsSelectable = false;

    const vertexCommon: VertexParameters = {
        parent,
        size: [100, 100],
        style: { verticalAlign: 'middle' },
    };

    const a = graph.insertVertex({
        ...vertexCommon,
        position: [xCenter, top],
        value: 'a',
    });

    const b = graph.insertVertex({
        ...vertexCommon,
        position: [left, yCenter],
        value: 'b',
    });

    const c = graph.insertVertex({
        ...vertexCommon,
        position: [right, yCenter],
        value: 'c',
    });

    const d = graph.insertVertex({
        ...vertexCommon,
        position: [xCenter, bottom],
        value: 'd',
    });

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
