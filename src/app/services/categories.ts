import { gql } from '@apollo/client';
import client from './graphQlClient';

export class CategoryModel {
  id: string;
  parentId: string | undefined;
  displayName: string;
  slug: string;
  selfRefReverse: CategoryModel[];

  constructor(
    id: string,
    parentId: string,
    displayName: string,
    slug: string,
    selfRefReverse: CategoryModel[]
  ) {
    this.id = id;
    this.parentId = parentId;
    this.displayName = displayName;
    this.slug = slug;
    this.selfRefReverse = selfRefReverse;
  }
}

export async function getCategories(): Promise<CategoryModel[]> {
  const res = await client.query({
    query: gql`
      {
        categories(filters: { categoryType: { eq: BLOG }, parentId: { is_null: "true" } }) {
          nodes {
            id
            parentId
            displayName
            slug
            selfRefReverse {
              nodes {
                id
                displayName
                slug
              }
            }
          }
        }
      }
    `
  });

  return res.data.categories.nodes;
}
