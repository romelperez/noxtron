const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { NODE_ENV } = process.env;

const CWD = __dirname;
const TSCONFIG_FILE_PATH = path.join(CWD, 'tsconfig.json');
const SRC_PATH = path.join(CWD, 'src');
const STATIC_PATH = path.join(CWD, 'static');
const BUILD_PATH = path.join(CWD, 'build');

const BASE_PATH = '/play';
const PLAYGROUND_PATH = `${BASE_PATH}/index.html`;
const SANDBOX_PATH = `${BASE_PATH}/sandbox.html`;

module.exports = {
  mode: NODE_ENV || 'development',
  entry: {
    playground: path.join(SRC_PATH, 'playground.tsx'),
    sandbox: path.join(SRC_PATH, 'sandbox.tsx'),
    // TODO: Remove workers dependency.
    /**/
    'monaco.editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
		'monaco.json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
		'monaco.css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
		'monaco.html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
		'monaco.ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
    /**/
  },
  output: {
    path: path.join(BUILD_PATH, BASE_PATH),
    filename: 'e2e-[name].js',
    publicPath: BASE_PATH,
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
      // TODO: Remove building loader dependencies.
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
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: BASE_PATH,
      template: path.join(SRC_PATH, 'playground.html'),
      filename: path.join(BUILD_PATH, PLAYGROUND_PATH),
      chunks: ['playground']
    }),
    new HtmlWebpackPlugin({
      publicPath: BASE_PATH,
      template: path.join(SRC_PATH, 'sandbox.html'),
      filename: path.join(BUILD_PATH, SANDBOX_PATH),
      chunks: ['sandbox']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: STATIC_PATH,
          to: BUILD_PATH
        }
      ]
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
    port: 9000,
    open: BASE_PATH
  }
};
