import { Cell, Graph, HierarchicalLayout } from 'maxgraph-core-commonjs';

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

    const size: Vec2 = [90, 70];

    graph.batchUpdate(() => {
        const insertVertex = (value: string) => {
            return graph.insertVertex({ value, size });
        };

        const insertEdge = (source: Cell, target: Cell) => {
            return graph.insertEdge({ source, target });
        };

        const vertexStyle = graph.getStylesheet().getDefaultVertexStyle();
        vertexStyle.shape = 'ellipse';
        vertexStyle.strokeColor = 'black';
        vertexStyle.fillColor = 'none';
        vertexStyle.fontColor = 'black';

        const edgeStyle = graph.getStylesheet().getDefaultEdgeStyle();
        edgeStyle.strokeColor = 'black';

        console.log(JSON.stringify({ vertexStyle, edgeStyle }, null, 4));

        const a = insertVertex(`Lord Dunsany`);
        const b = insertVertex(`JRR Tolkien`);
        const c = insertVertex(`Robert E Howard`);
        const d = insertVertex(`Glen Cook`);

        insertEdge(a, b);
        insertEdge(a, c);
        insertEdge(b, d);
        insertEdge(c, d);
    });

    const layout = new HierarchicalLayout(graph);
    layout.execute(graph.getDefaultParent());

    return graph;
};
