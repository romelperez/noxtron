import '@emotion/react';
import type { Theme as ProjectTheme } from './types';

declare module '@emotion/react' {
  export interface Theme extends ProjectTheme {}
}
