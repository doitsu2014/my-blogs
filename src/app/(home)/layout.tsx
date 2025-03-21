import Loading from './loading';
import { Suspense } from 'react';
import { CategoryModel } from '@/domains/category';
import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQL/utilities';
import buildGetBlogCategoriesQuery from '@/infrastructure/graphQL/queries/categories/get-blog-categories';
import Navbar from './components/navbar';

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories: CategoryModel[] = await getCategories();

  return (
    <>
      {/* {categories[0].id} */}
      <Navbar
        links={categories.map((e) => ({
          id: e.id,
          displayName: e.displayName,
          slug: e.slug
        }))}></Navbar>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}

const getCategories = async () => {
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
