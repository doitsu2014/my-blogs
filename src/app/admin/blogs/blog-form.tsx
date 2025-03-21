'use client';

import { useEffect, useState } from 'react';
import { PostModel } from '@/domains/post';
import { redirect } from 'next/navigation';
import MultiChipInput, { getRandomColor } from '../components/inputs/multi-chip-input';

import dynamic from 'next/dynamic';
import { CategoryModel } from '@/domains/category';
const RichTextEditor = dynamic(() => import('../components/inputs/rich-text-editor'), {
  ssr: false
});

export default function BlogForm({ id }: { id?: string }) {
  const [title, setTitle] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [thumbnailPaths, setThumbnailPaths] = useState<string[]>([]);
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [rowVersion, setRowVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<{ label: string; color: string }[]>([]);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const response = await fetch(`/api/admin/posts/${id}`, {
          cache: 'no-store'
        });
        if (response && response.ok) {
          const data: PostModel = await response.json();
          setTitle(data.title);
          setPreviewContent(data.previewContent);
          setContent(data.content);
          setOriginalContent(data.content);
          setThumbnailPaths(data.thumbnailPaths);
          setSlug(data.slug);
          setPublished(data.published);
          setRowVersion(data.rowVersion);
          setTags(
            data.postTags.map((tag) => ({
              label: tag.name,
              color: getRandomColor()
            }))
          );
          setSelectedCategoryId(data.categoryId); // Set the category ID
        }
        setLoading(false);
      };

      setLoading(true);
      fetchPost();
    } else {
      setTitle('');
      setPreviewContent('');
      setContent('');
      setThumbnailPaths([]);
      setSlug('');
      setPublished(false);
      setRowVersion(0);
      setTags([]);
    }
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories/blogs', { cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const postData = {
      id,
      title,
      previewContent,
      content,
      thumbnailPaths,
      slug,
      published,
      rowVersion,
      tagNames: tags.map((tag) => tag.label),
      categoryId: selectedCategoryId // Include selected categoryId
    };

    const method = id ? 'PUT' : 'POST';
    const endpoint = id ? `/api/admin/posts` : `/api/admin/posts`;

    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (response.ok) {
      redirect('/admin/blogs');
    } else {
      console.error(await response.json(), response.status);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col space-y-2">
      <div className="flex flex-col w-full space-x-2 space-y-4 lg:flex-row">
        <div className="grid" id="blog-form-section-metadata">
          {/* Left Section */}
          <div className="flex flex-col space-y-4 w-full">
            <label className="form-control w-full">
              <span className="label-text">Title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter title"
                required
                name="title"
                disabled={loading}
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Slug</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter slug"
                required
                name="slug"
                disabled={loading}
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Thumbnail Paths (comma-separated)</span>
              <input
                type="text"
                value={thumbnailPaths.join(', ')}
                onChange={(e) =>
                  setThumbnailPaths(e.target.value.split(',').map((path) => path.trim()))
                }
                className="input input-bordered w-full"
                placeholder="Enter thumbnail paths"
                name="thumbnailPaths"
                disabled={loading}
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Preview Content</span>
              <textarea
                value={previewContent}
                onChange={(e) => setPreviewContent(e.target.value)}
                className="textarea textarea-bordered w-full"
                placeholder="Enter preview content"
                required
                name="previewContent"
                disabled={loading}
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Categories</span>
              <select
                className="select select-bordered w-full"
                disabled={loading || categories.length === 0}
                name="category"
                required
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}>
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.displayName}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-control w-full">
              <span className="label-text">Tags</span>
              <MultiChipInput
                chips={tags}
                setChips={setTags}
                className="flex flex-wrap border border-base-400 rounded-md p-2"
                loading={loading}
                formControlName="tags"
              />
            </label>
            <label className="form-control w-full space-x-2">
              <span className="label-text">Published</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                disabled={loading}
              />
            </label>
          </div>
        </div>
        <div className="grid grow">
          {/* Right Section */}
          <div className="flex flex-col w-full">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsPreviewModalOpen(true)}
              disabled={loading}>
              Preview Content
            </button>
            <div className="form-control w-full">
              <RichTextEditor
                defaultValue={originalContent}
                onTextChange={(e) => {
                  setContent(e);
                }}
                onSelectionChange={() => {}}
                readOnly={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Preview */}
      {isPreviewModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-full h-full max-w-none bg-base-200 shadow-xl border border-primary">
            <div className="modal-header flex justify-between items-center border-b border-primary pb-2">
              <h3 className="text-lg font-bold text-primary">Content Preview</h3>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-error"
                onClick={() => setIsPreviewModalOpen(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body prose max-w-none mt-4 overflow-y-auto h-[calc(100%-8rem)">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <div className="modal-action justify-end mt-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsPreviewModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <input type="hidden" name="rowVersion" value={rowVersion} />
      <input type="hidden" name="id" value={id} />
      <div className="flex">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}
