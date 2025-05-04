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
        endArrow: 'classic',
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

    const size: Vec2 = [130, 100];

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

        const [
            KingArthur,
            Dunsany,
            Howard,
            Tolkien,
            Cook,
            Anderson,
            Moorcock,
            Cherryh,
            LeGuin,
            Narnia,
            Norton,
        ] = [
            'King Arthur\n(trad.)',
            'Lord Dunsany',
            'Robert E. Howard\n(The Shadow Kingdom)',
            'J.R.R. Tolkien\n(The Lord of the Rings)',
            'Glen Cook\n(The Black Company)',
            'Poul Anderson\n(The Broken Sword)',
            'Moorcock\n(Elric Novels)',
            'C.J. Cherryh\n(Morgaine Trilogy)',
            'Ursula K. Le Guin\n(Earthsea)',
            'C.S. Lewis\n(Narnia)',
            'Andre Norton\n(Witch World)',
        ].map(insertVertex);

        const insertEdges = () => {
            const edges: [Cell, Cell][] = [
                [KingArthur, Dunsany],
                [Dunsany, Tolkien],
                [Dunsany, Howard],
                [Tolkien, Cook],
                [Howard, Cook],
                [Anderson, Moorcock],
                [Anderson, Cherryh], // [penwidth=3]; // bold
                [Tolkien, Cherryh], // [color=gray];  // lighter
                [Anderson, LeGuin], // [color=gray];  // lighter
                [Tolkien, LeGuin], // [penwidth=3];   // bold
                [KingArthur, Narnia],
                [Dunsany, Narnia],
                [Tolkien, Narnia], // [style=dotted];
                [Tolkien, Norton], // [color=gray];   // lighter
                [KingArthur, Norton], // [penwidth=3]; // darker
                [Howard, Moorcock],
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
