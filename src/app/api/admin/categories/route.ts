import { auth } from '@/auth';
import { CategoryModel, CategoryTypeEnum } from '@/domains/category';
import client, { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQlClient';
import { gql } from '@apollo/client';

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

export async function POST(req: Request) {
  const session = await auth();
  return new Response('XYZ', { status: 200 });
}

export class UpdateCategoryModel {
  id: string;
  displayName: string;
  categoryType: CategoryTypeEnum;
  tagNames: string[];
  rowVersion: number;

  constructor(
    id: string,
    displayName: string,
    categoryType: CategoryTypeEnum,
    tagNames: string[],
    rowVersion: number
  ) {
    this.id = id;
    this.displayName = displayName;
    this.categoryType = categoryType;
    this.tagNames = tagNames;
    this.rowVersion = rowVersion;
  }
}

export const updateCategory = async (category: UpdateCategoryModel) => {
  console.log('category', category);
};

export async function PUT(req: Request) {}

export const GET = async () => {
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
    return Response.json((data?.categories?.nodes || []).map(mapGraphQlModelToCategoryModel));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return Response.json([]);
  }
};
