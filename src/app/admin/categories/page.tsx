'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Home, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '../components/my-breadcrumbs';
import { useLayout } from '../layoutContext';
import { TagModel } from '@/domains/tag';
import { CategoryModel } from '@/domains/category';

export default function CategoriesListPage() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  // const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(
    null
  );
  const [slugFilter, setSlugFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const { setLayoutLoading } = useLayout();

  useEffect(() => {
    const loadCategories = async () => {
      const data: CategoryModel[] = await (
        await fetch('/api/admin/categories', {
          cache: 'no-store'
        })
      ).json();
      setCategories(data);
      setTimeout(() => setLayoutLoading(false), 1000);
    };
    setLayoutLoading(true);
    loadCategories();
  }, []);

  let filteredCategories = categories;

  // Apply Filtering
  if (slugFilter) {
    filteredCategories = filteredCategories.filter((c) => c.slug.includes(slugFilter));
  }
  if (typeFilter) {
    filteredCategories = filteredCategories.filter((c) => c.categoryType === typeFilter);
  }

  // Sorting
  const sortBy = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    filteredCategories.sort((a: any, b: any) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin', icon: <Home className="w-4 h-4" /> },
          { label: 'Categories' }
        ]}
      />

      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>
        {/* Create Category Button */}
        <Link href="/admin/categories/create" className="btn btn-primary">
          + Create Category
        </Link>
      </div>

      {/* Filter Controls */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Filter by slug..."
          className="input input-bordered w-1/3"
          value={slugFilter}
          onChange={(e) => setSlugFilter(e.target.value)}
        />

        <select
          className="select select-bordered w-1/3"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="BLOG">BLOG</option>
          <option value="TUTORIAL">TUTORIAL</option>
        </select>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full rounded-lg shadow-lg">
          <thead>
            <tr className="bg-base-300 text-base-content">
              <th className="p-3 cursor-pointer" onClick={() => sortBy('name')}>
                Name{' '}
                {sortConfig?.key === 'name' ? (
                  sortConfig.direction === 'asc' ? (
                    <ChevronUp className="inline w-4 h-4" />
                  ) : (
                    <ChevronDown className="inline w-4 h-4" />
                  )
                ) : null}
              </th>
              <th className="p-3 cursor-pointer" onClick={() => sortBy('slug')}>
                Slug{' '}
                {sortConfig?.key === 'slug' ? (
                  sortConfig.direction === 'asc' ? (
                    <ChevronUp className="inline w-4 h-4" />
                  ) : (
                    <ChevronDown className="inline w-4 h-4" />
                  )
                ) : null}
              </th>
              <th className="p-3 cursor-pointer" onClick={() => sortBy('categoryType')}>
                Type{' '}
                {sortConfig?.key === 'categoryType' ? (
                  sortConfig.direction === 'asc' ? (
                    <ChevronUp className="inline w-4 h-4" />
                  ) : (
                    <ChevronDown className="inline w-4 h-4" />
                  )
                ) : null}
              </th>
              <th className="p-3">Created By</th>
              <th className="p-3">Tags</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id} className="hover:bg-base-200 transition-all">
                <td className="p-3 font-semibold">{category.displayName}</td>
                <td className="p-3 text-gray-500">{category.slug}</td>
                <td className="p-3">
                  <span className="badge badge-info">{category.categoryType}</span>
                </td>
                <td className="p-3 text-gray-600">{category.createdBy}</td>
                <td className="p-3">
                  {category.categoryTags?.length > 0 ? (
                    category.categoryTags?.map((tag: TagModel) => (
                      <span key={tag.id} className="badge badge-secondary mr-1">
                        {tag.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">No Tags</span>
                  )}
                </td>
                <td className="p-3 text-center">
                  <div className="flex space-x-1">
                    <Link
                      href={`/admin/categories/edit/${category.id}`}
                      className="btn btn-sm btn-secondary"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button className="btn btn-sm btn-error">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
