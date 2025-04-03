import { PostInFooterModel, PostModel } from '@/domains/post';
import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetPostsByCategoryIds, {
  buildGetPostsByCategoryIdsInFooter,
  buildGetPostsWithTranslationsByCategoryIds
} from '@/infrastructure/graphQL/queries/posts/get-posts-by-category-ids';
import { mapGraphQlModelToPostInFooterModel, mapGraphQlModelToPostModel } from '@/infrastructure/graphQL/utilities';
import { getBlogCategoryIds } from './category.actions';
import { getHomePageCacheEnabled } from '@/infrastructure/utilities';

export const getAllBlogPostsInFooter = async (): Promise<PostInFooterModel[]> => {
  const blogCategoryIds = await getBlogCategoryIds();
  const res = await buildGraphQLClient().query({
    query: buildGetPostsByCategoryIdsInFooter([...blogCategoryIds], true),
    fetchPolicy: getHomePageCacheEnabled() ? 'cache-first' : 'no-cache'
  });
  return res.data.posts.nodes.map(mapGraphQlModelToPostInFooterModel);
};

export const getPostsByCategoryId = async (categoryId: string): Promise<PostModel[]> => {
  const res = await buildGraphQLClient().query({
    query: buildGetPostsByCategoryIds([categoryId], true),
    fetchPolicy: getHomePageCacheEnabled() ? 'cache-first' : 'no-cache'
  });
  return res.data.posts.nodes.map(mapGraphQlModelToPostModel);
};

export const getPostsWithTranslationsByCategoryId = async (
  categoryId: string
): Promise<PostModel[]> => {
  const res = await buildGraphQLClient().query({
    query: buildGetPostsWithTranslationsByCategoryIds([categoryId], true),
    fetchPolicy: getHomePageCacheEnabled() ? 'no-cache' : 'no-cache'
  });
  return res.data.posts.nodes.map(mapGraphQlModelToPostModel);
};
