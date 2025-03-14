import { CategoryModel } from '@/domains/category';
import client, { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQlClient';
import { gql } from '@apollo/client';

export async function GET(request: any) {
  const res = await client.query({
    query: gql`
      {
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
      }
    `
  });
  return res.data.categories.nodes.map(mapGraphQlModelToCategoryModel);
}
