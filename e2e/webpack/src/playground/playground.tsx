import React from 'react';
import { render } from 'react-dom';

import type { NTUserConfig } from 'noxtron';
import { Playground } from 'noxtron/build/playground';

const config: NTUserConfig = {
  basePath: '/play',
  playgroundPath: '/play',
  sandboxPath: '/play/sandbox.html',
  sandboxes: [
    {
      name: '@org/project',
      children: [
        {
          name: 'basic',
          code: `import React from 'react';
import { render } from 'react-dom';

const Sandbox = () => {
  return (
    <div
      className='sandbox'
      style={{
        padding: 20,
        color: '#ee1',
        background: '#171717'
      }}
    >
      <h1>JavaScript Sandbox</h1>
    </div>
  );
};

render(<Sandbox />, document.querySelector('#root'));
`
        },
        {
          name: 'complex',
          code: `/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useRef, useEffect, ReactElement } from 'react';
import { render } from 'react-dom';
import random from 'lodash/random';
import * as empanada from 'empanada';
import { animate } from 'motion';

const Sandbox = (): ReactElement => {
  const elementRef = useRef();
  const words = empanada.createRandomWords(random(5, 30));

  useEffect(() => {
    animate(
      elementRef.current,
      { x: [0, 50] },
      { repeat: Infinity, direction: 'alternate', duration: 1 }
    );
  }, []);

  return (
    <div
      ref={elementRef}
      className='sandbox'
      css={{
        padding: 20,
        width: '60%',
        color: '#ee1',
        background: '#171717'
      }}
    >
      <h1>TypeScript Sandbox</h1>
      <p
        css={{ fontSize: '24px' }}
      >
        {words}
      </p>
    </div>
  );
};

render(<Sandbox />, document.querySelector('#root'));
`
        }
      ]
    }
  ],
  title: {
    mobile: <h1>Noxtron</h1>,
    desktop: <h1>Noxtron E2E</h1>
  },
  links: {
    mobile: [<span>v1.2.3 22-12-31</span>],
    desktop: [
      [
        <span>v1.2.3 22-12-31</span>,
        <a href="https://github.com/romelperez/noxtron" target="Website">
          Website
        </a>
      ],
      [
        <a href="https://twitter.com/romelperez07" target="Twitter">
          Twitter
        </a>,
        <a href="https://github.com/romelperez/noxtron" target="GitHub">
          GitHub
        </a>
      ]
    ]
  },
  theme: {
    typographyCommons: {
      heading: {
        fontFamily: 'Jura, sans-serif',
        fontWeight: '700',
        textTransform: 'uppercase'
      },
      body: {
        fontFamily: 'Jura, sans-serif',
        fontWeight: '400'
      },
      cta: {
        fontFamily: 'Jura, sans-serif',
        fontWeight: '400',
        textTransform: 'uppercase'
      },
      code: {
        fontFamily:
          '"Source Code Pro", Menlo, Monaco, "Courier New", monospace',
        fontWeight: '400'
      }
    },
    colorHues: {
      primary: 190,
      secondary: 70
    }
  }
};

render(<Playground config={config} />, document.querySelector('#root'));
