import type { Theme, Styles } from '../../../types';

const createStyles = (theme: Theme): Styles => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.space(4)
    },
    options: {},
    option: {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.space(4),
      padding: `${theme.space(1)}px ${theme.space(2)}px`,

      [theme.breakpoints.medium.up]: {
        padding: theme.space(2)
      },
      [theme.breakpoints.large.up]: {
        padding: `${theme.space(2)}px ${theme.space(4)}px`
      }
    },
    optionIcon: {
      width: '1.2em',
      height: '1.2em'
    },
    optionLabel: {
      display: 'none',

      [theme.breakpoints.medium.up]: {
        display: 'inline-block',
        marginLeft: theme.space(2)
      }
    },
    logo: {
      display: 'block',
      ...theme.typography.heading(2),

      [theme.breakpoints.medium.up]: {
        ...theme.typography.heading(0)
      }
    },
    logoMobile: {
      [theme.breakpoints.medium.up]: {
        display: 'none'
      }
    },
    logoDesktop: {
      display: 'none',
      [theme.breakpoints.medium.up]: {
        display: 'inline'
      }
    }
  };
};

export { createStyles };
