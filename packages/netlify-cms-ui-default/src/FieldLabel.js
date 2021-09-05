import styled from '@emotion/styled';
import { transitions, text } from './styles';

const FieldLabel = styled.label`
  ${text.fieldLabel};
  color: #000;
  display: inline-block;
  border: 0;
  border-radius: 3px 3px 0 0;
  padding: 3px 6px 2px;
  margin: 0;
  transition: all ${transitions.main};
  position: relative;

  /**
   * Faux outside curve into top of input
   */
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: -4px;
    height: 100%;
    width: 4px;
    background-color: inherit;
  }

  &:after {
    border-bottom-left-radius: 3px;
    background-color: #fff;
  }
`;

export default FieldLabel;
