import {
    Cell,
    Graph,
    HierarchicalLayout,
    Stylesheet,
} from 'maxgraph-core-commonjs';

import { Vec2 } from './utils';

const approximateGraphVizDefaultStyle = (stylesheet: Stylesheet) => {
    stylesheet.putDefaultVertexStyle({
        shape: 'ellipse',
        perimeter: 'ellipsePerimeter',
        strokeColor: 'black',
        fillColor: 'none',
        fontColor: 'black',
    });

    stylesheet.putDefaultEdgeStyle({
        strokeColor: 'black',
    });
};

export const createEvolutionOfFantasyGraph = (
    container: HTMLElement,
    width: number,
    height: number,
    _imageLocation: string,
): Graph => {
    container.style.width = `${width}`;
    container.style.height = `${height}`;

    const graph = new Graph(container);

    const size: Vec2 = [90, 90];

    graph.batchUpdate(() => {
        approximateGraphVizDefaultStyle(graph.getStylesheet());

        const insertVertex = (value: string) => {
            const vertex = graph.insertVertex({
                value,
                size,
            });
            return vertex;
        };

        const insertEdge = ([source, target]: [Cell, Cell]) => {
            return graph.insertEdge({ source, target });
        };

        const [dunsany, tolkien, howard, cook] = [
            `Lord Dunsany`,
            `JRR Tolkien`,
            `Robert E Howard`,
            `Glen Cook`,
        ].map(insertVertex);

        const insertEdges = () => {
            const edges: [Cell, Cell][] = [
                [dunsany, tolkien],
                [dunsany, howard],
                [tolkien, cook],
                [howard, cook],
            ];

            edges.map(insertEdge);
        };

        insertEdges();

        const layout = new HierarchicalLayout(graph);
        layout.execute(graph.getDefaultParent());

        // That layout has done something to my edges!  Replace them.
        graph.removeCells(graph.getChildEdges(graph.defaultParent!));
        insertEdges();
    });

    return graph;
};
