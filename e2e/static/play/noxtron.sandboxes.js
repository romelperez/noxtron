window.noxtronSandboxes = [
  {
    name: '@package/one',
    children: [
      {
        name: 'basic',
        language: 'typescript',
        code: '// TODO'
      },
      {
        name: 'medium',
        language: 'typescript',
        code: '// TODO'
      },
      {
        name: 'complex',
        language: 'typescript',
        code: '// TODO'
      }
    ]
  },
  {
    name: '@package/two',
    children: [
      {
        name: 'SomeProvider',
        children: [
          {
            name: 'basic',
            language: 'typescript',
            code: 'render(\n  <h1\n    className="title"\n    style={{ margin: "20px", color: "yellow", background: "black" }}\n  >\n    SomeProvider basic!\n  </h1>\n);\n'
          },
          {
            name: 'medium',
            language: 'typescript',
            code: 'render(\n  <h1\n    className="title"\n    style={{ margin: "20px", color: "magenta", background: "black" }}\n  >\n    SomeProvider medium!\n  </h1>\n);\n'
          },
          {
            name: 'complex',
            language: 'typescript',
            code: 'render(\n  <h1\n    className="title"\n    style={{ margin: "20px", color: "green", background: "black" }}\n  >\n    SomeProvider complex!\n  </h1>\n);\n'
          }
        ]
      },
      {
        name: 'useContext',
        children: [
          {
            name: 'basic',
            language: 'typescript',
            code: '// TODO'
          },
          {
            name: 'complex',
            language: 'typescript',
            code: '// TODO'
          }
        ]
      }
    ]
  },
  {
    name: '@package/three',
    children: [
      {
        name: 'Text',
        children: [
          {
            name: 'basic',
            language: 'typescript',
            code: '// TODO'
          },
          {
            name: 'complex',
            language: 'typescript',
            code: '// TODO'
          }
        ]
      },
      {
        name: 'Background',
        children: [
          {
            name: 'basic',
            language: 'typescript',
            code: '// TODO'
          },
          {
            name: 'medium',
            language: 'typescript',
            code: '// TODO'
          }
        ]
      }
    ]
  }
];
