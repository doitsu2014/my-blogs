import { CategoryTranslationModel, CategoryTypeEnum } from '@/domains/category';

export interface UpdateCategoryModel {
  id: string;
  displayName: string;
  categoryType: CategoryTypeEnum;
  tagNames: string[];
  rowVersion: number;
  categoryTranslations: CategoryTranslationModel[];
}
