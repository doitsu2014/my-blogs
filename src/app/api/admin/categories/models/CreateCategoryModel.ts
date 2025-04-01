import { CategoryTranslationModel, CategoryTypeEnum } from '@/domains/category';

export interface CreateCategoryModel {
  displayName: string;
  categoryType: CategoryTypeEnum;
  tagNames: string[];
  categoryTranslations: {languageCode: string, displayName: string}[];
}
