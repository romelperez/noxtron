const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;

const CWD = __dirname;
const TSCONFIG_FILE_PATH = path.join(CWD, 'tsconfig.json');
const SRC_PATH = path.join(CWD, 'src');
const BUILD_PATH = path.join(CWD, 'build');

// Serve the Noxtron application in the URL base path of "/noxtron/".
// Must be the same as the playground setting "basePath".
// Must end with "/".
const BASE_PATH = '/noxtron/';

module.exports = {
  mode: NODE_ENV || 'development',
  devtool: NODE_ENV === 'production' ? false : 'eval-source-map',
  entry: {
    'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
    'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
    playground: path.join(SRC_PATH, 'playground/playground.tsx'),
    sandbox: path.join(SRC_PATH, 'sandbox/sandbox.tsx')
  },
  output: {
    path: path.join(BUILD_PATH, BASE_PATH),
    filename: '[name].js',
    publicPath: BASE_PATH,
    clean: true
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
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
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: BASE_PATH,
      template: path.join(SRC_PATH, 'playground/playground.html'),
      filename: path.join(BUILD_PATH, BASE_PATH, 'index.html'),
      chunks: ['playground']
    }),
    new HtmlWebpackPlugin({
      publicPath: BASE_PATH,
      template: path.join(SRC_PATH, 'sandbox/sandbox.html'),
      filename: path.join(BUILD_PATH, BASE_PATH, 'sandbox/index.html'),
      chunks: ['sandbox']
    })
  ],
  devServer: {
    static: {
      publicPath: BASE_PATH,
      directory: BUILD_PATH,
      watch: true
    },
    allowedHosts: 'all',
    compress: true,
    host: '127.0.0.1',
    port: 4000,
    open: BASE_PATH
  }
};
