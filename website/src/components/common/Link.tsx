import React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import styled from '@emotion/styled';

import { Color } from '../../theme';

type Props = {
  color?: Color;
  underline?: boolean;
};

// Support both internal and external links
// https://www.gatsbyjs.org/docs/gatsby-link/#reminder-use-link-only-for-internal-links
const Link: React.FC<Props & GatsbyLinkProps<any>> = ({
  to,
  color,
  underline = true,
  children,
  ...rest
}) => {
  const internal = /^\/(?!\/)/.test(to) && !/^\/assets\//.test(to);
  const asTag: any = internal ? GatsbyLink : 'a';
  const LinkComp = LinkBase.withComponent(asTag);
  const externalProps =
    !internal && (to.includes('https') || /^\/assets\//.test(to))
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
  const linkProps = internal ? { to } : { href: to, ...externalProps };

  return (
    <LinkComp {...rest} {...linkProps} color={color} underline={underline}>
      {children}
    </LinkComp>
  );
};

const LinkBase = styled('a', {
  shouldForwardProp: (p) => p !== 'underline' && p !== 'color',
})<Props>`
  ${(p) => p.theme.typography.action}
  color: ${(p) => p.theme.colors[p.color || 'black']};
  text-decoration: ${(p) => (p.underline ? 'underline' : 'none')};
`;

export default Link;
