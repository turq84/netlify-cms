import { css } from '@emotion/react';

import { devices } from './components/common';

const theme = {
  colors: {
    primary: '#000000',
    primaryBlue: '#325C79',
    black: '#000000',
    white: '#FFFFFF',
    'grey-light': '#F7F7F7',
    'grey-dark': '#636363',
    error: '#EB4034',
    focus: '#003CFF',
    blue: '#0097C1',
    lightBlue: '#EAF8FF',
    lightGrey: '#eee',
    powderBlue: 'lightBlue',
    skyBlue: '#B7DFF4',
    green: '#008000', // TODO make sure this is a good color (used in contact request confirmation message)
    borderGrey: '#CECECE',
    inActiveGrey: '#0000004D',
  },
  spacing: {
    none: '0px',
    xxsmall: '2px',
    xsmall: '4px',
    small: '8px',
    default: '16px',
    medium: '24px',
    large: '32px',
    xlarge: '48px',
    xxlarge: '64px',
    xxxlarge: '104px',
  },
  sizing: {
    xsmall: '8px',
    small: '12px',
    default: '16px',
    medium: '24px',
    large: '32px',
    xlarge: '48px',
  },
  fonts: {
    primary: css`
      font-family: 'DM Sans', sans-serif;
    `,
    secondary: css`
      font-family: 'Sansita', sans-serif;
    `,
  },
  imageTransition: css`
    -webkit-transition: color 1s;
    -moz-transition: 1s;
    -o-transition: 1s;
    transition: 1s;
  `,
  radius: '4px',
  focus: css`
    box-shadow: 0px 5px 15px rgba(2, 38, 64, 0.1);
  `,
  typography: {
    'title-1': css`
      font-family: 'Work Sans', sans-serif;
      font-size: 64px;
      font-weight: 400;
      line-height: 1.2;

      @media ${devices.laptopM} {
        font-size: 52px;
      }

      @media ${devices.tablet} {
        font-size: 44px;
      }

      @media ${devices.mobileL} {
        font-size: 36px;
      }

      @media ${devices.mobileS} {
        font-size: 28px;
      }
    `,
    'title-2': css`
      font-family: 'Work Sans', sans-serif;
      font-size: 42px;
      font-weight: 400;
      line-height: 1.4;

      @media ${devices.tablet} {
        font-size: 36px;
      }

      @media ${devices.mobileL} {
        font-size: 28px;
      }
    `,
    'title-3': css`
      font-family: 'Work Sans', sans-serif;
      font-size: 24px;
      font-weight: 400;
      line-height: 1.4;

      @media ${devices.tablet} {
        font-size: 22px;
      }

      @media ${devices.mobileL} {
        font-size: 20px;
      }
    `,
    'title-4': css`
      font-family: 'DM sans Bold', sans-serif;
      font-size: 20px;
      line-height: 1.4;

      @media ${devices.tablet} {
        font-size: 18px;
      }
    `,

    subtitle: css`
      font-family: 'DM Sans', sans-serif;
      font-size: 24px;
      font-weight: 500;
      line-height: 1.4;
      @media ${devices.tablet} {
        font-size: 20px;
      }
      @media ${devices.mobileL} {
        font-size: 18px;
      }
    `,
    body: css`
      font-family: 'DM sans', sans-serif;
      font-size: 18px;
      line-height: 1.35;
      @media ${devices.tablet} {
        font-size: 16px;
      }
    `,
    'body-strong': css`
      font-family: 'DM sans', sans-serif;
      font-size: 20px;
      font-weight: 900;
      line-height: 1.35;
      @media ${devices.tablet} {
        font-size: 18px;
      }
    `,
    'body-large': css`
      font-family: 'DM Sans', sans-serif;
      font-size: 20px;
      font-weight: 400;
      line-height: 1.35;
      margin: 24px 0px;
      @media ${devices.tablet} {
        font-size: 18px;
      }
    `,
    action: css`
      font-family: 'DM Sans', sans-serif;
      font-size: 18px;
      line-height: 1.4;
    `,
    'body-medium': css`
      font-family: 'DM Sans', sans-serif;
      font-size: 18px;
      @media ${devices.tablet} {
        font-size: 16px;
      }
    `,
  },
};

export type Theme = typeof theme;

export type Color = keyof Theme['colors'];

export type Spacing = keyof Theme['spacing'];

export type Sizing = keyof Theme['sizing'];

export type Typography = keyof Theme['typography'];

export default theme;
