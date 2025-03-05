'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory } from '@/app/services/categories';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function CreateCategoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    displayName: '',
    slug: '',
    categoryType: 'BLOG',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createCategory({
        displayName: formData.displayName,
        slug: formData.slug,
        categoryType: formData.categoryType,
        tags: formData.tags.split(',').map((tag) => tag.trim()) // Convert comma-separated string to an array
      });
      router.push('/admin/categories');
    } catch (err) {
      setError('Failed to create category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-4">
        <ul className="flex space-x-2">
          <li>
            <Link href="/admin">
              <span className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                <Home className="w-4 h-4" /> <span>Admin</span>
              </span>
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/admin/categories" className="text-gray-600 hover:text-blue-600">
              Categories
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-800 font-semibold">Create</li>
        </ul>
      </div>

      <h1 className="text-3xl font-bold mb-6">Create Category</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Category Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Display Name</label>
          <input
            type="text"
            name="displayName"
            className="input input-bordered w-full"
            value={formData.displayName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label">Slug</label>
          <input
            type="text"
            name="slug"
            className="input input-bordered w-full"
            value={formData.slug}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="label">Category Type</label>
          <select
            name="categoryType"
            className="select select-bordered w-full"
            value={formData.categoryType}
            onChange={handleChange}
          >
            <option value="BLOG">BLOG</option>
            <option value="TUTORIAL">TUTORIAL</option>
          </select>
        </div>

        <div>
          <label className="label">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            className="input input-bordered w-full"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Category'}
          </button>
          <Link href="/admin/categories" className="btn btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
