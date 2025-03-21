import { gql } from '@apollo/client';

export default function buildGetPostsQuery() {
  return gql`
    query GetBlogs {
      posts {
        nodes {
          id,
          title,
          previewContent,
          thumbnailPaths,
          slug,
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
