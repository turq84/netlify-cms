import React from 'react';
import styled from '@emotion/styled';
import { Typography, Color } from '../../theme';
import { MAX_TEXT_WIDTH } from '../../constants';

interface Props extends React.ComponentProps<'span'> {
  color?: Color;
  align?: string;
  href?: string;
  variant: Typography;
  as?: Tags;
}

type Tags = keyof JSX.IntrinsicElements;

// eslint-disable-next-line react/display-name
const Text = React.forwardRef<any, Props>(
  ({ variant, as: asTag, children, ...rest }, ref) => {
    const tag = asTag || variantToTag[variant];
    const Comp = TextBase.withComponent(tag);

    return (
      <Comp {...rest} variant={variant} ref={ref as any}>
        {children}
      </Comp>
    );
  }
);

const TextBase = styled.span<Props>`
  max-width: ${MAX_TEXT_WIDTH};
  margin: 0;
  padding: 0;
  color: ${(p) => (p.color ? p.theme.colors[p.color] : 'inherit')};
  text-align: ${(p) => p.align || 'inherit'};
  ${(p) => p.theme.typography[p.variant]}
`;

const variantToTag: { [key in Typography]: Partial<Tags> } = {
  'title-1': 'h1',
  'title-2': 'h2',
  'title-3': 'h3',
  'title-4': 'h4',
  subtitle: 'strong',
  action: 'span',
  body: 'p',
  'body-strong': 'strong',
  'body-large': 'p',
};

export default Text;
