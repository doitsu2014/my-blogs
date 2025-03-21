import { CategoryTypeEnum } from '@/domains/category';
import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetCategoriesQuery from '@/infrastructure/graphQL/queries/categories/get-categories';
import { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQL/utilities';
import { buildHeader } from '@/infrastructure/utilities.auth';
import { gql } from '@apollo/client';
import { CreateCategoryModel } from './models/CreateCategoryModel';
import { UpdateCategoryModel } from './models/UpdateCategoryModel';

const apiUrl = process.env.MY_CMS_API_URL;

export async function POST(req: Request) {
  const body: CreateCategoryModel = await req.json();

  const result = await fetch(`${apiUrl}/categories`, {
    method: 'POST',
    headers: await buildHeader(),
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

export async function PUT(req: Request) {
  const body: UpdateCategoryModel = await req.json();

  const result = await fetch(`${apiUrl}/categories`, {
    method: 'PUT',
    headers: await buildHeader(),
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
    const { data } = await buildGraphQLClient().query({
      query: buildGetCategoriesQuery(),
      fetchPolicy: 'no-cache'
    });
    return Response.json((data?.categories?.nodes || []).map(mapGraphQlModelToCategoryModel));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return Response.json([]);
  }
}
