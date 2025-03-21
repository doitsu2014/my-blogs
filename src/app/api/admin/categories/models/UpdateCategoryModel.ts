import { CategoryTypeEnum } from '@/domains/category';


export class UpdateCategoryModel {
  id: string;
  displayName: string;
  categoryType: CategoryTypeEnum;
  tagNames: string[];
  rowVersion: number;

  constructor(
    id: string,
    displayName: string,
    categoryType: CategoryTypeEnum,
    tagNames: string[],
    rowVersion: number
  ) {
    this.id = id;
    this.displayName = displayName;
    this.categoryType = categoryType;
    this.tagNames = tagNames;
    this.rowVersion = rowVersion;
  }
}
