import { gql } from '@apollo/client';

export default function buildGetCategoryByIdQuery(id: string) {
  return gql`
    query GetCategoryById {
      categories(filters: { id: { eq: "${id}" } }) {
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

export function buildGetCategoryWithTranslationsByIdQuery(id: string) {
  return gql`
    query GetCategoryById {
      categories(filters: { id: { eq: "${id}" } }) {
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
    }`;
}
