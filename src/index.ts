import {
    CellStyle,
    Graph,
    InternalEvent,
    VertexParameters,
} from '@maxgraph/core';
import { below, centerCoords, VertexParametersWithSize } from './utils';
import { getPrettyXml } from '@maxgraph/core/lib/util/xmlUtils';

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

const labelHeight = 55;
const margin = 110;

const top = margin - 5;
const bottom = height - margin - labelHeight + 10;
const left = margin - 35;
const right = width - margin + 10;

const xCenter = width / 2;
const yCenter = (top + bottom) / 2;
const vertexHeight = 180;
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
        position: [left, yCenter + 20],
        style: {
            image: 'The_Lord_of_the_Rings.gif',
            shape: 'image',
        },
    });

    const cParams = centerCoords({
        ...vertexCommon,
        position: [right, yCenter + 10],
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
        size: [0.6 * vertexHeight, vertexHeight],
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
            fontSize: 14,
        },
    };

    graph.insertVertex({
        ...labelVertexCommon,
        value: [`Lord Dunsany, 1924.`].join('\n'),
        position: below(aParams),
    });

    const bLabel = graph.insertVertex({
        ...labelVertexCommon,
        value: [
            `JRR Tolkien, 1954-5.`,
            `Became known as`,
            `High Fantasy.`,
        ].join('\n'),
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

    const north = 'north' as any;
    const east = 'east' as any;
    const south = 'south' as any;
    const west = 'west' as any;

    graph.insertEdge({
        parent,
        source: a,
        target: b,
        style: {
            ...edgeStyle,
            sourcePortConstraint: west,
            targetPortConstraint: north,
        },
    });

    graph.insertEdge({
        parent,
        source: a,
        target: c,
        style: {
            ...edgeStyle,
            sourcePortConstraint: east,
            targetPortConstraint: north,
        },
    });

    graph.insertEdge({
        parent,
        source: bLabel,
        target: d,
        style: {
            ...edgeStyle,
            sourcePortConstraint: south,
            targetPortConstraint: west,
        },
    });

    graph.insertEdge({
        parent,
        source: cLabel,
        target: d,
        style: {
            ...edgeStyle,
            sourcePortConstraint: south,
            targetPortConstraint: east,
        },
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('download-button');

    if (button) {
        button.addEventListener('click', () => {
            const orig = container.innerHTML;

            document.querySelectorAll('image').forEach((image) => {
                const url = new URL(image.getAttribute('xlink:href') ?? '');
                const newUrl = `./static${url.pathname}`;
                image.setAttribute('xlink:href', newUrl);
            });

            const svg = container.firstElementChild!;

            svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

            const xml = [
                `<?xml version="1.0" standalone="no"?>`,
                `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`,
                getPrettyXml(container.firstElementChild),
            ].join('\n');

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
            container.innerHTML = orig;
        });
    }
});
