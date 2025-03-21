import { CategoryTypeEnum } from '@/domains/category';


export class CreateCategoryModel {
  displayName: string;
  categoryType: CategoryTypeEnum;
  tagNames: string[];

  constructor(displayName: string, categoryType: CategoryTypeEnum, tagNames: string[]) {
    this.displayName = displayName;
    this.categoryType = categoryType;
    this.tagNames = tagNames;
  }
}
