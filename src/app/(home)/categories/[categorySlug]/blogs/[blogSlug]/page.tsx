import { PostModel } from '@/domains/post';
import graphQLClient from '@/infrastructure/graphQL/graphql-client';
import buildGetPostBySlugQuery from '@/infrastructure/graphQL/queries/posts/get-post-by-slug';
import { mapGraphQlModelToPostModel } from '@/infrastructure/graphQL/utilities';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // Importing an icon from lucide-react

export const metadata: Metadata = {
  title: 'My Blogs - Blog Detail Page',
  description: 'There is my blogs website, and the page is blog detail'
};

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ categorySlug: string; blogSlug: string }>
}) {
  const { categorySlug, blogSlug } = await params;
  const blog = await getBlogBySlug(blogSlug);

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-100 text-base-content p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <div
          className="prose max-w-none w-full"
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

const getBlogBySlug = async (blogSlug: string): Promise<PostModel> => {
  const res = await graphQLClient.query({
    query: buildGetPostBySlugQuery(blogSlug),
    fetchPolicy: 'no-cache'
  });

  return res.data.posts.nodes.map(mapGraphQlModelToPostModel)[0];
};
