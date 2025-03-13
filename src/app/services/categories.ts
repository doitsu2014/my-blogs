import { gql } from '@apollo/client';
import client from './graphQlClient';
import { TagModel } from './tags';
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';

const API_URL = process.env.MY_CMS_API_URL;

export enum CategoryTypeEnum {
  Blog = 'BLOG',
  Other = 'OTHER'
}

export class CategoryModel {
  id: string;
  parentId: string | undefined;
  displayName: string;
  slug: string;
  categoryType: CategoryTypeEnum;
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
    categoryType: CategoryTypeEnum,
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


export class CreateCategoryModel {
  displayName: string;
  categoryType: CategoryTypeEnum;
  tagNames: string[];

  constructor(displayName: string, categoryType: CategoryTypeEnum, tagNames: string[]) {
    this.displayName = displayName;
    this.categoryType = categoryType;
    this.tagNames = tagNames;
  }
}

export const createCategory = async (category: CreateCategoryModel) => {
  const session = await auth();
  const request = JSON.stringify({
    ...category,
    categoryType: category.categoryType === CategoryTypeEnum.Blog ? 'Blog' : 'Other'
  });
  console.log(session?.accessToken)

  const result = await fetch(`${API_URL}/api/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`
    },
    body: request
  });
  console.log(result);
  return;
};

export class UpdateCategoryModel {
  id: string;
  displayName: string;
  categoryType: CategoryTypeEnum;
  tagNames: string[];
  rowVersion: number;

  constructor(id: string, displayName: string, categoryType: CategoryTypeEnum, tagNames: string[], rowVersion: number) {
    this.id = id;
    this.displayName = displayName;
    this.categoryType = categoryType;
    this.tagNames = tagNames;
    this.rowVersion = rowVersion;
  }
}

export const updateCategory = async (category: CreateCategoryModel) => {
  console.log('category', category);
};