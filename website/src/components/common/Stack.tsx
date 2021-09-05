import { CSSProperties } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { BreakpointKey } from '../../constants';
import { Theme } from '../../theme';
import {
  WithResponsiveProps,
  parseResponsiveProps,
  media,
} from '../../utils/styled';

export type LayoutProps = {
  spacing?: keyof Theme['spacing'];
  axis?: 'x' | 'y'; // Default is y-axis
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  reverse?: boolean;
};

type Props = WithResponsiveProps<LayoutProps> & {
  as?: keyof JSX.IntrinsicElements;
};

type ThemedProps = LayoutProps & { theme: Theme };

const layoutProps: Array<keyof LayoutProps> = [
  'spacing',
  'axis',
  'align',
  'justify',
  'reverse',
];

const hstack = (p: ThemedProps) => {
  const s = p.theme.spacing[p.spacing || 'default'];
  return css`
    flex-direction: ${p.reverse ? 'row-reverse' : 'row'};
    & > *:not([data-spacing]) + *:not([data-spacing]) {
      margin: ${p.reverse ? `0 ${s} 0 0` : `0 0 0 ${s}`};
    }
  `;
};

const vstack = (p: ThemedProps) => {
  const s = p.theme.spacing[p.spacing || 'default'];
  return css`
    flex-direction: ${p.reverse ? 'column-reverse' : 'column'};
    & > *:not([data-spacing]) + *:not([data-spacing]) {
      margin: ${p.reverse ? `0 0 ${s} 0` : `${s} 0 0 0`};
    }
  `;
};

const getCSS = (p: ThemedProps) => [
  p.align && `align-items: ${p.align};`,
  p.justify && `justify-content: ${p.justify};`,
  (!p.axis || p.axis === 'y') && vstack(p),
  p.axis === 'x' && hstack(p),
];

const getResponsiveCSS = (p: Props) => {
  const [baseProps, mediaProps] = parseResponsiveProps(p, layoutProps);
  const responsiveProps = Object.entries(mediaProps).map(
    ([breakpointKey, breakpointProps]: any) => {
      const breakpointCSS = getCSS({ ...p, ...breakpointProps });
      return media[breakpointKey as BreakpointKey]`${breakpointCSS}`;
    }
  );
  return [getCSS(baseProps), ...responsiveProps];
};

const shouldForwardProp = (p: string) => ![...layoutProps, 'as'].includes(p);

// NOTE: reset margin and padding in case stack is used as ul element
const Stack = styled('div', { shouldForwardProp })<Props>`
  position: relative;
  display: flex;
  padding: 0;
  margin: 0;
  ${getResponsiveCSS}
`;

export default Stack;
