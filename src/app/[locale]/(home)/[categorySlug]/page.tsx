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
  params: { categorySlug: string };
}): Promise<Metadata> {
  const { categorySlug } = params;
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
  const categoryTags = category?.categoryTags.join(', '); // Join tags with commas

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

      <ul className="timeline timeline-vertical w-full max-w-3xl">
        {posts
          .filter((post) => {
            const matchedTranslation = post.postTranslations?.find(
              (translation) => translation.languageCode === locale
            );
            return isDefaultLocale ? post : matchedTranslation;
          })
          .map((post, index) => {
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

            return (
              <li key={post.id}>
                {/* Add connecting line except for the last item */}
                {index > 0 && <hr />}

                {/* Apply timeline-start only for even indexed posts */}
                {index % 2 === 0 && (
                  <div className="timeline-start timeline-box bg-base-200 hover:bg-base-300 transition-colors duration-300 shadow-xl p-4">
                    <h2 className="font-bold text-lg text-primary">{postTitle}</h2>
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
                )}

                {/* Middle icon */}
                <div className="timeline-middle">
                  <div
                    className={`p-2 rounded-full ${
                      index % 2 === 0
                        ? 'bg-primary text-primary-content'
                        : 'bg-secondary text-secondary-content'
                    }`}>
                    <BookOpenText size={18} />
                  </div>
                </div>

                {/* Apply timeline-end only for odd indexed posts */}
                {index % 2 === 1 && (
                  <div className="timeline-end timeline-box bg-base-200 hover:bg-base-300 transition-colors duration-300 shadow-xl p-4">
                    <h2 className="font-bold text-lg text-accent">{postTitle}</h2>
                    <p className="text-base-content my-2">{postPreviewContent}</p>
                    <div className="flex justify-between items-center flex-wrap gap-2 mt-2">
                      <span className="badge badge-primary badge-outline">{createdDate}</span>
                      <a
                        href={`/${locale}/${categorySlug}/${postSlug}`}
                        className="btn btn-secondary btn-sm">
                        {t('readMore')}
                      </a>
                    </div>
                  </div>
                )}

                {/* Add connecting line except for the last item */}
                {index < posts.length - 1 && <hr />}
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

const getCategoryById = async (categoryId: string): Promise<CategoryModel> => {
  const res = await buildGraphQLClient().query({
    query: buildGetCategoryByIdQuery(categoryId)
  });
  return res.data.categories.nodes[0];
};

const getCategoryWithTranslationsById = async (
  categoryId: string
): Promise<CategoryModel | undefined> => {
  const res = await buildGraphQLClient().query({
    query: buildGetCategoryWithTranslationsByIdQuery(categoryId)
  });
  return mapGraphQlModelToCategoryModel(res.data.categories.nodes[0]);
};
