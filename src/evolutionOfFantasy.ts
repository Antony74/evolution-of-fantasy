import {
    CellStyle,
    EdgeStyle,
    Graph,
    HierarchicalLayout,
    VertexParameters,
} from 'maxgraph-core-commonjs';

import { centerCoords, VertexParametersWithSize } from './utils';

export const createEvolutionOfFantasyGraph = (
    container: HTMLElement,
    width: number,
    height: number,
    _imageLocation: string,
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
            style: {
                shape: 'ellipse',
                fillColor: 'none',
                strokeColor: 'black',
            },
        };

        const a = graph.insertVertex(
            centerCoords({
                ...vertexCommon,
                position: [xCenter, top],
                value: `Lord Dunsany`,
            }),
        );

        const b = graph.insertVertex(
            centerCoords({
                ...vertexCommon,
                position: [left, yCenter + 20],
                value: `JRR Tolkien`,
            }),
        );

        const c = graph.insertVertex(
            centerCoords({
                ...vertexCommon,
                position: [right, yCenter + 10],
                size: [vertexHeight, vertexHeight * 0.65],
                value: `Robert E Howard`,
            }),
        );

        const d = graph.insertVertex(
            centerCoords({
                ...vertexCommon,
                position: [xCenter, bottom],
                size: [0.6 * vertexHeight, vertexHeight],
                value: `Glen Cook`,
            }),
        );

        const edgeStyle = graph.getStylesheet().getDefaultEdgeStyle();
        edgeStyle.strokeColor = 'black';

        // const edgeStyle: CellStyle = {};
        //     edgeStyle: null,
        //     strokeColor: 'black',
        //     endArrow: 'block',
        //     curved: false,
        //     segment: 1,
        // };

        // edgeStyle['edgeStyle'] = EdgeStyle.ElbowConnector; // or null for straight
        // edgeStyle['shape'] = 'connector';
        // edgeStyle['endArrow'] = 'classic';
        // edgeStyle['strokeColor'] = '#000000';
        // edgeStyle['rounded'] = false;
        // edgeStyle['exitX'] = 0.5; // Ensures edge exits center horizontally
        // edgeStyle['exitY'] = 1.0; // Exits at bottom
        // edgeStyle['exitPerimeter'] = true;
        // edgeStyle['entryX'] = 0.5; // Enters at top center
        // edgeStyle['entryY'] = 0;
        // edgeStyle['entryPerimeter'] = true;

        graph.insertEdge({
            parent,
            source: a,
            target: b,
        });

        graph.insertEdge({
            parent,
            source: a,
            target: c,
        });

        graph.insertEdge({
            parent,
            source: b,
            target: d,
        });

        graph.insertEdge({
            parent,
            source: c,
            target: d,
        });
    });

    const layout = new HierarchicalLayout(graph);
    layout.execute(graph.getDefaultParent());

    return graph;
};
