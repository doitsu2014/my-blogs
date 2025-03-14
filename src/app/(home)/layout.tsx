import Loading from './loading';
import { Suspense } from 'react';
import Navbar from '../components/navbar';
import { CategoryModel } from '@/domains/category';
import client, { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQlClient';
import { gql } from '@apollo/client';

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
  const res = await client.query({
    query: gql`
      {
        categories(filters: { categoryType: { eq: BLOG }, parentId: { is_null: "true" } }) {
          nodes {
            id
            displayName
            slug
            categoryType
            createdBy
            createdAt
            rowVersion
            categoryTags {
              nodes {
                tags {
                  id
                  name
                  slug
                }
              }
            }
          }
        }
      }
    `
  });
  return res.data.categories.nodes.map(mapGraphQlModelToCategoryModel);
};
