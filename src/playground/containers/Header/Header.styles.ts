import type { NTTheme, NTStyles } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';
import { animationAppear } from '../../utils/animations';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.space(2),
      animation: `${animationAppear} 0.2s ease-out`
    },
    options: {},
    option: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.space(2),
      padding: `${theme.space(2)}px ${theme.space(3)}px`,
      ...theme.typography.cta(2),

      [breakpoints.large.up]: {
        padding: `${theme.space(2)}px ${theme.space(4)}px`,
        ...theme.typography.cta(1)
      }
    },
    optionIcon: {
      width: '1.2em',
      height: '1.2em'
    },
    optionLabel: {
      display: 'none',

      [breakpoints.medium.up]: {
        display: 'inline-block',
        marginLeft: theme.space(2)
      }
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row'
    },
    custom: {
      flex: 1
    },
    logo: {
      marginLeft: theme.space(2),
      ...theme.typography.heading(2),

      [breakpoints.medium.up]: {
        ...theme.typography.heading(0)
      }
    }
  };
};

export { createStyles };
