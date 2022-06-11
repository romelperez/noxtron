![Noxtron](https://raw.githubusercontent.com/romelperez/noxtron/main/noxtron.jpg)

# Noxtron

[![version](https://img.shields.io/npm/v/noxtron.svg)](https://npmjs.org/package/noxtron)
[![ci](https://github.com/romelperez/noxtron/workflows/ci/badge.svg)](https://github.com/romelperez/noxtron/actions)
[![downloads](https://img.shields.io/npm/dm/noxtron.svg)](https://npmjs.org/package/noxtron)
[![github stars](https://img.shields.io/github/stars/romelperez/noxtron.svg?style=social&label=stars)](https://github.com/romelperez/noxtron)
[![license](https://img.shields.io/github/license/romelperez/noxtron.svg?maxAge=2592000)](https://github.com/romelperez/noxtron/blob/main/LICENSE)

Real-Time JavaScript/TypeScript UI playground.

Noxtron is a web tool to explore, preview, and test JavaScript and TypeScript
components as isolated sandboxes in realtime in browser. It is composed by two
applications, a playground app with the interface to explore and control the
configured sandboxes, and a sandbox app to execute the sandboxes source code.

## Demos

- **Arwes Playground**
  - Technologies: [Webpack](https://webpack.js.org), TypeScript, [React](https://reactjs.org).
  - [Preview](https://next.arwes.dev/play).
  - [Source Code](https://github.com/arwes/arwes).

## Examples

- **examples/basic**
  - Technologies: JavaScript.
  - [Soure code](https://github.com/romelperez/noxtron/tree/main/examples/basic).
- **examples/react**
  - Technologies: [Webpack](https://webpack.js.org), TypeScript, [React](https://reactjs.org) v17.
  - [Soure code](https://github.com/romelperez/noxtron/tree/main/examples/react).
- **examples/solid**
  - Technologies: [ESBuild](https://esbuild.github.io), JavaScript, [SolidJS](https://www.solidjs.com).
  - [Soure code](https://github.com/romelperez/noxtron/tree/main/examples/solid).

## Features

- It uses the [monaco-editor](https://microsoft.github.io/monaco-editor), and it
  requires different HTML and JavaScript files, so it needs to be configured with
  a module bundler like [Webpack](https://webpack.js.org) or [ESBuild](https://esbuild.github.io).
- Only the playground app requires external libraries. The sandbox app
  does not require any library or framework so it is very small.
- The sandboxes source code should be written in ES modules. The sandbox app can
  be setup to allow packages to be imported via `import` in the sandboxes source code.
- For TypeScript sandboxes, the packages type definitions need to be provided as
  JavaScript strings. Since the editor, JavaScript transpiler, and TypeScript transpiler
  are in browser, there is no way to access the file system. There are tools like
  [@microsoft/api-extractor](https://www.npmjs.com/package/@microsoft/api-extractor),
  [dts-bundle-generator](https://www.npmjs.com/package/dts-bundle-generator), or
  [npm-dts](https://www.npmjs.com/package/npm-dts) to generate type definitions
  in a single file so it can be imported easily.
- The sandboxes source code will be transpiled to ES2015 using the TypeScript
  transpiler provided by [monaco-editor](https://microsoft.github.io/monaco-editor).
- The editor transpiler will only throw for syntax errors. Type errors will
  only be shown in the interface.
- The JavaScript and TypeScript transpilers are configured to use JSX or TSX
  with React by default if needed. The directive `/** @jsx XXX */` can be used inline.
- The playground app can be used in two modes.
  - In "predefined" mode, it will show an specific sandbox configured in build time.
    The sandbox source code can be edited but it will not be persisted in the
    browser URL.
  - In "custom" mode, the sandbox will use the current source code in the editor.
    Since it is persisted in the browser URL, it could generate a long one.
- The playground app will persist in the browser URL the state of the controls
  and the source code of the sandbox so it can be easily shared with more people.
- The editor is not editable in mobile browsers. But the app can be used in mobile.
- The toolbar options are not available in mobile browsers.
- The playground app final bundles can have 5MB or more due to the JavaScript
  and TypeScript transpilers, the type definitions, and provided sandboxes source code.
  The sandbox app will depend only on user setup.
- There are no provided tools to format, lint, and test sandboxes source code in
  CI environments.

## Example Use Case

Noxtron use case with plain JavaScript and Webpack.

### Installation

Using [Node.js](https://nodejs.org) v16.14 LTS, in an empty folder:

```bash
# Create the following file structure:
mkdir src
touch src/playground.html
touch src/playground.js
touch src/sandbox.html
touch src/sandbox.js
touch webpack.config.js

# create package.json
npm init -y

# install peer dependencies
npm i monaco-editor@^0.33

# install noxtron
npm i noxtron
```

### Bundler Setup

The Webpack loader [monaco-editor-webpack-plugin](https://npmjs.com/package/monaco-editor-webpack-plugin)
can be used to simplify the setup of [monaco-editor](https://microsoft.github.io/monaco-editor).
But it can be configured otherwise. See [monaco examples](https://github.com/microsoft/monaco-editor/tree/main/samples).

```bash
# install webpack and development server
npm i webpack@5 webpack-cli@4 webpack-dev-server@4

# install webpack loaders
npm i css-loader@6 style-loader@3 html-webpack-plugin@5 monaco-editor-webpack-plugin@7
```

```js
// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const SRC_PATH = path.join(__dirname, 'src');
const BUILD_PATH = path.join(__dirname, 'build');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: false,
  entry: {
    playground: path.join(SRC_PATH, 'playground.js'),
    sandbox: path.join(SRC_PATH, 'sandbox.js')
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  module: {
    rules: [
      // CSS files required for monaco-editor.
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new MonacoWebpackPlugin({
      // Only JavaScript and TypeScript are supported in Noxtron.
      languages: ['javascript', 'typescript']
    }),
    new HtmlWebpackPlugin({
      template: path.join(SRC_PATH, 'playground.html'),
      filename: path.join(BUILD_PATH, 'index.html'),
      chunks: ['playground']
    }),
    new HtmlWebpackPlugin({
      template: path.join(SRC_PATH, 'sandbox.html'),
      filename: path.join(BUILD_PATH, 'sandbox.html'),
      chunks: ['sandbox']
    })
  ],
  // webpack-dev-server can be changed for a simpler server like:
  // https://www.npmjs.com/package/http-server
  devServer: {
    static: {
      directory: BUILD_PATH,
      watch: true
    },
    allowedHosts: 'all',
    compress: true,
    host: '127.0.0.1',
    port: 4000,
    open: '/'
  }
};
```

### Playground Setup

The playground application shows the explorer and controls of the sandboxes configured.
Only an HTML element with id "root" is required.

```html
<!-- src/playground.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Noxtron Playground</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

```js
// src/playground.js

import React from 'react';
import { render } from 'react-dom';
import { Playground } from 'noxtron/build/cjs/playground';

const settings = {
  // Where the Noxtron apps will be served.
  basePath: '/',

  // The build "playground.html" file. In this case, the "/index.html".
  playgroundPath: '/',

  // The build "sandbox.html" file. In this case, the "sandbox.html".
  sandboxPath: '/sandbox.html',

  // "javascript" | "typescript"
  codeLanguage: 'javascript',

  // Sandboxes source code.
  // They can use only packages provided by the sandbox app.
  // In this case, "react" and "react-dom" are available to use.
  sandboxes: [
    {
      name: 'ComponentA',
      children: [
        {
          name: 'sandbox1',
          code: `import React from 'react';
import { render } from 'react-dom';
const Sandbox = () => <h1 style={{ color: 'yellow' }}>My Sandbox 1</h1>;
render(<Sandbox />, document.querySelector('#root'));
`
        },
        {
          name: 'sandbox2',
          code: `import React from 'react';
import { render } from 'react-dom';
const Sandbox = () => <h1 style={{ color: 'magenta' }}>My Sandbox 2</h1>;
render(<Sandbox />, document.querySelector('#root'));
`
        }
        // ...
      ]
    }
  ],
  title: {
    mobile: 'MyOrg',
    desktop: 'My Organization'
  }
};

render(
  React.createElement(Playground, { settings }),
  document.querySelector('#root')
);
```

### Sandbox Setup

The sandbox app executes the actual code.

```html
<!-- src/sandbox.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Noxtron Sandbox</title>
  </head>
  <body>
    <!-- Since the sandboxes are going to use React, create a root element. -->
    <div id="root"></div>
  </body>
</html>
```

Only the dependencies provided to the sandbox can be used in the sandboxes
source code.

```js
// src/sandbox.js

import { setupSandbox } from 'noxtron/build/cjs/sandbox';
import React from 'react';
import ReactDOM from 'react-dom';

setupSandbox({
  // Only the packages dependencies provided here can be used in the sandboxes
  // source code as `import`s.
  dependencies: [
    { name: 'react', pkg: React },
    { name: 'react-dom', pkg: ReactDOM }
  ]
});
```

### Workflow

NPM scripts can be used to setup the application workflow tasks. For a production
environment, a server like [http-server](https://www.npmjs.com/package/http-server)
can be used.

```bash
npm i http-server
```

`package.json` scripts:

```json
{
  "scripts": {
    "clean": "rm -rf ./build",
    "build": "NODE_ENV=production webpack --progress",
    "dev": "webpack serve",
    "start": "http-server ./build --port 4000 --gzip true -o /"
  }
}
```

```bash
# for development environment
npm run dev

# for production environment
npm run clean
npm run build
npm run start
```

There is a complete end-to-end example use case using TypeScript, React, and
Webpack in [examples/webpack](https://github.com/romelperez/noxtron/tree/main/examples/webpack).

## About

Noxtron's logo is a photo of a bird named Ninfa Coronada endemic from Colombia.
Source: [birdsofcolombia.com](https://birdsofcolombia.com).
