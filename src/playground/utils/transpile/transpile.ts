import type {
  NTMonacoModel,
  NTMonacoLanguage,
  NTMonacoUri,
  NTStoreTranspilation
} from '../../../types';
import { convertCodeImportsToRefs } from '../../utils/convertCodeImportsToRefs';

interface TranspileDiagnostic {
  category: number;
  code: number;
  start?: number;
  length?: number;
  messageText: string | { messageText: string; code: number };
}

function getTranspileLineStarts(text: string): number[] {
  const lineStarts: number[] = [0];
  const eol = /\r?\n/g;
  let match: RegExpExecArray | null;
  while ((match = eol.exec(text))) {
    lineStarts.push(match.index + match[0].length);
  }
  return lineStarts;
}

function getTranspileErrorLineInfo(
  error: TranspileDiagnostic,
  lineStarts: number[]
): { line: number; col: number } {
  let line = 1;
  for (; line < lineStarts.length; line++) {
    if (lineStarts[line] > error.start!) {
      break;
    }
  }
  return { line, col: error.start! - lineStarts[line - 1] + 1 };
}

function getTranspileFirstErrorMessage(
  errors: TranspileDiagnostic[],
  text: string
): string {
  const lineStarts = getTranspileLineStarts(text);

  return errors
    .map((error) => {
      if (error.messageText && typeof error.messageText === 'object') {
        // This is a multi-line ts.DiagnosticMessageChain (not sure if this happens, but handling per typings)
        error.code = error.messageText.code;
        error.messageText = error.messageText.messageText;
      }

      if (typeof error.start === 'number') {
        const lineInfo = getTranspileErrorLineInfo(error, lineStarts);
        return `Line ${lineInfo.line} - ${error.messageText} (TS${error.code})`;
      } else {
        return error.messageText;
      }
    })
    .join('\n\n');
}

function transpile(
  typescript: NTMonacoLanguage,
  model: NTMonacoModel
): Promise<NTStoreTranspilation> {
  const transpiledOutput: NTStoreTranspilation = {
    isLoading: false,
    importsLines: [],
    code: '',
    error: ''
  };
  const filename = model.uri.toString();
  const isTypeScript = filename.endsWith('.ts') || filename.endsWith('.tsx');
  const worker = isTypeScript
    ? typescript.getTypeScriptWorker()
    : typescript.getJavaScriptWorker();

  return worker
    .then((getWorker: (uri: NTMonacoUri) => Promise<any>) =>
      getWorker(model.uri)
    )
    .then((worker) => {
      return worker.getEmitOutput(filename).then((output: any) => {
        // Get diagnostics to find out if there were any syntax errors (there's also getSemanticDiagnostics
        // for type errors etc, but it may be better to allow the user to just find and fix those
        // via intellisense rather than blocking compilation, since they may be non-fatal)
        return worker
          .getSyntacticDiagnostics(filename)
          .then((syntacticDiagnostics: TranspileDiagnostic[]) => {
            syntacticDiagnostics = syntacticDiagnostics.filter(
              (diagnostic: TranspileDiagnostic) => diagnostic.category === 1
            );

            if (syntacticDiagnostics.length) {
              transpiledOutput.error = getTranspileFirstErrorMessage(
                syntacticDiagnostics,
                model.getValue()
              );
            } else {
              const transpiledCoce = output.outputFiles[0].text;
              const { importsLines, code } =
                convertCodeImportsToRefs(transpiledCoce);

              transpiledOutput.importsLines = importsLines;
              transpiledOutput.code = code;
            }
            return transpiledOutput;
          });
      });
    })
    .catch((ex) => {
      transpiledOutput.error = ex.message;
      return transpiledOutput;
    });
}

export { transpile };
