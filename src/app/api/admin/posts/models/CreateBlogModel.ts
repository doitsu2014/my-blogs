
export interface CreateBlogModel {
  title: string;
  previewContent: string;
  content: string;
  thumbnailPaths: string[];
  published: boolean;
  categoryId: string;
  tagNames: string[];
}
