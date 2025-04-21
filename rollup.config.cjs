const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');

module.exports = {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'cjs',
    },
    plugins: [
        resolve({ extensions: ['.ts', '.js'] }),
        typescript({ compilerOptions: { module: 'esnext' } }),
    ],
    external: [
        'fs/promises',
        'jsdom-global',
        '@resvg/resvg-js',
        'sharp',
        'mime-types',
    ],
};
