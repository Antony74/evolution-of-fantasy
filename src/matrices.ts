export type Point = [number, number];

export type Matrix = [
    [number, number, number],
    [number, number, number],
    [number, number, number],
];

export const multiplyMatrixVector = (matrix: Matrix, vector: Point) => {
    const [x, y] = vector;
    return [
        matrix[0][0] * x + matrix[0][1] * y + matrix[0][2],
        matrix[1][0] * x + matrix[1][1] * y + matrix[1][2],
    ];
};

export const multiplyMatrixMatrix = (A: Matrix, B: Matrix): Matrix => {
    return [
        [
            A[0][0] * B[0][0] + A[0][1] * B[1][0],
            A[0][0] * B[0][1] + A[0][1] * B[1][1],
            A[0][0] * B[0][2] + A[0][1] * B[1][2] + A[0][2],
        ],
        [
            A[1][0] * B[0][0] + A[1][1] * B[1][0],
            A[1][0] * B[0][1] + A[1][1] * B[1][1],
            A[1][0] * B[0][2] + A[1][1] * B[1][2] + A[1][2],
        ],
        [0, 0, 1],
    ];
}

export const translationMatrix = (tx: number, ty: number) => {
    return [
        [1, 0, tx],
        [0, 1, ty],
        [0, 0, 1],
    ];
};

export const rotationMatrix = (angle: number) => {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    return [
        [cosA, -sinA, 0],
        [sinA, cosA, 0],
        [0, 0, 1],
    ];
};
