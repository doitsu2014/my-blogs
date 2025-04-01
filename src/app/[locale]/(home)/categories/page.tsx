import { CategoryModel } from '@/domains/category';
import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetBlogCategoriesQuery from '@/infrastructure/graphQL/queries/categories/get-blog-categories';
import { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQL/utilities';
import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const getCategories = async (): Promise<CategoryModel[]> => {
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

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Blog Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{category.displayName}</h2>
              <div className="card-actions justify-end">
                <Link href={`/categories/${category.slug}`}>
                  <button className="btn btn-primary">View Blogs</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
