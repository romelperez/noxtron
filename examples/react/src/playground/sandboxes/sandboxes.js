export const sandboxes = [
  {
    name: 'MyComponent',
    children: [
      {
        name: 'basic',
        code: require('!raw-loader?esModule=false!./basic.tsx')
      },
      {
        name: 'intermediate',
        code: require('!raw-loader?esModule=false!./intermediate.tsx')
      },
      {
        name: 'complex',
        code: require('!raw-loader?esModule=false!./complex.tsx')
      }
    ]
  }
];
