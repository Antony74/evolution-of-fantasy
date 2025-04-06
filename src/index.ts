import {
    CellStyle,
    Graph,
    InternalEvent,
    VertexParameters,
} from '@maxgraph/core';
import { centerCoords, Vec2 } from './utils';

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

    const vertexCommon: VertexParameters & { size: Vec2 } = {
        parent,
        size: [140, 140],
    };

    const aParams = centerCoords({
        ...vertexCommon,
        position: [xCenter, top],
        value: [`The King of`, `Elfland's Daughter`].join('\n'),
    });

    const bParams = centerCoords({
        ...vertexCommon,
        position: [left, yCenter + yOffset],
        value: `The Lord of the Rings`,
    });

    const cParams = centerCoords({
        ...vertexCommon,
        position: [right, yCenter - yOffset],
        value: `The Shadow Kingdom`,
    });

    const dParams = centerCoords({
        ...vertexCommon,
        position: [xCenter, bottom],
        style: {
            image: 'The_Black_Company.jpg',
            shape: 'image',
        },
    });

    const a = graph.insertVertex(aParams);
    const b = graph.insertVertex(bParams);
    const c = graph.insertVertex(cParams);
    const d = graph.insertVertex(dParams);

    graph.insertVertex({
        parent,
        value: [`Glen Cook, 1984`, `Became known as Grimdark`].join('\n'),
        position: [dParams.position[0], dParams.position[1] + dParams.size[1]],
        size: [140, 25],
        style: { fillOpacity: 0, strokeOpacity: 0, fontColor: 'black' },
    });

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
