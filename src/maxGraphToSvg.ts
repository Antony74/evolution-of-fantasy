import { Graph } from '@maxgraph/core';
import prettier from 'prettier';

export const maxGraphToSvg = async (graph: Graph): Promise<string> => {
    const container = graph.container;

    const orig = container.innerHTML;

    container.querySelectorAll('image').forEach((image) => {
        const url = new URL(image.getAttribute('xlink:href') ?? '');
        const newUrl = `./static${url.pathname}`;
        image.setAttribute('xlink:href', newUrl);
    });

    const svg = container.firstElementChild!;

    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

    const xml = [
        `<?xml version="1.0" standalone="no"?>`,
        `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`,
        container.innerHTML,
    ].join('\n');

    container.innerHTML = orig;

    return prettier.format(xml, {
        plugins: ['@prettier/plugin-xml'],
        parser: 'xml',
        tabWidth: 4,
        singleQuote: true,
    });
};
