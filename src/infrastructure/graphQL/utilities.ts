import { CategoryModel } from "@/domains/category";
import { PostModel } from "@/domains/post";

export const mapGraphQlModelToCategoryModel = (
  graphqlNode: any | undefined
): CategoryModel | undefined => {
  return !!graphqlNode
    ? {
      ...graphqlNode,
       categoryTags: graphqlNode.categoryTags.nodes.map((node: any) => ({
          id: node.tags.id,
          name: node.tags.name,
          slug: node.tags.slug
        })),
    }
    : undefined;
};

export const mapGraphQlModelToPostModel = (
  graphqlNode: any | undefined
): PostModel | undefined => {
  return !!graphqlNode
    ? {
      ...graphqlNode,
      categoryDisplayName: graphqlNode.categories.displayName,
      categorySlug: graphqlNode.categories.slug,
      postTags: graphqlNode.postTags.nodes.map((node: any) => ({
        id: node.tags.id,
        name: node.tags.name,
        slug: node.tags.slug
      })),
    }
    : undefined;
};