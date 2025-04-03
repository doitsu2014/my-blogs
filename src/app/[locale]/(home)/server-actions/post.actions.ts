import { PostModel } from '@/domains/post';
import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetPostsByCategoryIds, { buildGetPostsWithTranslationsByCategoryIds } from '@/infrastructure/graphQL/queries/posts/get-posts-by-category-ids';
import { mapGraphQlModelToPostModel } from '@/infrastructure/graphQL/utilities';
import { getBlogCategoryIds } from './category.actions';
import { getHomePageCacheEnabled } from '@/infrastructure/utilities';

export const getAllBlogPosts = async (): Promise<PostModel[]> => {
  const blogCategoryIds = await getBlogCategoryIds();
  const res = await buildGraphQLClient().query({
    query: buildGetPostsByCategoryIds([...blogCategoryIds], true),
    fetchPolicy: getHomePageCacheEnabled() ? 'cache-first' : 'no-cache'
  });
  return res.data.posts.nodes.map(mapGraphQlModelToPostModel);
};

export const getPostsByCategoryId = async (categoryId: string): Promise<PostModel[]> => {
  const res = await buildGraphQLClient().query({
    query: buildGetPostsByCategoryIds([categoryId], true),
    fetchPolicy: getHomePageCacheEnabled() ? 'cache-first' : 'no-cache'
  });
  return res.data.posts.nodes.map(mapGraphQlModelToPostModel);
};

export const getPostsWithTranslationsByCategoryId = async (categoryId: string): Promise<PostModel[]> => {
  const res = await buildGraphQLClient().query({
    query: buildGetPostsWithTranslationsByCategoryIds([categoryId], true),
    fetchPolicy: getHomePageCacheEnabled() ? 'no-cache' : 'no-cache'
  });
  return res.data.posts.nodes.map(mapGraphQlModelToPostModel);
};
