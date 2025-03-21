import { gql } from "@apollo/client";

export default function buildGetCategoryIdsBySlugs(slugs: string[]) {
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