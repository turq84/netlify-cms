import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import Schema from './Schema';

type MetaTags = Array<{ name: string; content: string }>;
type OgTags = Array<{ property: string; content: string }>;
type ItemPropTags = Array<{ itemprop: string; content: string }>;

interface Props {
  pathname: string;
  description?: string;
  lang?: string;
  meta?: MetaTags | OgTags | ItemPropTags;
  title?: string;
  socialImage?: { url: string; alt?: string } | string;
  isArticle?: boolean;
  author?: string;
  publishedAt?: string;
  keywords?: any;
}

function SEO({
  pathname,
  description = '',
  lang = 'fi',
  meta = [],
  title = '',
  publishedAt = '',
  socialImage,
  author = '',
  isArticle = false,
  keywords = [],
}: Props) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            author
            title
            description
            socialImage
            logo
            email
            # facebook
            # twitter
          }
        }
      }
    `
  );

  const metaUrl = `${siteMetadata.siteUrl}${pathname === '/' ? '' : pathname}`;
  const metaDescription = description || siteMetadata.description;
  const metaTitle =
    pathname === '/'
      ? title
      : `${title} - Aatos Perheklinikka` || siteMetadata.title;
  const metaImageUrl = socialImage
    ? socialImage.url
    : `${siteMetadata.siteUrl}${siteMetadata.socialImage}`;
  const metaImageAlt = socialImage?.alt || 'Aatos Perheklinikka';

  const generalTags: MetaTags = [
    { name: 'author', content: siteMetadata.author },
    { name: 'copyright', content: siteMetadata.author },
    { name: 'description', content: metaDescription },
    { name: 'keywords', content: keywords || '' },
  ];

  const itemPropTags: ItemPropTags = [
    { itemprop: 'description', content: metaDescription },
    { itemprop: 'image', content: metaImageUrl },
  ];

  const openGraphTags: OgTags = [
    { property: 'og:site_name', content: siteMetadata.author },
    { property: 'og:url', content: metaUrl },
    { property: 'og:locale', content: 'FI' },
    { property: 'og:title', content: metaTitle },
    { property: 'og:description', content: metaDescription },
    { property: 'og:image', content: metaImageUrl },
    { property: 'og:email', content: siteMetadata.email },
  ];

  // const twitterTags: MetaTags = [
  //   { name: 'twitter:card', content: 'summary' },
  //   { name: 'twitter:title', content: metaTitle },
  //   { name: 'twitter:description', content: metaDescription },
  //   { name: 'twitter:image', content: metaImageUrl },
  //   { name: 'twitter:site', content: siteMetadata.twitter },
  //   { name: 'twitter:domain', content: metaUrl },
  // ];

  if (metaImageAlt) {
    openGraphTags.push({ property: 'og:image:alt', content: metaImageAlt });
    // twitterTags.push({ name: 'twitter:image:alt', content: metaImageAlt });
  }

  if (isArticle) {
    openGraphTags.push({ property: 'og:type', content: 'article' });
    openGraphTags.push({ property: 'article:author', content: metaUrl });
    openGraphTags.push({ property: 'article:publisher', content: metaUrl });
  } else {
    openGraphTags.push({ property: 'og:type', content: 'website' });
  }

  return (
    <>
      <Helmet
        htmlAttributes={{ lang }}
        title={metaTitle}
        meta={[
          ...generalTags,
          ...openGraphTags,
          // ...twitterTags,
          ...itemPropTags,
          ...meta,
        ]}
        link={[{ rel: 'canonical', href: metaUrl }]}
      />
      <Schema
        isArticle={isArticle}
        lang={lang}
        author={author}
        socialImage={metaImageUrl}
        companyLogo={`${siteMetadata.siteUrl}${siteMetadata.logo}`}
        description={description}
        title={metaTitle}
        publishedAt={publishedAt}
      />
    </>
  );
}

export default SEO;
