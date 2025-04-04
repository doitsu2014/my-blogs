
export interface UpdateBlogModel {
  id: string;
  title: string;
  previewContent: string;
  content: string;
  thumbnailPaths: string[];
  published: boolean;
  categoryId: string;
  tagNames: string[];
  rowVersion: number;
  translations: {
    id: string;
    languageCode: string;
    title: string;
    previewContent: string;
    content: string;
  }[];
}
