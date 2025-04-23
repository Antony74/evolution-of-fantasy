import { resolve } from 'path';
import { UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

const config: UserConfig = {
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'EvolutionOfFantasy',
            fileName: 'index',
            formats: ['cjs'],
        },
        rollupOptions: {
            external: [
                '@resvg/resvg-js',
                'canvas',
                'fs/promises',
                'jsdom',
                'jsdom-global',
                'path',
                'sharp',
            ],
            onwarn(warning, warn) {
                if (
                    warning.code !== 'THIS_IS_UNDEFINED' &&
                    warning.code !== 'EVAL'
                ) {
                    warn(warning);
                }
            },
        },
        minify: false,
        sourcemap: true,
    },
    plugins: [dts({ rollupTypes: true })],
};

export default config;
