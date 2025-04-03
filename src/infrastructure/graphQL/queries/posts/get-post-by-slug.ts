import { gql } from '@apollo/client';

export default function buildGetPostBySlugQuery(slug: string) {
  return gql`
    query GetBlogs {
      posts(filters: {
        slug: {
          eq: "${slug}" 
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

export function buildGetPostIdBySlugQuery(slug: string) {
  return gql`
    query GetBlogs {
      posts(filters: {
        slug: {
          eq: "${slug}" 
        }
      }) {
        nodes {
          id
        }
      }
    }`;
}

export function buildGetPostIdFromTranslationsBySlugQuery(slug: string) {
  return gql`
    query GetBlogsFromTranslations {
      postTranslations(filters: {
        slug: {
          eq: "${slug}" 
        }
      }) {
        nodes {
          postId
        }
      }
    }`;
}