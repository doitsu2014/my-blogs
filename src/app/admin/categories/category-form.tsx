'use client';

import { useEffect, useState } from 'react';
import MultiChipInput, { getRandomColor } from '../components/inputs/multi-chip-input';
import { CreateCategoryModel, UpdateCategoryModel } from '@/app/api/admin/categories/route';
import { CategoryModel, CategoryTypeEnum } from '@/domains/category';
import { TagModel } from '@/domains/tag';
import { redirect } from 'next/navigation';
import { create } from 'domain';

export default function CategoryForm({ id }: { id?: string }) {
  const [displayName, setDisplayName] = useState('');
  const [categoryType, setCategoryType] = useState(CategoryTypeEnum.Blog);
  const [categoryTags, setCategoryTags] = useState<{ label: string; color: string }[]>([]);
  const [rowVersion, setRowVersion] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchCategories = async () => {
        const response = await fetch(`/api/admin/categories/${id}`, {
          cache: 'no-store'
        });
        if (response && response.ok) {
          const data: CategoryModel = await response.json();
          setDisplayName(data.displayName);
          setCategoryType(data.categoryType);
          setCategoryTags(
            data.categoryTags.map((tag: TagModel) => ({
              label: tag.name,
              color: getRandomColor()
            }))
          );
          setRowVersion(data.rowVersion);
        }
        setLoading(false);
      };

      setLoading(true);
      fetchCategories();
    } else {
      setDisplayName('');
      setCategoryType(CategoryTypeEnum.Blog);
      setCategoryTags([]);
      setRowVersion(0);
    }
  }, [id]);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (id) {
      const categoryData: UpdateCategoryModel = {
        id,
        displayName,
        categoryType,
        tagNames: categoryTags.map((tag) => tag.label),
        rowVersion
      };

      const updateResponse = await fetch(`/api/admin/categories`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
      });

      if (updateResponse.ok) {
        redirect('/admin/categories');
      } else {
        console.error(await updateResponse.json(), updateResponse.status);
      }
      setLoading(false);
    } else {
      console.log('Creating category');
      const categoryData: CreateCategoryModel = {
        displayName,
        categoryType,
        tagNames: categoryTags.map((tag) => tag.label)
      };

      const createResponse = await fetch(`/api/admin/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
      });

      if (createResponse.ok) {
        redirect('/admin/categories');
      } else {
        console.error(await createResponse.json(), createResponse.status);
      }
      setLoading(false);
    }

    return 'done';
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col space-y-4 w-full max-w-md">
      <label className="form-control w-full">
        <span className="label-text">Display Name</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Enter display name"
          required
          name="displayName"
          disabled={loading}
        />
      </label>
      <label className="form-control w-full">
        <span className="label-text">Category Type</span>
        <select
          name="categoryType"
          value={categoryType}
          onChange={(e) => {
            setCategoryType(e.target.value as CategoryTypeEnum);
          }}
          className="select select-bordered w-full"
          disabled={loading}
        >
          <option value={CategoryTypeEnum.Blog}>Blog</option>
          <option value={CategoryTypeEnum.Other}>Other</option>
        </select>
      </label>
      <label className="form-control w-full">
        <span className="label-text">Tags</span>
        <MultiChipInput
          chips={categoryTags}
          setChips={setCategoryTags}
          className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg"
          loading={loading}
          formControlName="categoryTags"
        />
      </label>
      <input type="hidden" name="rowVersion" value={rowVersion} />
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Saving...' : id ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
