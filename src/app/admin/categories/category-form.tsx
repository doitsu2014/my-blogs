'use client';

import { useEffect, useState } from 'react';
import MultiChipInput, { getRandomColor } from '../components/inputs/multi-chip-input';
import {
  CategoryTypeEnum,
  createCategory,
  CreateCategoryModel,
  getCategoryById,
  updateCategory,
  UpdateCategoryModel
} from '@/app/services/categories';
import { TagModel } from '@/app/services/tags';
import { submitAction } from './category-form.submitAction';

export default function CategoryForm({ id }: { id?: string }) {
  const [displayName, setDisplayName] = useState('');
  const [categoryType, setCategoryType] = useState(CategoryTypeEnum.Blog);
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
      setCategoryType(CategoryTypeEnum.Blog);
      setCategoryTags([]);
      setRowVersion(0);
    }
  }, [id]);

  // const formAction = async (formData: FormData) => {
  //   'use server';
  //   console.log(formData);
  //   console.log(id);

  //   // event.preventDefault();
  //   setLoading(true);

  //   // if (id) {
  //   //   const categoryData: UpdateCategoryModel = {
  //   //     id,
  //   //     displayName,
  //   //     categoryType,
  //   //     tagNames: categoryTags.map((tag) => tag.label),
  //   //     rowVersion
  //   //   };

  //   //   await updateCategory(categoryData);
  //   //   setLoading(false);
  //   // } else {
  //   //   console.log('Creating category');
  //   //   const categoryData: CreateCategoryModel = {
  //   //     displayName,
  //   //     categoryType,
  //   //     tagNames: categoryTags.map((tag) => tag.label)
  //   //   };

  //   //   await createCategory(categoryData);
  //   //   setLoading(false);
  //   // }
  //   return 'done';

  //   // const method = id ? 'PUT' : 'POST';
  //   // const endpoint = id ? `/api/categories/${id}` : '/api/categories';
  //   //
  //   // const response = await fetch(endpoint, {
  //   //   method,
  //   //   headers: { 'Content-Type': 'application/json' },
  //   //   body: JSON.stringify(categoryData)
  //   // });
  //   //
  //   // setLoading(false);
  //   // if (response.ok) {
  //   //   router.push('/categories');
  //   // } else {
  //   //   alert('Failed to save category');
  //   // }
  // };

  return (
    <form action={submitAction} className="flex flex-col space-y-4 w-full max-w-md">
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
          disabled={loading}>
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
          formControlName='categoryTags'
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
