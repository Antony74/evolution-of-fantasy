import {
    Cell,
    Graph,
    HierarchicalLayout,
    RadialTreeLayout,
} from 'maxgraph-core-commonjs';

import { Vec2 } from './utils';

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
        const insertVertex = (value: string) => {
            const vertex = graph.insertVertex({
                value,
                size,
            });
            return vertex;
        };

        const insertEdge = (source: Cell, target: Cell) => {
            return graph.insertEdge({ source, target });
        };

        const vertexStyle = graph.getStylesheet().getDefaultVertexStyle();
        vertexStyle.shape = 'ellipse';
        vertexStyle.perimeter = 'ellipsePerimeter';
        vertexStyle.strokeColor = 'black';
        vertexStyle.fillColor = 'none';
        vertexStyle.fontColor = 'black';

        const edgeStyle = graph.getStylesheet().getDefaultEdgeStyle();
        edgeStyle.strokeColor = 'black';

        const [a, b, c, d] = [
            `Lord Dunsany`,
            `JRR Tolkien`,
            `Robert E Howard`,
            `Glen Cook`,
        ].map(insertVertex);

        const insertEdges = () => {
            insertEdge(a, b);
            insertEdge(a, c);
            insertEdge(b, d);
            insertEdge(c, d);
        };

        insertEdges();

        const layout = new HierarchicalLayout(graph);
        layout.execute(graph.getDefaultParent());

        // That's done something to my edges, replace them.
        graph.removeCells(graph.getChildEdges(graph.defaultParent!));
        insertEdges();

        // vertices.forEach(vertex => console.log(vertex.geometry?.getPoint()))
    });

    return graph;
};
