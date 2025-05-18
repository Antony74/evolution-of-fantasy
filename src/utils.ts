import { VertexParameters } from '@maxgraph/core';

export type Vec2 = [number, number];

export const vecSub = (a: Vec2, b: Vec2): Vec2 => {
    return [a[0] - b[0], a[1] - b[1]];
};

export const vecDiv = (vec: Vec2, divisor: number): Vec2 => {
    return [vec[0] / divisor, vec[1] / divisor];
};

export type VertexParametersWithCoords = VertexParameters & {
    size: Vec2;
    position: Vec2;
};

export type VertexParametersWithSize = VertexParameters & {
    size: Vec2;
};

export const centerCoords = (
    params: VertexParametersWithCoords,
): VertexParametersWithCoords => {
    // Why can't I find a style to do this?
    return {
        ...params,
        position: vecSub(params.position, vecDiv(params.size, 2)),
    };
};

export const below = ({
    position,
    size,
}: {
    position: Vec2;
    size: Vec2;
}): Vec2 => {
    return [position[0], position[1] + size[1]];
};
