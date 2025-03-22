import Link from 'next/link';
import NavbarItem from './navbar-item';
import Image from 'next/image';
import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetBlogCategoriesQuery from '@/infrastructure/graphQL/queries/categories/get-blog-categories';
import { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQL/utilities';
import { CategoryModel } from '@/domains/category';

export default async function Navbar() {
  const categories = await getCategories();
  const links = categories.map((category) => ({
    id: category.id,
    displayName: category.displayName,
    slug: category.slug
  }));

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          <div className="w-10 rounded-full">
            <Image
              src="/images/doitsu-technology-logo.png"
              width={45}
              height={45}
              className="mr-3"
              alt="D Tech"
            />
          </div>
          Duc Tran
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-1">
          {links.map((link) => (
            <li key={link.id}>
              <NavbarItem
                slug={`/categories/${link.slug}`}
                displayName={link.displayName}
                key={link.id}></NavbarItem>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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