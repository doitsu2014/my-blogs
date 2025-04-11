import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import {
  buildGetCategoryIdsBySlugs,
  buildGetCategoryIdsFromTranslationsBySlugs
} from '@/infrastructure/graphQL/queries/categories/get-category-ids-by-slugs';
import { Metadata } from 'next';
import { BookOpenText } from 'lucide-react'; // Import the BookOpenText icon
import { CategoryModel } from '@/domains/category';
import {
  getPostsByCategoryId,
  getPostsWithTranslationsByCategoryId
} from '../server-actions/post.actions';
import { getLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import buildGetCategoryByIdQuery, {
  buildGetCategoryWithTranslationsByIdQuery
} from '@/infrastructure/graphQL/queries/categories/get-categories-by-id';
import { mapGraphQlModelToCategoryModel } from '@/infrastructure/graphQL/utilities';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const hostname = process.env.PROXY_HOST || 'https://ducth.dev';
  const locale = await getLocale();
  const isDefaultLocale = locale === routing.defaultLocale;

  const categoryId = await (isDefaultLocale
    ? getCategoryIdBySlug(categorySlug)
    : getCategoryIdFromTranslationBySlug(categorySlug));

  if (!categoryId) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
      keywords: 'not found, category'
    };
  }

  const category = isDefaultLocale
    ? await getCategoryById(categoryId)
    : await getCategoryWithTranslationsById(categoryId);

  const categoryDisplayName = isDefaultLocale
    ? category?.displayName
    : category?.categoryTranslations?.find((translation) => translation.languageCode === locale)
        ?.displayName;

  const categoryDescription = `Explore blogs in the ${categoryDisplayName} category.`;
  const categoryTags = category?.categoryTags?.map(t => t.name)?.join(', ') || ''; // Join tags with commas

  return {
    title: `Website - ducth.dev - ${categoryDisplayName}`,
    description: categoryDescription,
    keywords: categoryTags,
    openGraph: {
      title: categoryDisplayName,
      description: categoryDescription,
      type: 'website',
      url: `${hostname}/${locale}/${categorySlug}`
    },
    twitter: {
      card: 'summary',
      title: categoryDisplayName,
      description: categoryDescription
    }
  };
}

export default async function CategoryDetailPage({
  params
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const locale = await getLocale();
  const isDefaultLocale = locale === routing.defaultLocale;
  const t = await getTranslations('categoryDetail');

  const { categorySlug } = await params;
  const categoryId = await (isDefaultLocale
    ? getCategoryIdBySlug(categorySlug)
    : getCategoryIdFromTranslationBySlug(categorySlug));

  if (!categoryId) {
    return notFound();
  }

  const category = isDefaultLocale
    ? await getCategoryById(categoryId)
    : await getCategoryWithTranslationsById(categoryId);

  const categoryDisplayName = isDefaultLocale
    ? category?.displayName
    : category?.categoryTranslations?.find((translation) => translation.languageCode === locale)
        ?.displayName;

  const posts = isDefaultLocale
    ? await getPostsByCategoryId(categoryId)
    : await getPostsWithTranslationsByCategoryId(categoryId);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-base-100">
      <div className="hero mb-8 bg-base-200 rounded-box p-6">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">{categoryDisplayName}</h1>
            <div className="badge badge-primary badge-lg">{categorySlug}</div>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {posts
          .filter((post) => {
            const matchedTranslation = post.postTranslations?.find(
              (translation) => translation.languageCode === locale
            );
            return isDefaultLocale ? post : matchedTranslation;
          })
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by createdAt descending
          .map((post) => {
            // Format the date (assuming post.createdAt exists)
            const createdDate = post.createdAt
              ? new Date(post.createdAt).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              : 'Unknown date';

            const matchedTranslation = post.postTranslations?.find(
              (translation) => translation.languageCode === locale
            );

            const postSlug = isDefaultLocale ? post.slug : matchedTranslation?.slug || post.slug;
            const postTitle = isDefaultLocale
              ? post.title
              : matchedTranslation?.title || post.title;
            const postPreviewContent = isDefaultLocale
              ? post.previewContent
              : matchedTranslation?.previewContent || post.previewContent;
            const postThumbnail = post.thumbnailPaths[0] || 'https://picsum.photos/300/200'; // Placeholder if no thumbnail

            return (
              <li key={post.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <figure>
                  <img src={postThumbnail} alt={postTitle} className="w-full h-48 object-cover" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-primary">{postTitle}</h2>
                  <p className="text-base-content my-2">{postPreviewContent}</p>
                  <div className="flex justify-between items-center flex-wrap gap-2 mt-2">
                    <span className="badge badge-secondary badge-outline">{createdDate}</span>
                    <a
                      href={`/${locale}/${categorySlug}/${postSlug}`}
                      className="btn btn-primary btn-sm">
                      {t('readMore')}
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

const getCategoryIdBySlug = async (categorySlug: string): Promise<string> => {
  try {
    const res = await buildGraphQLClient().query({
      query: buildGetCategoryIdsBySlugs([categorySlug])
    });
    return res.data.categories.nodes[0]?.id;
  } catch (error) {
    console.error('Error fetching category ID by slug:', error);
    throw new Error('Failed to fetch category ID');
  }
};

const getCategoryIdFromTranslationBySlug = async (categorySlug: string): Promise<string> => {
  try {
    const res = await buildGraphQLClient().query({
      query: buildGetCategoryIdsFromTranslationsBySlugs([categorySlug])
    });
    return res.data.categoryTranslations.nodes[0]?.categoryId;
  } catch (error) {
    console.error('Error fetching category ID from translation by slug:', error);
    throw new Error('Failed to fetch category ID from translation');
  }
};

const getCategoryById = async (categoryId: string): Promise<CategoryModel | undefined> => {
  const res = await buildGraphQLClient().query({
    query: buildGetCategoryByIdQuery(categoryId)
  });
  return res.data.categories.nodes[0]
    ? mapGraphQlModelToCategoryModel(res.data.categories.nodes[0])
    : undefined;
};

const getCategoryWithTranslationsById = async (
  categoryId: string
): Promise<CategoryModel | undefined> => {
  const res = await buildGraphQLClient().query({
    query: buildGetCategoryWithTranslationsByIdQuery(categoryId)
  });
  return res.data.categories.nodes[0]
    ? mapGraphQlModelToCategoryModel(res.data.categories.nodes[0])
    : undefined;
};
