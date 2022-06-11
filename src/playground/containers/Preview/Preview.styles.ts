import type { NTStyles } from '../../../types';
import { animationAppear } from '../../utils/animations';

const createStyles = (): NTStyles => {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      animation: `${animationAppear} 0.2s ease-out`
    },
    sandbox: {
      flex: 1,
      display: 'block',
      margin: 0,
      outline: 'none',
      border: 'none',
      padding: 0,
      width: '100%',
      height: '100%',
      background: 'transparent'
    }
  };
};

export { createStyles };
