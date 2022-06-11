const path = require('path');
const esbuild = require('esbuild');

const SRC_PATH = path.join(__dirname, 'src');
const BUILD_PATH = path.join(__dirname, 'build/umd');
const isProduction = process.env.NODE_ENV === 'production';

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
    minify: isProduction,
    loader: {
      '.ttf': 'file'
    },
    watch: isProduction
      ? undefined
      : {
          onRebuild(error, result) {
            if (error) console.error('watch build failed:', error);
            else console.log('watch build succeeded:', result);
          }
        }
  })
  .then((result) => {
    console.log(result);

    if (!isProduction) {
      console.log('UMD build is watching...');
    }
  });
