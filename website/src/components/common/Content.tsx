import styled from '@emotion/styled';
import { MAX_CONTENT_WIDTH } from '../../constants';
import { devices } from '../common/MediaQueries';

const Content = styled.div`
  width: 100%;
  max-width: ${MAX_CONTENT_WIDTH};
  margin-left: auto;
  margin-right: auto;

  @media ${devices.laptopL} {
    width: 90% !important;
  }
`;

export default Content;
