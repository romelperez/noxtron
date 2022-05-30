import type { NTTheme, NTStyles } from '../../../types';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    editor: {
      flex: 1,

      '.monaco-editor, .monaco-editor .margin, .monaco-editor-background, .monaco-editor .inputarea.ime-input':
        {
          backgroundColor: 'transparent !important'
        }
    }
  };
};

export { createStyles };
