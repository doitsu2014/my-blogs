import { gql } from '@apollo/client';
import client from './graphQlClient';

export async function getCategories() {
  const res = await client.query({
    query: gql`
      {
        categories(filters: { categoryType: { eq: BLOG }, parentId: { is_null: "true" } }) {
          nodes {
            id
            parentId
            displayName
            selfRefReverse {
              nodes {
                id
                parentId
                displayName
              }
            }
          }
        }
      }
    `
  });

  return res.data.categories.nodes;
}
