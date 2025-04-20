import { CellStyle, Graph, VertexParameters } from '@maxgraph/core';

import { below, centerCoords, VertexParametersWithSize } from './utils';

export const createEvolutionOfFantasyGraph = (
    container: HTMLElement,
    width: number,
    height: number,
    imageLocation: string,
): Graph => {
    container.style.width = `${width}`;
    container.style.height = `${height}`;

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
                image: `${imageLocation}/TheKingOfElflandsDaughter.jpg`,
                shape: 'image',
            },
        });

        const bParams = centerCoords({
            ...vertexCommon,
            position: [left, yCenter + 20],
            style: {
                image: `${imageLocation}/The_Lord_of_the_Rings.gif`,
                shape: 'image',
            },
        });

        const cParams = centerCoords({
            ...vertexCommon,
            position: [right, yCenter + 10],
            size: [vertexHeight, vertexHeight * 0.65],
            style: {
                image: `${imageLocation}/TheShadowKingdom-1.png`,
                shape: 'image',
                imageBorder: 'black',
            },
        });

        const dParams = centerCoords({
            ...vertexCommon,
            position: [xCenter, bottom],
            size: [0.6 * vertexHeight, vertexHeight],
            style: {
                image: `${imageLocation}/The_Black_Company.jpg`,
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
            value: [`Glen Cook, 1984.`, `Became known`, `as Grimdark.`].join(
                '\n',
            ),
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

    return graph;
};
