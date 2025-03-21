import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetBlogCategoriesQuery from '@/infrastructure/graphQL/queries/categories/get-blog-categories';
import { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQL/utilities';

export async function GET(req: Request) {
  try {
    const { data } = await buildGraphQLClient().query({
      query: buildGetBlogCategoriesQuery(),
      fetchPolicy: 'no-cache'
    });
    return Response.json((data?.categories?.nodes || []).map(mapGraphQlModelToCategoryModel));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return Response.json([]);
  }
}
