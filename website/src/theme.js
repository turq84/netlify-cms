const theme = {
  colors: {
    white: '#fff',
    black: '#000',
    lightestGray: '#E6E6E6',
    lighterGray: '#F7F8F8',
    lightGray: '#F6F6F6',
    lightishGray: '#51555D',
    gray: '#313D3E',
    darkGray: '#2F3132',
    darkerGray: '#1E1F21',
    blueGray: '#BCC2CE',
    lightGreen: '#97bf2f',
    green: '#10a37f',
    darkGreen: '#7CA511',
    darkerGreen: '#628013',
    shadeBlue: '#EFF0F4',
    blue: '#3A69C7',
    border: '#ececf1',
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
  fontWeight: {
    thin: 100,
    light: 300,
    regular: 400,
    semibold: 500,
    bold: 700,
    black: 900,
  },
  fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
  fontsize: ['10px', '12px', '14px', '16px', '18px', '24px', '32px', '42px', '64px'],
  lineHeight: [1, 1.3, 1.7],
  space: [0, '4px', '8px', '16px', '24px', '40px', '64px', '104px', '152px'],
  radii: [0, '4px', '8px'],
  breakpoints: [480, 768, 960, 1200, 1280],
  zIndexes: {
    header: 100,
  },
};

// export type Theme = typeof theme;

// export type Color = keyof Theme['colors'];

// export type Spacing = keyof Theme['spacing'];

// export type Sizing = keyof Theme['sizing'];

// export type Typography = keyof Theme['typography'];

export default theme;
