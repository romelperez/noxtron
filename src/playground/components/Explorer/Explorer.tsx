/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, useMemo } from 'react';

import type { Styles } from '@src/types';
import { Button } from '../Button';
import { createStyles } from './Explorer.styles';

interface ExplorerDataItem {
  name: string
  link?: string
  isActive?: boolean
  children?: ExplorerDataItem[]
}

const createExplorerItems = (styles: Styles, items: ExplorerDataItem[]): ReactElement => {
  return (
    <ul>
      {items.map(({ name, link, isActive, children }, index) => (
        <li key={index}>
          {!link && (
            <div
              css={[styles.item, isActive && styles.itemActive]}
            >
              {name}
            </div>
          )}
          {!!link && (
            <a
              css={[styles.item, styles.link, isActive && styles.linkActive]}
              href={link}
            >
              {name}
            </a>
          )}
          {!!children && !!children.length && createExplorerItems(styles, children)}
        </li>
      ))}
    </ul>
  );
};

interface ExplorerProps {
  className?: string
}

const Explorer = (props: ExplorerProps): ReactElement => {
  const { className } = props;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // DEBUG:
  const items: ExplorerDataItem[] = [
    {
      name: '@arwes/animator',
      children: [
        {
          name: 'Animator',
          children: [
            {
              name: 'basic',
              link: '#'
            },
            {
              name: 'stagger',
              link: '#'
            },
            {
              name: 'sequence',
              link: '#'
            }
          ]
        }
      ]
    },
    {
      name: '@arwes/bleeps',
      isActive: true,
      children: [
        {
          name: 'BleepsProvider',
          isActive: true,
          children: [
            {
              name: 'basic',
              link: '#'
            },
            {
              name: 'loops',
              isActive: true,
              link: '#'
            },
            {
              name: 'categories',
              link: '#'
            }
          ]
        }
      ]
    }
  ];
  // DEBUG:

  return (
    <aside
      className={className}
      css={styles.root}
    >
      <nav css={styles.nav}>
        {createExplorerItems(styles, items)}
      </nav>
      <Button css={styles.button}>
        Create Sandbox
      </Button>
    </aside>
  );
};

export { Explorer };
