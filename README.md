![Noxtron](https://raw.githubusercontent.com/romelperez/noxtron/v0.7.3/noxtron.jpg)

# Noxtron

[![version](https://img.shields.io/npm/v/noxtron.svg)](https://npmjs.org/package/noxtron)
[![ci](https://github.com/romelperez/noxtron/workflows/ci/badge.svg)](https://github.com/romelperez/noxtron/actions)
[![downloads](https://img.shields.io/npm/dm/noxtron.svg)](https://npmjs.org/package/noxtron)
[![github stars](https://img.shields.io/github/stars/romelperez/noxtron.svg?style=social&label=stars)](https://github.com/romelperez/noxtron)
[![license](https://img.shields.io/github/license/romelperez/noxtron.svg?maxAge=2592000)](https://github.com/romelperez/noxtron/blob/v0.7.3/LICENSE)

Real-Time JavaScript/TypeScript UI playground.

Noxtron is a configurable web tool to explore, preview, and test JavaScript and
TypeScript components as isolated sandboxes in realtime in browser. It is composed
by two applications, a playground app with the interface to explore and control
predefined sandboxes, and a sandbox app to execute the sandboxes source code.

## Demos

- **Arwes Playground**
  - Technologies: [Webpack](https://webpack.js.org), TypeScript, [React](https://reactjs.org).
  - [Preview](https://next.arwes.dev/play).
  - [Source Code](https://github.com/arwes/arwes).

## Examples

- **examples/basic**
  - Technologies: JavaScript.
  - [Soure code](https://github.com/romelperez/noxtron/tree/v0.7.3/examples/basic).
- **examples/react**
  - Technologies: [Webpack](https://webpack.js.org), TypeScript, [React](https://reactjs.org).
  - [Soure code](https://github.com/romelperez/noxtron/tree/v0.7.3/examples/react).
- **examples/solid**
  - Technologies: [ESBuild](https://esbuild.github.io), JavaScript, [SolidJS](https://www.solidjs.com).
  - [Soure code](https://github.com/romelperez/noxtron/tree/v0.7.3/examples/solid).

## Features

- It is consumed using UMD distribution files for the browser. No bundler is needed.
  But it is required to have two HTML entry files, one for the playground app and
  another for the sandbox app. Each file will have to import their respective libraries.
- It uses the [monaco-editor](https://microsoft.github.io/monaco-editor) to render,
  edit, and transpile the source code in JavaScript and TypeScript respectively.
- Since the editor and transpilers have large file sizes, they are loaded dynamically.
  Because the configured sandboxes source codes and type definitions may also take
  a large file size, it is recommended to lazy load them using [code splitting](https://webpack.js.org/guides/code-splitting).

### Applications

- Latest versions of Chrome, Firefox, and Safari browsers supported for mobile and
  desktop from 360px viewport width.
- The playground app will persist in the browser URL the state of the controls
  and the source code of the sandbox so it can be easily shared with more people.
- The playground app can be used in two modes.
  - In "predefined" mode, it will show a specific configured sandbox.
    The sandbox source code can be edited but it will not be persisted in the
    browser URL.
  - In "custom" mode, the sandbox app will use the current editor source code
    and it will be persisted in the URL.
    (See [Maximum length of a URL in different browsers](https://www.geeksforgeeks.org/maximum-length-of-a-url-in-different-browsers).)
- The JavaScript and TypeScript transpilers will only throw for syntax errors.
  Type errors will only be shown in the interface.
- The editor is read only for mobile browsers.
- The toolbar controls are not available for mobile browsers.

### Sandboxes

A sandbox is a named code snippet which represents an independent and isolated
functionality use case.

- The sandboxes source codes should be written in ES2018 and ES modules. They
  will be transpiled to ES2015 using the JavaScript or TypeScript transpiler respectively.
- The sandbox app can be setup to allow certain packages to be imported via `import`
  in the sandboxes source code. For example:
  - External packages such as [React](https://reactjs.org) and [Solid](https://www.solidjs.com).
  - Application packages such as design system components or business logic functionalities.
- For TypeScript sandboxes, the packages type definitions need to be provided as
  JavaScript strings. Since the editor, JavaScript transpiler, and TypeScript transpiler
  are in browser, there is no way to access the file system. There are tools like
  [@microsoft/api-extractor](https://www.npmjs.com/package/@microsoft/api-extractor),
  [dts-bundle-generator](https://www.npmjs.com/package/dts-bundle-generator), or
  [npm-dts](https://www.npmjs.com/package/npm-dts) to generate type definitions
  in a single file so it can be imported easily.
- The JavaScript and TypeScript transpilers are configured to use JSX or TSX
  with React by default. The directive `/** @jsx XXX */` can be used inline to
  change this configuration.

## Limitations

- There are no provided tools to format, lint, and test sandboxes source code in
  CI environments.
- There are no controls to examine the source code executed in the sandbox app,
  such as console logging, tracking of user interactions, or type documentation.

## Example Use Case

Noxtron use case with plain JavaScript and [React](https://reactjs.org) v17.

### Installation

Using [Node.js](https://nodejs.org) v16 LTS, in an empty folder:

```bash
node -v # v16

# Create the following file structure
mkdir -p src
touch src/playground.html
touch src/playground.js
touch src/sandbox.html
touch src/sandbox.js
touch webpack.config.js

# Create package.json
npm init -y

# Install noxtron
npm i noxtron@0.7.5

# Install external libraries for the sandboxes source code.
# They are not required for Noxtron, only based on user configuration.
npm i react@17 react-dom@17
```

### Workflow

NPM scripts can be used to setup the application workflow tasks. To setup, bundle,
and test the applications files and modules, [webpack](https://webpack.js.org)
can be used.

```bash
npm i -D webpack@5 \
  webpack-cli@4 \
  webpack-dev-server@4 \
  html-webpack-plugin@5
```

Configure Webpack script.

```js
// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const UMD_PATH = path.join(__dirname, 'node_modules/noxtron/build/umd');
const SRC_PATH = path.join(__dirname, 'src');
const BUILD_PATH = path.join(__dirname, 'build');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    playground: path.join(SRC_PATH, 'playground.js'),
    sandbox: path.join(SRC_PATH, 'sandbox.js')
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_PATH, 'playground.html'),
      filename: path.join(BUILD_PATH, 'index.html'),
      chunks: ['playground']
    }),
    new HtmlWebpackPlugin({
      template: path.join(SRC_PATH, 'sandbox.html'),
      filename: path.join(BUILD_PATH, 'sandbox/index.html'),
      chunks: ['sandbox']
    })
  ],
  devServer: {
    static: [
      {
        directory: UMD_PATH,
        publicPath: '/noxtron/',
        watch: true
      },
      {
        directory: BUILD_PATH,
        watch: true
      }
    ],
    allowedHosts: 'all',
    compress: true,
    host: '127.0.0.1',
    port: 4000,
    open: '/'
  }
};
```

The folder `./build/` will have the final public applications.

The Noxtron UMD files located at `/node_modules/noxtron/build/umd/` will be copied
to `/build/noxtron/` so they are accessible publicly.

Then add the following script to setup and run the application.

```json
// package.json

{
  // ...
  "scripts": {
    "dev": "webpack serve"
  }
}
```

### Playground Setup

The playground application shows the explorer and controls of the sandboxes configured.
It is required to add a HTML element to render the interface and include the
Noxtron playground app UMD file.

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
    <!-- HTML element to render the interface -->
    <div id="root"></div>
    <!-- Noxtron playground app UMD entry file -->
    <script src="/noxtron/playground.js"></script>
  </body>
</html>
```

```js
// src/playground.js

window.noxtron.setupPlayground(() => ({
  // Root HTML element to render playground app.
  element: document.querySelector('#root'),

  // The URL path to the playground app.
  basePath: '/',

  // The URL path to the Noxtron asset files.
  // In this case, the "node_modules/noxtron/build/umd/" files are copied to the
  // server URL public folder at "/noxtron/".
  assetsPath: '/noxtron/',

  // The playground app HTML URL.
  // In this case, it is "/" which will render to "/index.html"
  // to have a clean URL.
  playgroundPath: '/',

  // The sandbox app HTML URL.
  // In this case, it is "/sandbox/" which will render to "/sandbox/index.html"
  // to have a clean URL.
  sandboxPath: '/sandbox/',

  // Sandboxes source code language. "javascript" | "typescript".
  codeLanguage: 'javascript',

  // Playground app title for different viewport widths.
  title: {
    small: 'MyOrg',
    medium: 'My Organization'
  },

  // Get the sandboxes list. Since this list contains every sandbox source code,
  // it may get big in filesize. It should be lazy loaded if possible.
  // They can use only packages provided by the sandbox app.
  // In this case, "react" and "react-dom" are available to use.
  getSandboxes: () => [
    {
      name: 'MyComponent',
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
  ]
}));
```

### Sandbox Setup

The sandbox app executes the actual sandboxes source code and custom source code.
It is required to include the Noxtron sandbox app UMD file and the user setup,
in this case, in a different JavaScript file.

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
    <!-- Noxtron sandbox app UMD entry file -->
    <script src="/noxtron/sandbox.js"></script>
  </body>
</html>
```

Only the dependencies provided to the sandbox setup can be used in the sandboxes
source code with ES modules.

```js
// src/sandbox.js

import React from 'react';
import ReactDOM from 'react-dom';

window.noxtron.setupSandbox(() => ({
  dependencies: [
    { name: 'react', pkg: React },
    { name: 'react-dom', pkg: ReactDOM }
  ]
}));
```

### Usage

To run the application:

```bash
npm run dev
```

Finally, open it at [`http://127.0.0.1:4000`](http://127.0.0.1:4000).

For more, check out the [project examples](https://github.com/romelperez/noxtron/tree/v0.7.3/examples).

## About

Noxtron's logo is a photo of a bird named Ninfa Coronada endemic from Colombia.
Source: [birdsofcolombia.com](https://birdsofcolombia.com).
