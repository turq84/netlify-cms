/* eslint-disable */
import { Theme as _Theme } from './theme';

// Enables the use of Theme in typing without import
declare module '@emotion/react' {
  export interface Theme extends _Theme {}
}
