import styled from '@emotion/styled';
import React from 'react';
import Content from './Content';
import { Link } from '../common';
import { devices } from './MediaQueries';
import { Service as ServiceType } from '../../@types/types';

type Props = {
  serviceData: ServiceType;
  size: 'small' | 'large';
};

const Services = (props: Props) => {
  const { serviceData, size } = props;
  return (
    <Content>
      <ServiceSection size={size}>
        {serviceData.map((service: ServiceType) => (
          <Service
            key={service.name}
            to={`/palvelut/${service.slug}`}
            size={size}
          >
            <ImageWrapper size={size}>
              <Image className={'image'} image={service.Picture?.publicURL} />
            </ImageWrapper>
            <ServiceText>{service.name}</ServiceText>
          </Service>
        ))}
      </ServiceSection>
    </Content>
  );
};

export default Services;

const ServiceSection = styled.div<{ size: string }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: ${(props) => props.theme.spacing.xxxlarge};

  @media ${devices.laptopM} {
    justify-content: ${(props) => props.size === 'large' && 'space-around'};
  }

  @media ${devices.laptop} {
    justify-content: space-around;
  }

  @media ${devices.tablet} {
    padding-bottom: ${(props) => props.theme.spacing.xlarge};
  }
`;

const Service = styled(Link)<{ size: string }>`
  display: flex;
  flex-direction: column;
  flex: ${(props) => (props.size === 'small' ? '0 0 25%' : '0 0 33%')};
  align-items: center;
  justify-content: flex-start;
  text-decoration: none;
  padding: ${(props) =>
    props.size === 'small'
      ? `${props.theme.spacing.medium} 0px`
      : props.theme.spacing.medium};

  &:hover {
    text-decoration: underline;

    .image {
      transform: scale(1.1);
      -webkit-transform: scale(1.1, 1.1);
    }
  }

  @media (max-width: 1150px) {
    flex: ${(props) => props.size === 'small' && '0 0 33%'};
  }

  @media ${devices.tablet} {
    flex: 0 0 50%;
  }

  @media ${devices.mobileL} {
    flex: 0 0 100%;
  }
`;

const ServiceText = styled.div`
  text-align: center;
  font-size: 24px;
  padding-top: 23px;
  @media ${devices.tablet} {
    font-size: 20px;
  }
  @media ${devices.mobileL} {
    font-size: 18px;
  }
`;

const ImageWrapper = styled.div<{ size: string }>`
  height: ${(props) => (props.size === 'small' ? '246px' : '280px')};
  width: ${(props) => (props.size === 'small' ? '246px' : '280px')};
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  z-index: 2;
`;

const Image = styled.div<{ image: any }>`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  ${(props) => props.theme.imageTransition};
`;
