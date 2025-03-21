import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetBlogCategoryIdsQuery from '@/infrastructure/graphQL/queries/categories/get-blog-category-ids';
import buildGetPostsByCategoryIds from '@/infrastructure/graphQL/queries/posts/get-posts-by-category-ids';
import { mapGraphQlModelToPostModel } from '@/infrastructure/graphQL/utilities';

export async function GET(req: Request) {
  try {
    const blogCategoryIds = await getBlogCategoryIds();
    const { data } = await buildGraphQLClient().query({
      query: buildGetPostsByCategoryIds(blogCategoryIds),
      fetchPolicy: 'no-cache'
    });
    return Response.json((data?.posts?.nodes || []).map(mapGraphQlModelToPostModel));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return Response.json([]);
  }
}

const getBlogCategoryIds = async (): Promise<string[]> => {
  try {
    const { data } = await buildGraphQLClient().query({
      query: buildGetBlogCategoryIdsQuery(),
      fetchPolicy: 'no-cache'
    });
    return (data?.categories?.nodes || []).map((category: { id: string }) => category.id);
  } catch (error) {
    console.error('Error fetching blog category ids:', error);
    return [];
  }
};
