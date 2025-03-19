'use client';

import { useEffect, useState } from 'react';
import { PostModel } from '@/domains/post';
import { redirect } from 'next/navigation';
import MultiChipInput, { getRandomColor } from '../components/inputs/multi-chip-input';
import RichTextEditor from '../components/inputs/rich-text-editor';

export default function BlogForm({ id }: { id?: string }) {
  const [title, setTitle] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailPaths, setThumbnailPaths] = useState<string[]>([]);
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [rowVersion, setRowVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<{ label: string; color: string }[]>([]);

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
      tagNames: tags.map((tag) => tag.label)
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
    <form onSubmit={submitHandler} className="space-y-2">
      <div className="flex w-full flex-col space-x-2 lg:flex-row">
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
          <div className="flex flex-col space-y-4 w-full">
            <label className="form-control w-full">
              <span className="label-text">Content</span>
              <RichTextEditor
                value={content}
                onChange={setContent}
                name="content"
                className="!min-h-96"
              />
            </label>
          </div>
        </div>
      </div>

      <input type="hidden" name="rowVersion" value={rowVersion} />
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Saving...' : id ? 'Update' : 'Create'}
      </button>
    </form>
  );
}
