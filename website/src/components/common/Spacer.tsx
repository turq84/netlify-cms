import { RefAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Theme } from '../../theme';
import { BreakpointKey } from '../../constants';
import {
  WithResponsiveProps,
  parseResponsiveProps,
  media,
} from '../../utils/styled';

type OwnProps = {
  amount?: keyof Theme['spacing'];
  axis?: 'x' | 'y'; // Default is x-axis
};

type Props = WithResponsiveProps<OwnProps> & RefAttributes<HTMLElement>;
type ThemedProps = OwnProps & { theme: Theme };

const ownProps: Array<keyof OwnProps> = ['amount', 'axis'];

const hspacer = (p: ThemedProps) => css`
  width: ${p.theme.spacing[p.amount || 'default']};
  height: 0;
`;

const vspacer = (p: ThemedProps) => css`
  height: ${p.theme.spacing[p.amount || 'default']};
  width: 0;
`;

const getCSS = (p: ThemedProps) => [
  (!p.axis || p.axis === 'x') && hspacer(p),
  p.axis === 'y' && vspacer(p),
];

const getResponsiveCSS = (p: Props) => {
  const [baseProps, mediaProps] = parseResponsiveProps(p, ownProps);
  const responsiveProps = Object.entries(mediaProps).map(
    ([breakpointKey, breakpointProps]: any) => {
      const breakpointCSS = getCSS({ ...p, ...breakpointProps });
      return media[breakpointKey as BreakpointKey]`${breakpointCSS}`;
    }
  );
  return [getCSS(baseProps), ...responsiveProps];
};

const shouldForwardProp = (p: string) => ![...ownProps, 'as'].includes(p);

const Spacer = styled('div', { shouldForwardProp })<Props>`
  flex-shrink: 0;
  ${getResponsiveCSS}
`;

// This is used inside Stack component to skip applying extra white space
// for Spacing components that are used inside a Stack component
Spacer.defaultProps = { 'data-spacing': true } as any;

export default Spacer;
