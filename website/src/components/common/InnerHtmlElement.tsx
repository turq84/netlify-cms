import React from 'react';
import styled from '@emotion/styled';

const InnerHtmlStyles = styled.div`
  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};

    &:hover {
      color: ${(props) => props.theme.colors.primary};
      text-decoration: underline;
    }
  }
`;

type Props = {
  children: string;
};

const InnerHtmlElement = ({ children, ...rest }: Props) => (
  <InnerHtmlStyles {...rest} dangerouslySetInnerHTML={{ __html: children }} />
);

export default InnerHtmlElement;
