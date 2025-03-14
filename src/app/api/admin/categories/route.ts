import { auth } from '@/auth';
import { CategoryModel, CategoryTypeEnum } from '@/domains/category';
import client, { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQlClient';
import { getFetchHeaderWithAuthorization } from '@/infrastructure/utilities.auth';
import { gql } from '@apollo/client';
import { Update } from 'next/dist/build/swc/types';
import { NextRequest } from 'next/server';

const apiUrl = process.env.MY_CMS_API_URL;

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
  const body: CreateCategoryModel = await req.json();

  const result = await fetch(`${apiUrl}/categories`, {
    method: 'POST',
    headers: await getFetchHeaderWithAuthorization(),
    body: JSON.stringify({
      ...body,
      categoryType: body.categoryType === CategoryTypeEnum.Blog ? 'Blog' : 'Other'
    })
  });

  if (result.ok) {
    return new Response(JSON.stringify(await result.json()), { status: 200 });
  }

  return new Response(await result.text(), {
    status: result.status
  });
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

export async function PUT(req: Request) {
  const body: UpdateCategoryModel = await req.json();

  const result = await fetch(`${apiUrl}/categories`, {
    method: 'PUT',
    headers: await getFetchHeaderWithAuthorization(),
    body: JSON.stringify({
      ...body,
      categoryType: body.categoryType === CategoryTypeEnum.Blog ? 'Blog' : 'Other'
    })
  });

  if (result.ok) {
    return new Response(JSON.stringify(await result.json()), { status: 200 });
  }

  return new Response(await result.text(), {
    status: result.status
  });
}

export async function GET(req: Request) {
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
      `,
      fetchPolicy: 'no-cache'
    });
    return Response.json((data?.categories?.nodes || []).map(mapGraphQlModelToCategoryModel));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return Response.json([]);
  }
}
