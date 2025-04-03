import { gql } from '@apollo/client';

export default function buildGetPostByIdQuery(id: string) {
  return gql`
    query GetBlogs {
      posts(filters: {
        id: {
          eq: "${id}" 
        }
      }) {
        nodes {
          id,
          title,
          previewContent,
          thumbnailPaths,
          slug,
          content,
          published,
          createdBy,
          createdAt,
          lastModifiedBy,
          lastModifiedAt,
          categoryId,
          categories {
            displayName,
            slug
          }
          rowVersion,
          postTags {
            nodes {
              tags {
                id,
                name,
                slug
              }
            }
          }
        }
      }
    }`;
}

export function buildGetPostWithTranslationsByIdQuery(id: string) {
  return gql`
    query GetBlogs {
      posts(filters: {
        id: {
          eq: "${id}" 
        }
      }) {
        nodes {
          id,
          title,
          previewContent,
          thumbnailPaths,
          slug,
          content,
          published,
          createdBy,
          createdAt,
          lastModifiedBy,
          lastModifiedAt,
          categoryId,
          categories {
            displayName,
            slug
          }
          rowVersion,
          postTags {
            nodes {
              tags {
                id,
                name,
                slug
              }
            }
          }
          postTranslations {
            nodes {
              id
              languageCode
              title
              previewContent
              content
            }
          }
        }
      }
    }`;
}
