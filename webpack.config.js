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
    sandbox: path.join(SRC_PATH, 'sandbox/index.tsx'),
    'monaco.editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
		'monaco.json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
		'monaco.css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
		'monaco.html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
		'monaco.ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
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
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.ttf$/,
				use: ['file-loader']
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
    ],
    alias: {
      '@src': SRC_PATH
    }
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
    allowedHosts: 'all',
    compress: true,
    host: '127.0.0.1',
    port: 9000,
    open: '/play'
  }
};
