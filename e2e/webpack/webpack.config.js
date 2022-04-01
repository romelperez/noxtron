const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { NODE_ENV } = process.env;

const CWD = __dirname;
const TSCONFIG_FILE_PATH = path.join(CWD, 'tsconfig.json');
const REPO_PATH = path.join(CWD, '../../');
const SRC_PATH = path.join(CWD, 'src');
const BUILD_PATH = path.join(CWD, 'build');

const BASE_PATH = '/play';
const PLAYGROUND_PATH = `${BASE_PATH}/index.html`;
const SANDBOX_PATH = `${BASE_PATH}/sandbox.html`;

module.exports = {
  mode: NODE_ENV || 'development',
  devtool: false,
  entry: {
    playground: path.join(SRC_PATH, 'playground/playground.tsx'),
    sandbox: path.join(SRC_PATH, 'sandbox/sandbox.tsx'),

    // Monaco editor web workers.
    'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
    'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js'
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
      filename: path.join(BUILD_PATH, PLAYGROUND_PATH),
      chunks: ['playground']
    }),
    new HtmlWebpackPlugin({
      publicPath: BASE_PATH,
      template: path.join(SRC_PATH, 'sandbox/sandbox.html'),
      filename: path.join(BUILD_PATH, SANDBOX_PATH),
      chunks: ['sandbox']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(REPO_PATH, 'static'),
          to: BUILD_PATH
        }
      ]
    })
  ],
  devServer: {
    static: {
      publicPath: '/',
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
