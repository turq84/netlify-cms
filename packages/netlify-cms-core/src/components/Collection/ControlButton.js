import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { buttons, StyledDropdownButton, colors } from 'netlify-cms-ui-default';

const Button = styled(StyledDropdownButton)`
  ${buttons.button};
  ${buttons.medium};
  ${buttons.grayText};
  color: #000;
  font-weight: 300;
  font-size: 16px;

  &:after {
    top: 11px;
  }
`;

export function ControlButton({ active, title }) {
  return (
    <Button
      css={css`
        color: ${active ? colors.active : undefined};
      `}
    >
      {title}
    </Button>
  );
}
