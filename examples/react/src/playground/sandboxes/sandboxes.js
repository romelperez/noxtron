export const sandboxes = [
  {
    name: 'MyComponent',
    children: [
      {
        name: 'basic',
        code: require('!raw-loader?esModule=false!./basic.txt')
      },
      {
        name: 'intermediate',
        code: require('!raw-loader?esModule=false!./intermediate.txt')
      },
      {
        name: 'complex',
        code: require('!raw-loader?esModule=false!./complex.txt')
      }
    ]
  }
];