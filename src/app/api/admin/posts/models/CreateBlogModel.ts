
export interface CreateBlogModel {
  title: string;
  previewContent: string;
  content: string;
  thumbnailPaths: string[];
  published: boolean;
  categoryId: string;
  tagNames: string[];
  translations: {
    languageCode: string;
    title: string;
    previewContent: string;
    content: string;
  }[];
}
