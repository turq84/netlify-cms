import React from 'react';
import { Global, css } from '@emotion/core';
import theme from './theme';

const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  body {
    color: ${theme.colors.gray};
    font-family: ${theme.fontFamily};
    line-height: ${theme.lineHeight[2]};
    font-size: ${theme.fontsize[3]};
    background: ${theme.colors.white};
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  img {
    max-width: 100%;
  }

  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: ${props => props.theme.lineHeight[1]};
    margin-top: 0;
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 28px;
  }

  h3 {
    font-size: 24px;
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 18px;
  }

  a {
    color: ${props => props.theme.colors.darkGreen};
    text-decoration: none;
  }

  .gitter-open-chat-button {
    &,
    &:visited {
      padding: ${props => props.theme.space[3]} ${props => props.theme.space[4]};
      font-family: ${props => props.theme.fontFamily};
      font-size: ${props => props.theme.fontsize[3]};
      letter-spacing: 0.5px;
      line-height: 1;
      color: ${props => props.theme.colors.gray};
      background-color: ${props => props.theme.colors.green};
      box-shadow: 0 2px 16px 0 rgba(68, 74, 87, 0.15), 0 1px 4px 0 rgba(68, 74, 87, 0.3);
    }

    &:hover {
      background-color: ${props => props.theme.colors.lightGreen};
      box-shadow: 0 2px 16px 0 rgba(68, 74, 87, 0.25), 0 1px 4px 0 rgba(68, 74, 87, 0.5);
    }

    &:focus {
      box-shadow: 0 0 6px 3px rgba(62, 160, 127, 0.6);
      transition: none;
    }

    &:active {
      color: ${props => props.theme.colors.lightGray};
    }
  }
`;

function GlobalStyles() {
  return <Global styles={globalStyles} />;
}

export default GlobalStyles;
