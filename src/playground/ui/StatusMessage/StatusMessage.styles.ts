import type { NTTheme, NTStyles } from '../../../types';

const createStyles = (theme: NTTheme): NTStyles => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.space(4),
      width: '100%',
      ...theme.typography.body(2),
      color:
        theme.colorScheme === 'dark' ? undefined : theme.colors.primary.text(4),
      textAlign: 'center'
    },
    content: {
      flex: 1
    }
  };
};

export { createStyles };
