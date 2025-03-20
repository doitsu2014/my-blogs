import { gql } from "@apollo/client";

export default function buildGetBlogsQuery(blogCategories: string[]) {
  return gql`
    query GetBlogs {
      posts(filters: {
        categoryId: {
          is_in: ${JSON.stringify(blogCategories)} 
        }
      }) {
        nodes {
          id,
          title,
          previewContent,
          content,
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