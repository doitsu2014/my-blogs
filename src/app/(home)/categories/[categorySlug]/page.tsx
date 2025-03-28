import { PostModel } from '@/domains/post';
import { buildGraphQLClient } from '@/infrastructure/graphQL/graphql-client';
import buildGetCategoryIdsBySlugs from '@/infrastructure/graphQL/queries/categories/get-category-ids-by-slugs';
import buildGetPostsByCategoryIds from '@/infrastructure/graphQL/queries/posts/get-posts-by-category-ids';
import { mapGraphQlModelToPostModel } from '@/infrastructure/graphQL/utilities';
import { Metadata } from 'next';
import { BookOpenText } from 'lucide-react'; // Import the BookOpenText icon
import { CategoryModel } from '@/domains/category';
import { getPostsByCategoryId } from '../../server-actions/post.actions';

export const metadata: Metadata = {
  title: 'My Blogs - Category Detail Page',
  description: 'There is my blogs website, and the page is blog detail'
};

export default async function CategoryDetailPage({
  params
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  const posts = await getPostsByCategoryId(category.id);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-base-100">
      <div className="hero mb-8 bg-base-200 rounded-box p-6">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Blogs in {category.displayName}</h1>
            <div className="badge badge-primary badge-lg">{categorySlug}</div>
          </div>
        </div>
      </div>

      <ul className="timeline timeline-vertical w-full max-w-3xl">
        {posts.map((post, index) => {
          // Format the date (assuming post.createdAt exists)
          const createdDate = post.createdAt
            ? new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            : 'Unknown date';

          return (
            <li key={post.id}>
              {/* Add connecting line except for the last item */}
              {index > 0 && <hr />}

              {/* Apply timeline-start only for even indexed posts */}
              {index % 2 === 0 && (
                <div className="timeline-start timeline-box bg-base-200 hover:bg-base-300 transition-colors duration-300 shadow-xl p-4">
                  <h2 className="font-bold text-lg text-primary">{post.title}</h2>
                  <p className="text-base-content my-2">{post.previewContent}</p>
                  <div className="flex justify-between items-center flex-wrap gap-2 mt-2">
                    <span className="badge badge-secondary badge-outline">{createdDate}</span>
                    <a
                      href={`/categories/${categorySlug}/blogs/${post.slug}`}
                      className="btn btn-primary btn-sm">
                      Read More
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
                  <h2 className="font-bold text-lg text-accent">{post.title}</h2>
                  <p className="text-base-content my-2">{post.previewContent}</p>
                  <div className="flex justify-between items-center flex-wrap gap-2 mt-2">
                    <span className="badge badge-primary badge-outline">{createdDate}</span>
                    <a
                      href={`/categories/${categorySlug}/blogs/${post.slug}`}
                      className="btn btn-secondary btn-sm">
                      Read More
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

const getCategoryBySlug = async (categorySlug: string): Promise<CategoryModel> => {
  const res = await buildGraphQLClient().query({
    query: buildGetCategoryIdsBySlugs([categorySlug])
  });
  return res.data.categories.nodes[0];
};
