'use client';

import { useEffect, useState } from 'react';
import { PostModel } from '@/domains/post';
import { useRouter } from 'next/navigation';
import MultiChipInput, { getRandomColor } from '../components/inputs/multi-chip-input';
import dynamic from 'next/dynamic';
import { CategoryModel } from '@/domains/category';
import { Info, ImagePlus, Tag, BookOpen, Save, FileText, Settings } from 'lucide-react';

const RichTextEditor = dynamic(() => import('../components/inputs/rich-text-editor'), {
  ssr: false
});

const AVAILABLE_LANGUAGES = [{ code: 'vi', displayName: 'Vietnamese (vi)' }];

export default function BlogForm({ id }: { id?: string }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [thumbnailPaths, setThumbnailPaths] = useState<string[]>([]);
  const [published, setPublished] = useState(false);
  const [rowVersion, setRowVersion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<{ label: string; color: string }[]>([]);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [translations, setTranslations] = useState<
    {
      id: string;
      languageCode: string;
      title: string;
      previewContent?: string;
      originalContent: string;
      content: string;
    }[]
  >([]);
  const [activeTab, setActiveTab] = useState(0);

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
          setPublished(data.published);
          setRowVersion(data.rowVersion);
          setTags(
            data.postTags.map((tag) => ({
              label: tag.name,
              color: getRandomColor()
            }))
          );
          setSelectedCategoryId(data.categoryId); // Set the category ID
          setTranslations(
            data.postTranslations.map((translation) => ({
              id: translation.id,
              languageCode: translation.languageCode,
              title: translation.title,
              previewContent: translation.previewContent,
              originalContent: translation.content,
              content: translation.content
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

          // If we don't have a selected category yet and there are categories, select the first one
          if (!selectedCategoryId && data.length > 0 && !id) {
            setSelectedCategoryId(data[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [id, selectedCategoryId]);

  const handleTranslationChange = (index: number, field: string, value: string) => {
    setTranslations((prev) =>
      prev.map((translation, i) => (i === index ? { ...translation, [field]: value } : translation))
    );
  };

  const addTranslationTab = () => {
    setTranslations((prev) => [
      ...prev,
      { id: '', languageCode: '', title: '', previewContent: '', originalContent: '', content: '' }
    ]);
  };

  const isAddTabDisabled = () => {
    const usedLanguages = translations.map((t) => t.languageCode);
    const conditionEveryLanguageCodesUsed = AVAILABLE_LANGUAGES.every((lang) =>
      usedLanguages.includes(lang.code)
    );
    const conditionMaxTabs = translations.length >= AVAILABLE_LANGUAGES.length;
    return conditionEveryLanguageCodesUsed || conditionMaxTabs;
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const postData = {
      id,
      title,
      previewContent,
      content,
      thumbnailPaths,
      published,
      rowVersion,
      tagNames: tags.map((tag) => tag.label),
      categoryId: selectedCategoryId,
      translations: [
        ...translations.map((e) => {
          return {
            id: e.id ? e.id : undefined,
            languageCode: e.languageCode,
            title: e.title,
            previewContent: e.previewContent,
            content: e.content
          };
        })
      ]
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
      router.push('/admin/blogs');
    } else {
      console.error(await response.json(), response.status);
    }
    setLoading(false);
  };

  // Function to show thumbnail preview
  const renderThumbnailPreview = () => {
    if (thumbnailPaths.length === 0 || thumbnailPaths[0] === '') return null;

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {thumbnailPaths.map((path, index) => (
          <div key={index} className="relative group">
            <img
              src={path}
              alt={`Thumbnail ${index + 1}`}
              className="h-24 w-24 object-cover rounded-md border border-base-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://picsum.photos/200/300?random=' + index;
              }}
            />
            <span className="absolute top-0 right-0 bg-base-100 text-xs px-1 rounded-bl-md rounded-tr-md">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col space-y-4 max-w-6xl mx-auto">
      {/* Form header */}
      {/* <div className="card bg-base-200 shadow-sm">
        <div className="card-body p-4">
          <h2 className="card-title text-2xl">
            {id ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <p className="text-sm text-base-content/70">
            Fill in the details below to {id ? 'update your' : 'create a new'} blog post
          </p>
        </div>
      </div> */}

      {/* Tabs with DaisyUI tab-content implementation */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body p-4">
          <div className="tabs tabs-lifted">
            <label className="tab">
              <input type="radio" name="blog_form_tabs" className="tab" defaultChecked />
              <Info className="size-4 me-2" />
              Post Details
            </label>
            <div className="tab-content bg-base-100 rounded-box p-6 border border-base-300">
              <div className="space-y-4">
                {/* Basic Info Card */}
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <Info size={18} />
                    Basic Information
                  </h3>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-medium">Title</span>
                    </div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Enter an engaging title"
                      required
                      name="title"
                      disabled={loading}
                    />
                  </label>

                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text font-medium">Category</span>
                    </div>
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
                    {categories.length === 0 && (
                      <div className="label">
                        <span className="label-text-alt text-error">No categories available</span>
                      </div>
                    )}
                  </label>

                  <div className="form-control mt-4">
                    <div className="label">
                      <span className="label-text font-medium">Published Status: </span>
                    </div>
                    <label className="cursor-pointer label justify-start gap-3 bg-base-100 rounded-md p-3">
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        disabled={loading}
                      />
                      <span className="label-text">{published ? 'Published' : 'Draft'}</span>
                    </label>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <ImagePlus size={18} />
                    Thumbnails
                  </h3>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-medium">Thumbnail URLs</span>
                      <span className="label-text-alt">Separate with commas</span>
                    </div>
                    <input
                      type="text"
                      value={thumbnailPaths.join(', ')}
                      onChange={(e) =>
                        setThumbnailPaths(
                          e.target.value
                            .split(',')
                            .map((path) => path.trim())
                            .filter(Boolean)
                        )
                      }
                      className="input input-bordered w-full"
                      placeholder="https://example.com/image.jpg, ..."
                      name="thumbnailPaths"
                      disabled={loading}
                    />
                  </label>

                  {renderThumbnailPreview()}

                  {thumbnailPaths.length === 0 && (
                    <div className="text-sm text-base-content/70 mt-2">
                      No thumbnails added yet. Add URL(s) to display preview.
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <Tag size={18} />
                    Tags
                  </h3>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-medium">Add Tags</span>
                      <span className="label-text-alt">Press Enter to add</span>
                    </div>
                    <MultiChipInput
                      chips={tags}
                      setChips={(chips: { label: string; color: string }[]) => {
                        setTags(
                          chips.map((chip) => ({
                            label: chip.label.toLowerCase(),
                            color: chip.color
                          }))
                        );
                      }}
                      className="flex flex-wrap border border-base-300 rounded-md p-2 min-h-16 bg-base-200"
                      loading={loading}
                      formControlName="tags"
                    />
                  </label>
                </div>
              </div>
            </div>

            <label className="tab">
              <input type="radio" name="blog_form_tabs" className="tab" />
              <FileText className="size-4 me-2" />
              Post Content
            </label>
            <div className="tab-content bg-base-100 rounded-box p-6 border border-base-300">
              <div className="space-y-6">
                {/* Preview Content */}
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <BookOpen size={18} />
                    Preview Content
                  </h3>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text font-medium">Short Preview</span>
                      <span className="label-text-alt">This will appear in blog lists</span>
                    </div>
                    <textarea
                      value={previewContent}
                      onChange={(e) => setPreviewContent(e.target.value)}
                      className="textarea textarea-bordered w-full min-h-24"
                      placeholder="Enter a brief preview of your blog post"
                      required
                      name="previewContent"
                      disabled={loading}
                    />
                  </label>
                </div>

                {/* Full Article Content */}
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FileText size={18} />
                      Full Article Content
                    </h3>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => setIsPreviewModalOpen(true)}
                      disabled={loading}>
                      Preview
                    </button>
                  </div>

                  <div className="form-control w-full bg-base-100 rounded-md border border-base-300">
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

            <label className="tab">
              <input type="radio" name="blog_form_tabs" className="tab" />
              <Settings className="size-4 me-2" />
              Translations
            </label>
            <div className="tab-content bg-base-100 rounded-box p-6 border border-base-300">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Settings size={18} />
                  Translations
                </h3>
                <div className="tabs">
                  <div className="tabs-box">
                    {translations?.map((translation, index) => (
                      <button
                        key={index}
                        className={`tab ${activeTab === index ? 'tab-active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleTabClick(index);
                        }}>
                        {translation.languageCode || `Tab ${index + 1}`}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline ml-2"
                      onClick={addTranslationTab}
                      disabled={isAddTabDisabled()}>
                      + Add Tab
                    </button>
                  </div>
                  <div className="mt-2 w-full">
                    {translations.map((translation, index) => (
                      <div
                        key={index}
                        className={`p-4 border border-base-300 rounded-md ${
                          activeTab === index ? '' : 'hidden'
                        }`}>
                        <div className="form-control w-full">
                          <div className="label flex items-center gap-2 mb-2">
                            <Settings size={18} />
                            <span className="label-text font-medium">Language Code</span>
                          </div>
                          <select
                            value={translation.languageCode}
                            onChange={(e) =>
                              handleTranslationChange(index, 'languageCode', e.target.value)
                            }
                            className="select select-bordered w-full"
                            required
                            disabled={loading}>
                            <option value="">Select Language</option>
                            {AVAILABLE_LANGUAGES.map((lang) => (
                              <option key={lang.code} value={lang.code}>
                                {lang.displayName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-control w-full mt-4">
                          <div className="label flex items-center gap-2 mb-2">
                            <Info size={18} />
                            <span className="label-text font-medium">Title</span>
                          </div>
                          <input
                            type="text"
                            value={translation.title}
                            onChange={(e) =>
                              handleTranslationChange(index, 'title', e.target.value)
                            }
                            className="input input-bordered w-full"
                            placeholder="Enter translated title"
                            required
                            disabled={loading}
                          />
                        </div>
                        <div className="form-control w-full mt-4">
                          <div className="label flex items-center gap-2 mb-2">
                            <BookOpen size={18} />
                            <span className="label-text font-medium">Preview Content</span>
                            <span className="label-text-alt">This will appear in blog lists</span>
                          </div>
                          <textarea
                            value={translation.previewContent || ''}
                            onChange={(e) =>
                              handleTranslationChange(index, 'previewContent', e.target.value)
                            }
                            className="textarea textarea-bordered w-full min-h-24"
                            placeholder="Enter translated preview content"
                            required
                            disabled={loading}
                          />
                        </div>
                        <div className="form-control w-full mt-4">
                          <div className="label flex items-center gap-2 mb-2">
                            <FileText size={18} />
                            <span className="label-text font-medium">Content</span>
                          </div>
                          <div className="form-control w-full bg-base-100 rounded-md border border-base-300">
                            <RichTextEditor
                              defaultValue={translation.originalContent}
                              onTextChange={(e) => handleTranslationChange(index, 'content', e)}
                              readOnly={loading}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body p-4">
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => window.history.back()}
              disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {id ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save size={18} />
                  {id ? 'Update Post' : 'Create Post'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Preview */}
      {isPreviewModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl h-5/6 bg-base-100">
            <div className="modal-header flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-lg font-bold">Preview: {title || 'Untitled Post'}</h3>
              <button
                type="button"
                className="btn btn-sm btn-circle"
                onClick={() => setIsPreviewModalOpen(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body prose max-w-none mt-4 overflow-y-auto h-[calc(100%-8rem)]">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <div className="modal-action justify-end mt-4 border-t pt-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsPreviewModalOpen(false)}>
                Close Preview
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsPreviewModalOpen(false)}>close</button>
          </form>
        </div>
      )}

      <input type="hidden" name="rowVersion" value={rowVersion} />
      <input type="hidden" name="id" value={id || ''} />
    </form>
  );
}
