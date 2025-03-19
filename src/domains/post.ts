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
  createdAt: string; // ISO 8601 format
  lastModifiedBy: string;
  lastModifiedAt: string; // ISO 8601 format
  categoryId: string;
  categoryDisplayName: string;
  categorySlug: string;
  rowVersion: number;
  postTags: TagModel[];
}
