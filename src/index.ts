import {
    CellStyle,
    Graph,
    InternalEvent,
    VertexParameters,
} from '@maxgraph/core';
import { below, centerCoords, VertexParametersWithSize } from './utils';

const container = document.getElementById('graph-container');

if (!container) {
    throw new Error(`Element graph-container not found`);
}

const width = 480;
const height = 600;

container.style.width = `${width}`;
container.style.height = `${height}`;

InternalEvent.disableContextMenu(container);

const graph = new Graph(container);

const parent = graph.getDefaultParent();

const labelHeight = 40;
const margin = 90;
const yOffset = 20;
const top = margin;
const bottom = height - margin - labelHeight;
const left = margin;
const right = width - margin;
const xCenter = width / 2;
const yCenter = (top + bottom) / 2;
const vertexHeight = 140;
const vertexWidth = 0.65 * vertexHeight;

graph.batchUpdate(() => {
    graph.cellsLocked = true;
    graph.cellsSelectable = false;

    const vertexCommon: VertexParametersWithSize = {
        parent,
        size: [vertexWidth, vertexHeight],
    };

    const aParams = centerCoords({
        ...vertexCommon,
        position: [xCenter, top],
        style: {
            image: 'TheKingOfElflandsDaughter.jpg',
            shape: 'image',
        },
    });

    const bParams = centerCoords({
        ...vertexCommon,
        position: [left, yCenter + yOffset],
        style: {
            image: 'The_Lord_of_the_Rings.gif',
            shape: 'image',
        },
    });

    const cParams = centerCoords({
        ...vertexCommon,
        position: [right, yCenter - yOffset],
        size: [vertexHeight, vertexHeight * 0.65],
        style: {
            image: 'TheShadowKingdom-1.png',
            shape: 'image',
            imageBorder: 'black',
        },
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

    const labelVertexCommon: VertexParameters = {
        parent,
        size: [vertexWidth, labelHeight],
        style: {
            fillOpacity: 0,
            strokeOpacity: 0,
            fontColor: 'black',
            verticalAlign: 'top',
        },
    };

    graph.insertVertex({
        ...labelVertexCommon,
        value: [`Lord Dunsany, 1924.`].join('\n'),
        position: below(aParams),
    });

    const bLabel = graph.insertVertex({
        ...labelVertexCommon,
        value: [`JRR Tolkien, 1954-5.`, `Became known as`, `High Fantasy.`].join(
            '\n',
        ),
        position: below(bParams),
    });

    const cLabel = graph.insertVertex({
        ...labelVertexCommon,
        size: [vertexHeight, labelHeight],
        value: [
            `Robert E Howard, 1929.`,
            `Became known as`,
            `Sword and Sorcery.`,
        ].join('\n'),
        position: below(cParams),
    });

    graph.insertVertex({
        ...labelVertexCommon,
        value: [`Glen Cook, 1984.`, `Became known`, `as Grimdark.`].join('\n'),
        position: below(dParams),
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
        source: bLabel,
        target: d,
        style: { ...edgeStyle, sourcePortConstraint: 'south' as any },
    });

    graph.insertEdge({
        parent,
        source: cLabel,
        target: d,
        style: { ...edgeStyle, sourcePortConstraint: 'south' as any },
    });
});
