import { PostModel } from '@/domains/post';
import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetPostsByCategoryIds from '@/infrastructure/graphQL/queries/posts/get-posts-by-category-ids';
import { mapGraphQlModelToPostModel } from '@/infrastructure/graphQL/utilities';
import { getBlogCategoryIds } from './category.actions';

export const getAllBlogPosts = async (): Promise<PostModel[]> => {
  const blogCategoryIds = await getBlogCategoryIds();
  const res = await buildGraphQLClient().query({
    query: buildGetPostsByCategoryIds([...blogCategoryIds], true),
    fetchPolicy: 'no-cache'
  });
  return res.data.posts.nodes.map(mapGraphQlModelToPostModel);
};

export const getPostsByCategoryId = async (categoryId: string): Promise<PostModel[]> => {
  const res = await buildGraphQLClient().query({
    query: buildGetPostsByCategoryIds([categoryId], true),
    fetchPolicy: 'no-cache'
  });
  return res.data.posts.nodes.map(mapGraphQlModelToPostModel);
};
