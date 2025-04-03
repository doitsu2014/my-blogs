import { PostModel } from '@/domains/post';
import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetPostBySlugQuery, {
  buildGetPostIdBySlugQuery,
  buildGetPostIdFromTranslationsBySlugQuery
} from '@/infrastructure/graphQL/queries/posts/get-post-by-slug';
import { mapGraphQlModelToPostModel } from '@/infrastructure/graphQL/utilities';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // Importing an icon from lucide-react

import 'quill/dist/quill.snow.css';
import 'highlight.js/styles/github-dark.min.css';
import { getHomePageCacheEnabled } from '@/infrastructure/utilities';
import { getLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import buildGetPostByIdQuery from '@/infrastructure/graphQL/queries/posts/get-post-by-id';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'My Blogs - Blog Detail Page',
  description: 'There is my blogs website, and the page is blog detail',
  openGraph: {
    title: 'My Blogs - Blog Detail Page',
    description: 'Read this blog post on My Blogs website.',
    type: 'article',
    url: 'https://ducth.dev', // Replace with your actual site URL
    images: [
      {
        url: '/images/duc-tran.png',
        width: 1200,
        height: 630,
        alt: 'Blog Thumbnail'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Blogs - Blog Detail Page',
    description: 'Read this blog post on My Blogs website.',
    images: ['https://ducth.dev/images/duc-tran.png'] // Replace with a default thumbnail URL
  }
};

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ categorySlug: string; blogSlug: string }>;
}) {
  const locale = await getLocale(); // Assuming the locale is 'en' for this example
  const isDefaultLocale = locale === routing.defaultLocale; // Replace with your actual default locale check
  const t = await getTranslations('blogDetail'); // Assuming you have a translation function

  const { categorySlug, blogSlug } = await params;
  const postId = await (isDefaultLocale
    ? getPostIdBySlug(blogSlug)
    : getPostIdFromTranslationsBySlug(blogSlug));

  if(!postId)
  {
    return notFound();
  }

  const blog = await getBlogById(postId);
  const translation = blog.postTranslations.find(
    (translation) => translation.languageCode === locale
  );
  const blogTitle = isDefaultLocale ? blog.title : translation?.title || blog.title;
  const blogContent = isDefaultLocale ? blog.content : translation?.content || blog.content;

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-100 text-base-content p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">{blogTitle}</h1>
        <meta name="keywords" content={blog.postTags.join(', ')} />
        <div
          className="ql-editor !prose !max-w-full w-full"
          dangerouslySetInnerHTML={{ __html: blogContent }}></div>
        <div className="flex justify-between items-center w-full mt-4 text-sm">
          <p className="border border-base-400 rounded p-2">{t('by')} {blog.createdBy}</p>
          <p className="border border-base-400 rounded p-2">
            {t('publishedOn')} {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex justify-end w-full mt-4">
          <Link
            href={`/${categorySlug}`}
            className="btn btn-primary btn-sm flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('backToCategory')}
          </Link>
        </div>
      </div>
    </div>
  );
}

const getPostIdBySlug = async (blogSlug: string): Promise<string> => {
  const res = await buildGraphQLClient().query({
    // CURRENT
    query: buildGetPostIdBySlugQuery(blogSlug),
    fetchPolicy: getHomePageCacheEnabled() ? 'cache-first' : 'no-cache',
  });

  return res.data.posts.nodes.map(mapGraphQlModelToPostModel)[0].id;
};

const getPostIdFromTranslationsBySlug = async (blogSlug: string): Promise<string> => {
  const res = await buildGraphQLClient().query({
    // CURRENT
    query: buildGetPostIdFromTranslationsBySlugQuery(blogSlug),
    fetchPolicy: getHomePageCacheEnabled() ? 'cache-first' : 'no-cache',
  });

  return res.data.postTranslations?.nodes[0]?.postId;
};

const getBlogById = async (id: string): Promise<PostModel> => {
  const res = await buildGraphQLClient().query({
    query: buildGetPostByIdQuery(id),
    fetchPolicy: getHomePageCacheEnabled() ? 'cache-first' : 'no-cache',
  });

  return res.data.posts.nodes.map(mapGraphQlModelToPostModel)[0];
};
