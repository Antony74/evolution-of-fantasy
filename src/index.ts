import {
    CellStyle,
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

const margin = 90;
const yCenter = width / 2;
const xCenter = height / 2;
const yOffset = 20;
const top = margin;
const bottom = height - margin;
const left = margin;
const right = width - margin;

graph.batchUpdate(() => {
    graph.cellsLocked = true;
    graph.cellsSelectable = false;

    const vertexCommon: VertexParameters = {
        parent,
        size: [140, 140],
        style: { verticalAlign: 'middle' },
    };

    const a = graph.insertVertex(
        centerCoords({
            ...vertexCommon,
            position: [xCenter, top],
            value: [`The King of`, `Elfland's Daughter`].join('\n'),
        }),
    );

    const b = graph.insertVertex(
        centerCoords({
            ...vertexCommon,
            position: [left, yCenter + yOffset],
            value: `The Lord of the Rings`,
        }),
    );

    const c = graph.insertVertex(
        centerCoords({
            ...vertexCommon,
            position: [right, yCenter - yOffset],
            value: `The Shadow Kingdom`,
        }),
    );

    const d = graph.insertVertex(
        centerCoords({
            ...vertexCommon,
            position: [xCenter, bottom],
            value: `The Black Company`,
        }),
    );

    const edgeStyle: CellStyle = {
        edgeStyle: 'orthogonalEdgeStyle',
        rounded: true,
        strokeWidth: 10,
        strokeColor: 'black',
        arcSize: 50,
        endArrow: 'block',
    };

    graph.insertEdge({
        parent,
        source: a,
        target: b,
        style: { ...edgeStyle },
    });

    graph.insertEdge({
        parent,
        source: a,
        target: c,
        style: { ...edgeStyle, targetPortConstraint: 'north' as any },
    });

    graph.insertEdge({
        parent,
        source: b,
        target: d,
        style: { ...edgeStyle, sourcePortConstraint: 'south' as any },
    });

    graph.insertEdge({
        parent,
        source: c,
        target: d,
        style: { ...edgeStyle, sourcePortConstraint: 'south' as any },
    });
});
