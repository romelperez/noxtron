const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;

const CWD = __dirname;
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
    playground: path.join(SRC_PATH, 'playground/playground.js'),
    sandbox: path.join(SRC_PATH, 'sandbox/sandbox.js')
  },
  output: {
    path: path.join(BUILD_PATH, BASE_PATH),
    filename: '[name].js',
    publicPath: BASE_PATH,
    clean: true
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
    static: [
      // Path to the Noxtron code build files.
      {
        publicPath: '/build/',
        directory: path.join(CWD, '../../build')
      },
      {
        publicPath: BASE_PATH,
        directory: BUILD_PATH,
        watch: true
      }
    ],
    allowedHosts: 'all',
    compress: true,
    host: '127.0.0.1',
    port: 4000,
    open: BASE_PATH
  }
};
