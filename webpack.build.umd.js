const path = require('path');

const { NODE_ENV } = process.env;

const CWD = __dirname;
const TSCONFIG_FILE_PATH = path.join(CWD, 'tsconfig.build.umd.json');
const SRC_PATH = path.join(CWD, 'src/');
const BUILD_PATH = path.join(CWD, 'build/umd/');

module.exports = {
  mode: NODE_ENV || 'development',
  devtool: NODE_ENV === 'production' ? false : 'eval-source-map',
  entry: {
    'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
    'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
    playground: path.join(SRC_PATH, 'umd/playground.tsx'),
    sandbox: path.join(SRC_PATH, 'umd/sandbox.tsx')
  },
  output: {
    path: BUILD_PATH,
    publicPath: BUILD_PATH,
    filename: '[name].js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    // Remove code splitting.
    parser: {
      javascript: {
        dynamicImportMode: 'eager'
      }
    },
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: TSCONFIG_FILE_PATH,
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
