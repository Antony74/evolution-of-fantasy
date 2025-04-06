import { VertexParameters } from '@maxgraph/core';

type Vec2 = [number, number];

export const vecSub = (a: Vec2, b: Vec2): Vec2 => {
    return [a[0] - b[0], a[1] - b[1]];
};

export const vecDiv = (vec: Vec2, divisor: number): Vec2 => {
    return [vec[0] / divisor, vec[1] / divisor];
};

export const centerCoords = ({
    position,
    size,
    ...params
}: VertexParameters): VertexParameters => {
    // Why can't I find a style to do this?
    if (position && size) {
        return {
            ...params,
            size,
            position: vecSub(position, vecDiv(size, 2)),
        };
    } else {
        return { ...params, size, position };
    }
};
