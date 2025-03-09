'use client';

import { useEffect, useState } from 'react';
import MultiChipInput, { getRandomColor } from '../components/inputs/multi-chip-input';
import { getCategoryById } from '@/app/services/categories';
import { TagModel } from '@/app/services/tags';

export default function CategoryForm({ id }: { id?: string | undefined }) {
  const [displayName, setDisplayName] = useState('');
  const [categoryType, setCategoryType] = useState('BLOG');
  const [tags, setTags] = useState<{ label: string; color: string }[]>([]);

  useEffect(() => {
    if (id) {
      // Fetch category data and populate form fields
      getCategoryById(id).then((data) => {
        if (!!data) {
          setDisplayName(data.displayName);
          setCategoryType(data.categoryType);
          setTags(
            data.categoryTags.map((tag: TagModel) => ({ label: tag.name, color: getRandomColor() }))
          );
        }
      });
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const categoryData = {
      displayName,
      categoryType,
      tags: tags.map((tag) => tag.label)
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
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text">Category Type</span>
        <select
          value={categoryType}
          onChange={(e) => setCategoryType(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="BLOG">Blog</option>
          <option value="OTHER">Other</option>
        </select>
      </label>

      <label className="form-control w-full">
        <span className="label-text">Tags</span>
        <MultiChipInput
          chips={tags}
          setChips={setTags}
          className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg"
        />
      </label>

      <button type="submit" className="btn btn-primary">
        {id ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
