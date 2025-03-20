'use client';

import { PostModel } from '@/domains/post';
import { useEffect, useState } from 'react';
import Breadcrumbs from '../components/my-breadcrumbs';
import { Home, Info, Link, Pencil, Search, Trash2 } from 'lucide-react';
import TableSkeleton from '../components/skeleton/table-skeleton';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<PostModel[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setPageLoading(true);
        // Replace with your actual API call
        const response = await fetch('/api/admin/blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setPageLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog => 
    blog.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin', icon: <Home className="w-4 h-4" /> },
          { label: 'Blogs' }
        ]}
      />

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <a href="/admin/blogs/create" className="btn btn-primary">
          + Create Blog
        </a>
      </div>

      <div className="mb-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by ID, Title..."
            className="input input-bordered w-full pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="bg-base-100">
        {pageLoading ? (
          <TableSkeleton columns={11} rows={5} showHeader={true} className="w-full" />
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-300 text-base-content">
                <th>ID</th>
                <th>Title</th>
                <th>Preview</th>
                <th>Slug</th>
                <th>Category</th>
                <th>Status</th>
                <th>Tags</th>
                <th>Modified By</th>
                <th>Last Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id}>
                    <td className="p-3 font-semibold">
                      <div className="flex items-center gap-1">
                        {blog.id.substring(0, 8)}
                        <div className="tooltip" data-tip={blog.id}>
                          <Info className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-semibold">
                      <div className="max-w-xs truncate">{blog.title}</div>
                      {blog.thumbnailPaths && blog.thumbnailPaths.length > 0 && (
                        <div className="avatar mt-1">
                          <div className="w-8 rounded">
                            <img src={blog.thumbnailPaths[0]} alt="Thumbnail" />
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="max-w-xs truncate text-sm">{blog.previewContent}</div>
                    </td>
                    <td className="text-sm">{blog.slug}</td>
                    <td>{blog.categoryDisplayName || 'Uncategorized'}</td>
                    <td>
                      <div className={`badge ${blog.published ? 'badge-success' : 'badge-ghost'}`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {blog.postTags &&
                          blog.postTags.map((tag) => (
                            <span key={tag.id} className="badge badge-sm">
                              {tag.name}
                            </span>
                          ))}
                      </div>
                    </td>
                    <td className="text-sm">{blog.lastModifiedBy}</td>
                    <td className="text-sm">{new Date(blog.lastModifiedAt).toLocaleDateString()}</td>
                    <td>
                      <div className="flex gap-2">
                        <a href={`/admin/blogs/${blog.id}/edit`} className="btn btn-sm btn-outline">
                          <Pencil className="w-4 h-4" />
                        </a>
                        <button className="btn btn-sm btn-outline btn-error">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-4">
                    No blogs found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
