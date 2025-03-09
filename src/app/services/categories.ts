import { gql } from '@apollo/client';
import client from './graphQlClient';
import { TagModel } from './tags';

export enum CategoryTypeEnum {
  Blog,
  Other
}

export class CategoryModel {
  id: string;
  parentId: string | undefined;
  displayName: string;
  slug: string;
  categoryType: string;
  categoryTypeEnum: CategoryTypeEnum;
  selfRefReverse: CategoryModel[];
  createdBy: string;
  createdAt: string;
  categoryTags: TagModel[];
  rowVersion: number;

  constructor(
    id: string,
    parentId: string | undefined,
    displayName: string,
    slug: string,
    categoryType: string,
    createdBy: string,
    createdAt: string,
    selfRefReverse: CategoryModel[],
    categoryTags: TagModel[],
    rowVersion: number
  ) {
    this.id = id;
    this.parentId = parentId;
    this.displayName = displayName;
    this.slug = slug;
    this.selfRefReverse = selfRefReverse;
    this.categoryType = categoryType;
    this.categoryTypeEnum =
      categoryType === 'BLOG' || categoryType === 'Blog'
        ? CategoryTypeEnum.Blog
        : CategoryTypeEnum.Other;
    this.categoryTags = categoryTags;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.rowVersion = rowVersion;
  }
}

export async function getBlogCategories(): Promise<CategoryModel[]> {
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

  return res.data.categories.nodes.map(mapGraphQlModelToCategoryModel);
}

export const getAllCategories = async (): Promise<CategoryModel[]> => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetCategories {
          categories {
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
    return (data?.categories?.nodes || []).map(mapGraphQlModelToCategoryModel);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCategoryById = async (id: string): Promise<CategoryModel | undefined> => {
  const query = gql`
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
  try {
    const { data } = await client.query({
      query
    });
    return (data?.categories?.nodes || []).map(mapGraphQlModelToCategoryModel)[0];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return undefined;
  }
};

const mapGraphQlModelToCategoryModel = (
  graphqlNode: any | undefined
): CategoryModel | undefined => {
  return !!graphqlNode
    ? new CategoryModel(
        graphqlNode.id,
        undefined,
        graphqlNode.displayName,
        graphqlNode.slug,
        graphqlNode.categoryType,
        graphqlNode.createdBy,
        graphqlNode.createdAt,
        [],
        graphqlNode.categoryTags.nodes.map((node: any) => ({
          id: node.tags.id,
          name: node.tags.name,
          slug: node.tags.slug
        })),
        graphqlNode.rowVersion
      )
    : undefined;
};

export const createCategory = async (category: any) => {};
