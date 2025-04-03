import { PostModel } from '@/domains/post';
import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetPostBySlugQuery, {
  buildGetPostIdBySlugQuery
} from '@/infrastructure/graphQL/queries/posts/get-post-by-slug';
import { mapGraphQlModelToPostModel } from '@/infrastructure/graphQL/utilities';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // Importing an icon from lucide-react

import 'quill/dist/quill.snow.css';
import 'highlight.js/styles/github-dark.min.css';
import { getHomePageCacheEnabled } from '@/infrastructure/utilities';
import { getLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

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

  const { categorySlug, blogSlug } = await params;
  const postId = await (isDefaultLocale
    ? getPostIdBySlug(blogSlug)
    : getPostIdFromTranslationsBySlug(blogSlug));

  const blog = await getBlogBySlug(blogSlug);

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-100 text-base-content p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <meta name="keywords" content={blog.postTags.join(', ')} />
        <div
          className="ql-editor !prose !max-w-full w-full"
          dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        <div className="flex justify-between items-center w-full mt-4 text-sm">
          <p className="border border-base-400 rounded p-2">By {blog.createdBy}</p>
          <p className="border border-base-400 rounded p-2">
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex justify-end w-full mt-4">
          <Link
            href={`/categories/${categorySlug}`}
            className="btn btn-primary btn-sm flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

const getPostIdBySlug = async (blogSlug: string): Promise<PostModel> => {
  const res = await buildGraphQLClient().query({
    // CURRENT
    query: buildGetPostIdBySlugQuery(blogSlug),
    fetchPolicy: getHomePageCacheEnabled() ? 'cache-first' : 'no-cache'
  });

  return res.data.posts.nodes.map(mapGraphQlModelToPostModel)[0];
};

const getBlogBySlug = async (blogSlug: string): Promise<PostModel> => {
  const res = await buildGraphQLClient().query({
    query: buildGetPostBySlugQuery(blogSlug),
    fetchPolicy: getHomePageCacheEnabled() ? 'cache-first' : 'no-cache'
  });

  return res.data.posts.nodes.map(mapGraphQlModelToPostModel)[0];
};
