import { gql } from '@apollo/client';

export default function buildGetCategoryBySlugs(slugs: string[]) {
  return gql`
    query GetCategories {
      categories(filters: { slug: { is_in: ${JSON.stringify(slugs)} } }) {
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

export function buildGetCategoryFromTranslationsBySlugs(slugs: string[]) {
  return gql`
    query GetCategoriesFromTranslations {
      categoryTranslations(filters: { slug: { is_in: ${JSON.stringify(slugs)} } }) {
        nodes {
          id
          languageCode
          categoryId
          displayName
          slug
          categories {
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
      }
    }`;
}

export function buildGetCategoryIdsBySlugs(slugs: string[]) {
  return gql`
    query GetCategories {
      categories(filters: { slug: { is_in: ${JSON.stringify(slugs)} } }) {
        nodes {
          id
        }
      }
    }`;
}

export function buildGetCategoryIdsFromTranslationsBySlugs(slugs: string[]) {
  return gql`
    query GetCategories {
      categoryTranslations(filters: { slug: { is_in: ${JSON.stringify(slugs)} } }) {
        nodes {
          categoryId
        }
      }
    }`;
}

