import { Graph } from '@maxgraph/core';
import { getPrettyXml } from '@maxgraph/core/lib/util/xmlUtils';

export const maxGraphToSvg = (graph: Graph): string => {
    const container = graph.container;

    const orig = container.innerHTML;

    container.querySelectorAll('image').forEach((image) => {
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

    container.innerHTML = orig;

    return xml;
};
