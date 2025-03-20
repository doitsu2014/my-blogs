import { gql } from "@apollo/client";

export default function buildGetBlogCategoriesQuery() {
  return gql`
    query GetBlogCategoryIds {
      categories(filters: { categoryType: { eq: BLOG }, parentId: { is_null: "true" } }) {
        nodes {
          id
          displayName
          slug
          categoryType
          createdBy
          createdAt
          rowVersion
          categoryTags {
            nodes {
              tags {
                id
                name
                slug
              }
            }
          }
        }
      }
    }`;
} 