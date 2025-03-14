import { TagModel } from './tag';

export enum CategoryTypeEnum {
  Blog = 'BLOG',
  Other = 'OTHER'
}

export class CategoryModel {
  id: string;
  parentId: string | undefined;
  displayName: string;
  slug: string;
  categoryType: CategoryTypeEnum;
  createdBy: string;
  createdAt: string;
  categoryTags: TagModel[];
  rowVersion: number;

  constructor(
    id: string,
    parentId: string | undefined,
    displayName: string,
    slug: string,
    categoryType: CategoryTypeEnum,
    createdBy: string,
    createdAt: string,
    categoryTags: TagModel[],
    rowVersion: number
  ) {
    this.id = id;
    this.parentId = parentId;
    this.displayName = displayName;
    this.slug = slug;
    this.categoryType = categoryType;
    this.categoryTags = categoryTags;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.rowVersion = rowVersion;
  }
}
