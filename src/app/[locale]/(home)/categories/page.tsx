import { CategoryModel } from '@/domains/category';
import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetBlogCategoriesQuery from '@/infrastructure/graphQL/queries/categories/get-blog-categories';
import { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQL/utilities';
import React from 'react';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getHomePageCacheEnabled } from '@/infrastructure/utilities';

export const dynamic = 'force-dynamic';

const getCategories = async (): Promise<CategoryModel[]> => {
  try {
    const res = await buildGraphQLClient().query({
      query: buildGetBlogCategoriesQuery(),
      fetchPolicy: getHomePageCacheEnabled() ? 'cache-first' : 'no-cache'
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

export default async function CategoriesPage() {
  const categories = await getCategories();
  const locale = await getLocale();
  const isDefaultLocale = locale === routing.defaultLocale; // Assuming 'en' is the default locale
  const t = await getTranslations('categories');

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const displayName = isDefaultLocale
            ? category.displayName
            : category.categoryTranslations?.find(
                (translation) => translation.languageCode === locale
              )?.displayName;

          const slug = isDefaultLocale
            ? category.slug
            : category.categoryTranslations?.find(
                (translation) => translation.languageCode === locale
              )?.slug;

          return (
            <div key={category.id} className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">{displayName}</h2>
                <div className="card-actions justify-end">
                  <Link href={`/${slug}`}>
                    <button className="btn btn-primary">{t('viewBlogs')}</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
