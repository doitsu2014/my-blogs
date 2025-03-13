'use server';

import { CategoryTypeEnum, createCategory, CreateCategoryModel } from "@/app/services/categories";

export const submitAction = async (formData: FormData) => {
  const id = formData.get('id') as string;
  if (id) {
    // const categoryData: UpdateCategoryModel = {
    //   id,
    //   displayName,
    //   categoryType,
    //   tagNames: categoryTags.map((tag) => tag.label),
    //   rowVersion
    // };

    // await updateCategory(categoryData);
    // setLoading(false);
  } else {
    console.log('Creating category');

    const categoryData: CreateCategoryModel = {
      displayName: formData.get('displayName') as string,
      categoryType: formData.get('categoryType') as CategoryTypeEnum,
      tagNames: (JSON.parse(formData.get('categoryTags') as string) as { label: string; color: string }[]).map((tag) => tag.label)
    };

    await createCategory(categoryData);
  }
};
