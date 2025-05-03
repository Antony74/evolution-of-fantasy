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
        const insertVertex = (value: string, x: number, y: number) => {
            const vertex = graph.insertVertex({
                value,
                size,
                position: [x, y],
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
        edgeStyle.align = undefined;
        edgeStyle.fontColor = undefined;
        edgeStyle.verticalAlign = undefined;

        console.log(JSON.stringify({ vertexStyle, edgeStyle }, null, 4));

        const a = insertVertex(`Lord Dunsany`, 60, 0);
        const b = insertVertex(`JRR Tolkien`, 120, 190);
        const c = insertVertex(`Robert E Howard`, 0, 190);
        const d = insertVertex(`Glen Cook`, 60, 380);

        insertEdge(a, b);
        insertEdge(a, c);
        insertEdge(b, d);
        insertEdge(c, d);

        // const layout = new HierarchicalLayout(graph);
        // layout.execute(graph.getDefaultParent());

        // vertices.forEach(vertex => console.log(vertex.geometry?.getPoint()))
    });

    return graph;
};
