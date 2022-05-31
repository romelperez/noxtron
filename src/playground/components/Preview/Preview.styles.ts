import type { NTStyles } from '../../../types';
import { animationAppear } from '../../utils/animations';

const createStyles = (): NTStyles => {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      animation: `${animationAppear} 0.2s ease-out`
    },
    sandbox: {
      flex: 1,
      display: 'block',
      margin: 0,
      outline: 'none',
      border: 'none',
      padding: 0,
      background: 'transparent'
    }
  };
};

export { createStyles };
