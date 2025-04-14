import { gql } from '@apollo/client';

export default function buildGetPostsBySearchValueQuery(searchValue: string) {
  return gql`
  query SearchPosts {
    posts(
      filters: {
        or: [
          {
            title: {
              contains: "${searchValue}"
            }
          },
          {
            previewContent: {
              contains: "${searchValue}"
            }
          },
          {
            slug: {
              contains: "${searchValue}"
            }
          }
        ],
        published: {
          eq: true
        }
      }
    ) {
      nodes {
        title
        previewContent
        thumbnailPaths
        slug
        published
        createdBy
        createdAt
        categories {
          displayName
          slug
        }
      }
    }
  }`;
}

export function buildGetPostsWithTranslationBySearchValueQuery(searchValue: string, locale: string) {
  return gql`
    query SearchPostsWithTranslation {
      postTranslations(
        filters: {
          or: [
            { title: { contains: "${searchValue}" } }
            { previewContent: { contains: "${searchValue}" } }
            { slug: { contains: "${searchValue}" } }
          ]
          languageCode: { eq: "${locale}" }
        }
      ) {
        nodes {
          languageCode
          title
          previewContent
          slug
          posts {
            published
            thumbnailPaths
            createdBy
            createdAt
            categories {
              slug
              categoryTranslations(
                filters: {
                  languageCode: {
                    eq: "${locale}"
                  }
                } 
              ) {
                nodes {
                  languageCode,
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;
}
