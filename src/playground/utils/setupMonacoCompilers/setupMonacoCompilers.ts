import {
  NTMonaco,
  NTMonacoCompilerOptions,
  NTTypeDefinition
} from '../../../types';

const setupMonacoCompilers = (
  monaco: NTMonaco,
  typeDefinitions: NTTypeDefinition[]
) => {
  const { typescript } = monaco.languages;

  // Disable type checking and syntax validation before adding type definitions.
  typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true
  });

  const defaultCompilerOptions: NTMonacoCompilerOptions = {
    module: typescript.ModuleKind.ESNext,
    moduleResolution: typescript.ModuleResolutionKind.NodeJs,
    target: typescript.ScriptTarget.ES2015,
    jsx: typescript.JsxEmit.React,
    esModuleInterop: true,
    allowNonTsExtensions: true,
    allowSyntheticDefaultImports: true,
    baseUrl: 'file:///',
    paths: typescript.typescriptDefaults.getCompilerOptions().paths
  };

  typescript.javascriptDefaults.setCompilerOptions(defaultCompilerOptions);
  typescript.typescriptDefaults.setCompilerOptions(defaultCompilerOptions);

  typeDefinitions.forEach(({ filename, code }) => {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(code, filename);
  });

  // Re-enable type checking and syntax validation.
  typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
  });
};

export { setupMonacoCompilers };
