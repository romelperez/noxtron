const path = require('path');
const esbuild = require('esbuild');

const { NODE_ENV } = process.env;
const SRC_PATH = path.join(__dirname, 'src');
const BUILD_PATH = path.join(__dirname, 'build');

const isProduction = NODE_ENV === 'production';

/**
 * @type {import ('esbuild').BuildOptions} opts
 */
const buildOptions = {
  entryPoints: [
    '../../node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js',
    '../../node_modules/monaco-editor/esm/vs/editor/editor.worker.js',
    path.join(SRC_PATH, 'playground/playground.js'),
    path.join(SRC_PATH, 'sandbox/sandbox.js')
  ],
  entryNames: '[name]',
  outdir: path.join(BUILD_PATH, 'noxtron'),
  bundle: true,
  format: 'iife',
  minify: isProduction,
  loader: {
    '.ttf': 'file'
  }
};

if (isProduction) {
  esbuild.build(buildOptions).then((result) => {
    if (result.errors?.length > 0) {
      console.error(result.errors);
    }
    if (result.warnings?.length > 0) {
      console.error(result.warnings);
    }
  });
} else {
  esbuild
    .serve(
      {
        host: '0.0.0.0',
        port: 4000,
        servedir: BUILD_PATH,
        onRequest: ({ remoteAddress, method, path, status, timeInMS }) =>
          console.log(remoteAddress, method, status, `${timeInMS}ms`, path)
      },
      buildOptions
    )
    .then(({ host, port }) =>
      console.log(`Serving at http://${host}:${port}...`)
    );
}
