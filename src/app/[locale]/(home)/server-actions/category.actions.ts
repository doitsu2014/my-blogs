import { CategoryModel } from '@/domains/category';
import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetBlogCategoriesQuery from '@/infrastructure/graphQL/queries/categories/get-blog-categories';
import buildGetBlogCategoryIdsQuery from '@/infrastructure/graphQL/queries/categories/get-blog-category-ids';
import { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQL/utilities';

export const getCategories = async (): Promise<CategoryModel[]> => {
  try {
    const res = await buildGraphQLClient().query({
      query: buildGetBlogCategoriesQuery(),
      fetchPolicy: 'no-cache'
    });

    if (res.errors) {
      console.error(res.errors);
      return [];
    } else {
      return res.data.categories.nodes.map(mapGraphQlModelToCategoryModel);
    }
  } catch (ex) {
    console.error(ex);
    return [];
  }
};

export const getBlogCategoryIds = async (): Promise<string[]> => {
  try {
    const res = await buildGraphQLClient().query({
      query: buildGetBlogCategoryIdsQuery(),
      fetchPolicy: 'no-cache'
    });

    if (res.errors) {
      console.error(res.errors);
      return [];
    } else {
      return res.data.categories.nodes.map((c: any) => c.id);
    }
  } catch (ex) {
    console.error(ex);
    return [];
  }
};
