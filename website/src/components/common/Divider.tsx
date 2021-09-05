import styled from '@emotion/styled';
import { Theme } from '../../theme';

type Props = {
  amount?: keyof Theme['spacing'];
  color?: keyof Theme['colors'];
};

const Divider = styled.div<Props>`
  margin: ${(p) => p.theme.spacing[p.amount || 'default']} auto;
  width: 100%;
  height: 1px;
  background-color: ${(p) => p.theme.colors[p.color || 'grey-light']};
`;

export default Divider;
