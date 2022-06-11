const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CWD = __dirname;
const UMD_PATH = path.join(CWD, '../../build/umd');
const SRC_PATH = path.join(CWD, 'src');
const BUILD_PATH = path.join(CWD, 'build');
// Serve the Noxtron applications in this URL base path.
// Must be the same as the playground setting "basePath".
const BASE_PATH = '/noxtron/';
const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

module.exports = {
  mode,
  devtool: isProduction ? false : 'eval-source-map',
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
    }),
    isProduction &&
      new CopyWebpackPlugin({
        patterns: [
          {
            from: UMD_PATH,
            to: path.join(BUILD_PATH, BASE_PATH, 'umd'),
            // Skip files minimization.
            info: { minimized: true }
          }
        ]
      })
  ].filter(Boolean),
  devServer: {
    static: [
      {
        directory: UMD_PATH,
        publicPath: path.join(BASE_PATH, 'umd'),
        watch: true
      },
      {
        directory: BUILD_PATH,
        publicPath: BASE_PATH,
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
