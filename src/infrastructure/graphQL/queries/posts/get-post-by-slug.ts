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
