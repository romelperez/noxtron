import type { NTStyles } from '../../../types';
import { animationAppear } from '../../utils/animations';

const createStyles = (): NTStyles => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      animation: `${animationAppear} 0.2s ease-out`
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
