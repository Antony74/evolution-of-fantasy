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
        typescript({
            compilerOptions: {
                module: 'esnext',
                esModuleInterop: true,
                allowSyntheticDefaultImports: true,
            },
        }),
    ],
    external: [
        'fs/promises',
        'jsdom-global',
        '@resvg/resvg-js',
        'sharp',
        'mime-types',
    ],
    onwarn(warning, warn) {
        if (warning.code !== 'THIS_IS_UNDEFINED' && warning.code !== 'EVAL') {
            warn(warning);
        }
    },
};
