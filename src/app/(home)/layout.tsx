import Loading from './loading';
import { Suspense } from 'react';
import Navbar from '../components/navbar';
import { CategoryModel } from '@/domains/category';
import { gql } from '@apollo/client';
import graphQLClient from '@/infrastructure/graphQL/graphql-client';
import { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQL/utilities';
import buildGetBlogCategoriesQuery from '@/infrastructure/graphQL/queries/categories/get-blog-categories';

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
        }))}
      ></Navbar>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}

const getCategories = async () => {
  const res = await graphQLClient.query({
    query: buildGetBlogCategoriesQuery()
  });
  return res.data.categories.nodes.map(mapGraphQlModelToCategoryModel);
};
