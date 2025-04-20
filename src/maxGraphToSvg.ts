import { Graph } from '@maxgraph/core';
import mime from 'mime-types';
import fsp from 'fs/promises';
import imageToBase64 from 'image-to-base64';

export type MaxGraphToSvgOptions = {
    inlineImages?: boolean;
};

export const maxGraphToSvg = async (
    graph: Graph,
    options?: MaxGraphToSvgOptions,
): Promise<string> => {
    const inlineImages: boolean =
        (options ?? { inlineImages: false }).inlineImages ?? false;

    const container = graph.container;

    const orig = container.innerHTML;

    if (inlineImages) {
        const images = Array.from(container.querySelectorAll('image'));

        for (const image of images) {
            let path = image.getAttribute('xlink:href') ?? '';

            let isFile = false;

            try {
                const url = new URL(path);
                isFile = url.protocol === 'file:';
            } catch (_e) {}

            if (isFile) {
                path = path.slice(7);
            }

            const mimeType = mime.lookup(path);
            const contentType = mimeType ? mimeType : '';
            const content = await imageToBase64(path);

            const newUrl = `data:${contentType};base64, ${content}`;

            image.setAttribute('xlink:href', newUrl);
        }
    }

    const svg = container.firstElementChild!;

    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

    const xml = [
        `<?xml version="1.0" standalone="no"?>`,
        `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`,
        container.innerHTML,
    ].join('\n');

    container.innerHTML = orig;

    return xml;
};
