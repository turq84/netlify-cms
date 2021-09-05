import React from 'react';
import { BgColor } from '../../@types/types';
import { Wave as WaveBackground } from '../StyledComponents';

export const Wave = ({
  color,
  heroSection,
}: {
  color: BgColor;
  heroSection?: boolean;
}): JSX.Element => {
  switch (color) {
    case 'lightBlue':
      return <WaveBackground color={'EAF8FF'} />;
    case 'skyBlue':
      return <WaveBackground color={'B7DFF4'} />;
    case 'darkBlue':
      return <WaveBackground color={'325C79'} />;
    case 'white':
      return <WaveBackground color={'FFFFFF'} heroSection={heroSection} />;
    default:
      return <></>;
  }
};
