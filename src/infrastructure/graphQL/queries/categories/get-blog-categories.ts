import { gql } from '@apollo/client';

export default function buildGetBlogCategoriesQuery() {
  return gql`
    query GetBlogCategoryIds {
      categories(filters: { categoryType: { eq: Blog }, parentId: { is_null: "true" } }) {
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
          categoryTranslations {
            nodes {
              id
              languageCode
              displayName
              slug
            }
          }
        }
      }
    }
  `;
}
