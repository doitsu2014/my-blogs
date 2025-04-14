import { routing } from "@/i18n/routing";
import { buildGraphQLClient } from "@/infrastructure/graphQL/graphql-client";
import buildGetPostsBySearchValueQuery, { buildGetPostsWithTranslationBySearchValueQuery } from "@/infrastructure/graphQL/queries/posts/get-posts-by-search-value";
import { mapGraphQlModelToPostModel } from "@/infrastructure/graphQL/utilities";

export interface SearchResultModel {
  title: string;
  previewContent: string;
  thumbnailPaths: string[];
  slug: string;
  published: boolean;
  createdBy: string;
  createdAt: string;
  categorySlug: string;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchValue = url.searchParams.get('searchValue');
  const locale = url.searchParams.get('locale') || routing.defaultLocale;
  const isDefaultLocale = locale === routing.defaultLocale;

  if (!searchValue) {
    return Response.json([]);
  }

  if (searchValue.length < 3) {
    return Response.json([]);
  }

  try {
    if (isDefaultLocale) {
      const { data } = await buildGraphQLClient().query({
        query: buildGetPostsBySearchValueQuery(searchValue),
        fetchPolicy: 'no-cache'
      });
      return Response.json((data?.posts?.nodes || []).map((e: any) => {
        const { categories, ...rest } = e;
        const result: SearchResultModel = {
          ...rest,
          categorySlug: categories?.slug
        };
        return result;
      }));
    }
    else {
      const { data } = await buildGraphQLClient().query({
        query: buildGetPostsWithTranslationBySearchValueQuery(searchValue, locale),
        fetchPolicy: 'no-cache'
      });

      return Response.json((data?.postTranslations?.nodes || []).map((e: any) => {
        const result: SearchResultModel = {
          ...e,
          categorySlug: e.posts.categories?.categoryTranslations?.nodes[0]?.slug || '',
          createdAt: new Date(e.posts.createdAt).toISOString(),
          published: e.posts.published,
          thumbnailPaths: e.posts.thumbnailPaths || [],
        };
        return result;
      }).filter((e: SearchResultModel) => e.published));
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return Response.json([]);
  }
}