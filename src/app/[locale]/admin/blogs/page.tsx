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
  const [blogToDelete, setBlogToDelete] = useState<PostModel | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteClick = (blog: PostModel) => {
    setBlogToDelete(blog);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/admin/posts/${blogToDelete.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogToDelete.id));
        setIsDeleteModalOpen(false);
        setBlogToDelete(null);
      } else {
        console.error('Failed to delete blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('An error occurred while deleting the blog.');
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setBlogToDelete(null);
  };

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container max-w-[102rem]'>
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

      <div className="bg-base-100 flex w-full max-w-full overflow-x-auto">
        {pageLoading ? (
          <TableSkeleton columns={11} rows={5} showHeader={true} className="w-full" />
        ) : (
          <table className="table table-zebra">
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
                    <td className="max-w-48 p-3 font-semibold">
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
                      <div className="max-w-32 truncate text-sm">{blog.previewContent}</div>
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
                            <span key={tag.id} className="badge badge-secondary mr-1">
                              {tag.name}
                            </span>
                          ))}
                      </div>
                    </td>
                    <td className="text-sm">{blog.lastModifiedBy}</td>
                    <td className="text-sm">
                      {new Date(blog.lastModifiedAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <a href={`/admin/blogs/edit/${blog.id}`} className="btn btn-sm btn-outline">
                          <Pencil className="w-4 h-4" />
                        </a>
                        <button
                          className="btn btn-sm btn-outline btn-error"
                          onClick={() => handleDeleteClick(blog)}>
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

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete the blog "{blogToDelete?.title}"? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button className="btn btn-outline" onClick={cancelDelete} disabled={isDeleting}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={confirmDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
