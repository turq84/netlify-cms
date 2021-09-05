import React, { CSSProperties } from 'react';
import GastbyImage, {
  FluidObject,
  FixedObject,
  GatsbyImageProps,
} from 'gatsby-image';

export type ContentfulImage = {
  description: string; // NOTE: even though the prop is required the GraphQL query might return null
  fluid?: FluidObject; // JPG or PNG
  fixed?: FixedObject; // JPG or PNG
  file?: { url: string }; // SVG
};

type Props = ContentfulImage & {
  className?: string;
  gatsbyImgProps?: Omit<GatsbyImageProps, 'fluid' | 'fixed'>; // Group gatsby-image props so that we don't pass them to the <img> element
  style?: CSSProperties;
};

export default function Img({
  fluid,
  fixed,
  file,
  description,
  gatsbyImgProps = {},
  ...rest
}: Props) {
  if (fluid) {
    return (
      <GastbyImage
        {...rest}
        {...gatsbyImgProps}
        fluid={fluid}
        alt={description || ''}
        title={description || ''}
      />
    );
  } else if (fixed) {
    return (
      <GastbyImage
        {...rest}
        {...gatsbyImgProps}
        fixed={fixed}
        alt={description || ''}
        title={description || ''}
      />
    );
  } else if (file) {
    return (
      <img
        {...rest}
        src={file.url}
        alt={description || ''}
        title={description || ''}
      />
    );
  }

  throw Error(
    `Image requires either fluid, fixed or file for the image source!`
  );
}
