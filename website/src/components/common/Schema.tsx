import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface Props {
  description?: string;
  title?: string;
  isArticle?: boolean;
  publishedAt?: string;
  author?: string;
  lang?: string;
  socialImage?: string;
  companyLogo?: string;
}

export const Schema: React.FC<Props> = ({
  description = '',
  lang = 'fi',
  title = '',
  author = '',
  socialImage = '',
  publishedAt = '',
  companyLogo = '',
  isArticle = false,
}) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            socialImage
            company
            email
            description
          }
        }
      }
    `
  );

  const baseSchema = {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    description: description || siteMetadata.description,
    name: siteMetadata.title,
    url: siteMetadata.siteUrl,
    logo: companyLogo,
    image: `${siteMetadata.siteUrl}${siteMetadata.socialImage}`,
    legalName: siteMetadata.company,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: siteMetadata.email,
        contactType: 'sales',
      },
    ],
    foundingDate: '2013',
  };

  const articleSchema = {
    '@context': 'http://schema.org',
    '@type': 'BlogPosting',
    description: description || siteMetadata.description,
    headline: title,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: { type: 'ImageObject', url: companyLogo },
    },
    author: author || {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: { type: 'ImageObject', url: companyLogo },
    },
    editor: author || undefined,
    datePublished: publishedAt,
    dateCreated: publishedAt,
    dateModified: publishedAt,
    inLanguage: lang,
    image: socialImage,
  };

  const schema = isArticle ? articleSchema : baseSchema;

  return (
    <Helmet>
      <script type={'application/ld+json'}>{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default Schema;
