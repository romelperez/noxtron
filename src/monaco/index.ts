// Import this file to include the main editor features and only TS language
// features (not other languages).

// Export the editor TS types.
export * from 'monaco-editor/esm/vs/editor/editor.api';

// Main editor features.
// @ts-ignore because monaco doesn't provide typings for this file
export * from 'monaco-editor/esm/vs/editor/edcore.main';

// TS language features are registered as a side effect of these imports.
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution';
