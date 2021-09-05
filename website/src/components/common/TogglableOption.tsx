import React from 'react';
import styled from '@emotion/styled';

type Props = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

/** Inputs and labels need to be direct siblings instead of nested or else keyboard navigation
 * through different options is suboptimal
 */
const TogglableOption: React.FC<Props> = ({
  label,
  selected,
  onClick,
  children,
  ...rest
}) => (
  <TogglableOptionLabel
    htmlFor={label.replace(' ', '-')}
    selected={selected}
    {...rest}
  >
    #{children ?? label}
    <input
      className="visually-hidden"
      type="checkbox"
      name={label.replace(' ', '-')}
      id={label.replace(' ', '-')}
      checked={selected}
      onChange={onClick}
    />
  </TogglableOptionLabel>
);

const TogglableOptionLabel = styled.label<{ selected: boolean }>`
  border-radius: 24px;
  background-color: ${(p) =>
    p.theme.colors[p.selected ? 'lightGrey' : 'white']};
  border: 1px solid ${(p) => p.theme.colors.lightGrey};
  color: #000;
  padding: ${(p) => p.theme.spacing.small} ${(p) => p.theme.spacing.default};
  width: max-content;
  margin: ${(p) => p.theme.spacing.small};
  cursor: pointer;

  &:active {
    box-shadow: 0px 3px 6px #0000001a;
  }
`;

export default TogglableOption;
