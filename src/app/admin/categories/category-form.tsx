'use client';

import { useEffect, useState } from 'react';
import MultiChipInput, { getRandomColor } from '../components/inputs/multi-chip-input';
import { getCategoryById } from '@/app/services/categories';
import { TagModel } from '@/app/services/tags';

export default function CategoryForm({ id }: { id?: string }) {
  const [displayName, setDisplayName] = useState('');
  const [categoryType, setCategoryType] = useState('Blog');
  const [categoryTags, setCategoryTags] = useState<{ label: string; color: string }[]>([]);
  const [rowVersion, setRowVersion] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCategoryById(id)
        .then((data) => {
          if (data) {
            setDisplayName(data.displayName);
            console.log(data.categoryType);
            setCategoryType(data.categoryType);
            setCategoryTags(
              data.categoryTags.map((tag: TagModel) => ({
                label: tag.name,
                color: getRandomColor()
              }))
            );
            setRowVersion(data.rowVersion);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setDisplayName('');
      setCategoryType('Blog');
      setCategoryTags([]);
      setRowVersion(0);
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const categoryData = {
      displayName,
      categoryType,
      tags: categoryTags.map((tag) => tag.label)
    };

    // const method = id ? 'PUT' : 'POST';
    // const endpoint = id ? `/api/categories/${id}` : '/api/categories';
    //
    // const response = await fetch(endpoint, {
    //   method,
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(categoryData)
    // });
    //
    // setLoading(false);
    // if (response.ok) {
    //   router.push('/categories');
    // } else {
    //   alert('Failed to save category');
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md">
      <label className="form-control w-full">
        <span className="label-text">Display Name</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Enter display name"
          required
          disabled={loading}
        />
      </label>
      <label className="form-control w-full">
        <span className="label-text">Category Type</span>
        <select
          value={categoryType}
          onChange={(e) => setCategoryType(e.target.value)}
          className="select select-bordered w-full"
          disabled={loading}
        >
          <option value="BLOG">Blog</option>
          <option value="OTHER">Other</option>
        </select>
      </label>
      <label className="form-control w-full">
        <span className="label-text">Tags</span>
        <MultiChipInput
          chips={categoryTags}
          setChips={setCategoryTags}
          className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg"
          loading={loading}
        />
      </label>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Saving...' : id ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
