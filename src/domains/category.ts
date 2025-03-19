import { TagModel } from './tag';

export enum CategoryTypeEnum {
  Blog = 'BLOG',
  Other = 'OTHER'
}

export interface CategoryModel {
  id: string;
  parentId: string | undefined;
  displayName: string;
  slug: string;
  categoryType: CategoryTypeEnum;
  createdBy: string;
  createdAt: string;
  categoryTags: TagModel[];
  rowVersion: number;
}
