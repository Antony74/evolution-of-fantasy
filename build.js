require('esbuild').build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outdir: 'dist',
    treeShaking: true,
    platform: 'node',
    external: ['canvas', 'jsdom', 'jsdom-global', 'prettier'],
});
