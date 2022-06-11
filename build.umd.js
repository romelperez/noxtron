const path = require('path');
const esbuild = require('esbuild');

const SRC_PATH = path.join(__dirname, 'src');
const BUILD_PATH = path.join(__dirname, 'build/umd');

esbuild
  .build({
    entryPoints: [
      './node_modules/monaco-editor/esm/vs/editor/editor.worker.js',
      './node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js',
      path.join(SRC_PATH, 'umd/monaco.ts'),
      path.join(SRC_PATH, 'umd/playground.ts'),
      path.join(SRC_PATH, 'umd/sandbox.ts')
    ],
    entryNames: '[name]',
    outdir: BUILD_PATH,
    bundle: true,
    format: 'iife',
    minify: true,
    loader: {
      '.ttf': 'file'
    }
  })
  .then((result) => {
    if (result.errors?.length > 0) {
      console.error(result.errors);
    }
    if (result.warnings?.length > 0) {
      console.error(result.warnings);
    }
  });
