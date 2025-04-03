import { CategoryModel } from './category';
import { TagModel } from './tag';

export interface PostModel {
  id: string;
  title: string;
  previewContent: string;
  content: string;
  thumbnailPaths: string[];
  slug: string;
  published: boolean;
  createdBy: string;
  createdAt: string;
  lastModifiedBy: string;
  lastModifiedAt: string;
  categoryId: string;
  categoryDisplayName: string;
  categorySlug: string;
  rowVersion: number;
  postTags: TagModel[];
  postTranslations: PostTranslationModel[];
}

export interface PostTranslationModel {
  id: string;
  languageCode: string;
  title: string;
  previewContent: string;
  content: string;
  slug: string;
}

export interface PostInFooterModel {
  id: string;
  title: string;
  previewContent: string;
  slug: string;
  category: CategoryModel;
  postTranslations: PostTranslationModel[];
}
