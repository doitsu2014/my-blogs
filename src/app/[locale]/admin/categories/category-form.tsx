'use client';

import { useEffect, useState } from 'react';
import MultiChipInput, { getRandomColor } from '../components/inputs/multi-chip-input';
import { UpdateCategoryModel } from '@/app/api/admin/categories/models/UpdateCategoryModel';
import { CreateCategoryModel } from '@/app/api/admin/categories/models/CreateCategoryModel';
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
  const [categoryTranslations, setCategoryTranslations] = useState<{ lang: string; displayName: string }[]>([]);
  const [activeTab, setActiveTab] = useState(0);

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
        rowVersion,
        categoryTranslations: []
      };

      const updateResponse = await fetch(`/api/admin/categories`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
      });

      if (updateResponse.ok) {
        await redirect('/admin/categories');
      } else {
        console.error(await updateResponse.json(), updateResponse.status);
      }
      setLoading(false);
    } else {
      console.log('Creating category');
      const categoryData: CreateCategoryModel = {
        displayName,
        categoryType,
        tagNames: categoryTags.map((tag) => tag.label),
        categoryTranslations: []
      };

      const createResponse = await fetch(`/api/admin/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
      });

      if (createResponse.ok) {
        await redirect('/admin/categories');
      } else {
        console.error(await createResponse.json(), createResponse.status);
      }
      setLoading(false);
    }

    return 'done';
  };

  const addTranslationTab = () => {
    setCategoryTranslations([...categoryTranslations, { lang: '', displayName: '' }]);
  };

  const updateTranslation = (index: number, field: 'lang' | 'displayName', value: string) => {
    const updatedTranslations = [...categoryTranslations];
    updatedTranslations[index][field] = value;
    setCategoryTranslations(updatedTranslations);
  };

  const handleTabClick = (index: number) => {
    console.log(index);
    setActiveTab(index);
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
          setChips={(chips: { label: string; color: string }[]) => {
            setCategoryTags(chips.map((chip) => ({ label: chip.label.toLowerCase(), color: chip.color })));
          }}
          className="flex flex-wrap border border-base-300 rounded-md p-2"
          loading={loading}
          formControlName="categoryTags"
        />
      </label>
      <div className="form-control w-full">
        <span className="label-text">Category Translations</span>
        <div className="tabs">
          <div className="tabs-box">
            {categoryTranslations.map((translation, index) => (
              <button
                key={index}
                className={`tab ${activeTab === index ? 'tab-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(index);
                }}
              >
                {translation.lang || 'New Tab'}
              </button>
            ))}
            <button
              type="button"
              className="btn btn-sm btn-outline ml-2"
              onClick={addTranslationTab}
            >
              + Add Tab
            </button>
          </div>
          <div className="mt-2">
            {categoryTranslations.map((translation, index) => (
              <div
                key={index}
                className={`p-4 border border-base-300 rounded-md ${activeTab === index ? '' : 'hidden'}`}
              >
                <label className="form-control w-full">
                  <span className="label-text">Language Code</span>
                  <input
                    type="text"
                    value={translation.lang}
                    onChange={(e) => updateTranslation(index, 'lang', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter language code (e.g., vi, cn)"
                    required
                    disabled={loading}
                  />
                </label>
                <label className="form-control w-full mt-4">
                  <span className="label-text">Display Name</span>
                  <input
                    type="text"
                    value={translation.displayName}
                    onChange={(e) => updateTranslation(index, 'displayName', e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter translated display name"
                    required
                    disabled={loading}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <input type="hidden" name="categoryTranslations" value={JSON.stringify(categoryTranslations)} />
      <input type="hidden" name="rowVersion" value={rowVersion} />
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Saving...' : id ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
