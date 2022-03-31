import '@emotion/react';
import type { NTTheme } from './types';

declare module '@emotion/react' {
  export interface Theme extends NTTheme {}
}
