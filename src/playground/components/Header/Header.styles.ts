import type { NTTheme, NTStyles } from '../../../types';
import { NT_BREAKPOINTS as breakpoints } from '../../../constants';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.space(3),

      [breakpoints.medium.up]: {
        padding: theme.space(4)
      }
    },
    options: {},
    option: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.space(3),
      padding: theme.space(2),
      ...theme.typography.cta(2),

      [breakpoints.medium.up]: {
        marginRight: theme.space(4)
      },
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
    logo: {
      display: 'block',
      ...theme.typography.heading(2),

      [breakpoints.medium.up]: {
        ...theme.typography.heading(0)
      }
    },
    logoMobile: {
      [breakpoints.medium.up]: {
        display: 'none'
      }
    },
    logoDesktop: {
      display: 'none',
      [breakpoints.medium.up]: {
        display: 'inline'
      }
    }
  };
};

export { createStyles };
