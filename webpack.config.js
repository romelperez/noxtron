const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { NODE_ENV } = process.env;
const TSCONFIG_FILE_PATH = path.join(__dirname, 'tsconfig.json');
const SRC_PATH = path.join(__dirname, 'src');
const BUILD_PATH = path.join(__dirname, 'build');

module.exports = {
  mode: NODE_ENV || 'development',
  entry: {
    playground: path.join(SRC_PATH, 'playground/index.tsx'),
    sandbox: path.join(SRC_PATH, 'sandbox/index.tsx')
  },
  output: {
    path: path.join(BUILD_PATH, 'play'),
    filename: '[name].js',
    publicPath: '/play',
    clean: true
  },
  module: {
    // Allow dependencies as expressions. Required for @babel/standalone.
    exprContextCritical: false,
    rules: [
      // Remove the need for Strict ESModules fully specified paths.
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      },
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
        test: /\.md$/i,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: TSCONFIG_FILE_PATH
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: '/play',
      template: path.join(SRC_PATH, 'playground/index.html'),
      filename: path.join(BUILD_PATH, 'play/index.html'),
      chunks: ['playground']
    }),
    new HtmlWebpackPlugin({
      publicPath: '/play',
      template: path.join(SRC_PATH, 'sandbox/index.html'),
      filename: path.join(BUILD_PATH, 'play/sandbox/index.html'),
      chunks: ['sandbox']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'static'),
          to: BUILD_PATH
        }
      ]
    })
  ],
  devServer: {
    static: {
      publicPath: '/play',
      directory: BUILD_PATH,
      watch: true
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/play\/p\//, to: '/play' },
        { from: /^\/play\/c\//, to: '/play' }
      ]
    },
    allowedHosts: 'all',
    compress: true,
    host: '127.0.0.1',
    port: 9000,
    open: '/play'
  }
};
