interface BabelTransformConfig {
  filename: string;
  presets: string[];
}

interface Babel {
  transform: (
    code: string,
    config: BabelTransformConfig
  ) => {
    code: string | undefined;
  };
}

const getBabel = (): Babel => {
  const Babel = (window as any).Babel;

  if (!Babel) {
    throw new Error(
      [
        'Noxtron playground did not find "@babel/standalone" globally.',
        'Please install "https://unpkg.com/@babel/standalone/babel.min.js" in the playground HTML file.'
      ].join('\n')
    );
  }

  return Babel;
};

export type { Babel, BabelTransformConfig };
export { getBabel };
