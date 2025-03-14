import { CategoryModel } from '@/domains/category';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `${process.env.MY_CMS_API_URL}/graphql/immutable`,
  cache: new InMemoryCache()
});

export default client;

export const mapGraphQlModelToCategoryModel = (
  graphqlNode: any | undefined
): CategoryModel | undefined => {
  return !!graphqlNode
    ? new CategoryModel(
        graphqlNode.id,
        undefined,
        graphqlNode.displayName,
        graphqlNode.slug,
        graphqlNode.categoryType,
        graphqlNode.createdBy,
        graphqlNode.createdAt,
        graphqlNode.categoryTags.nodes.map((node: any) => ({
          id: node.tags.id,
          name: node.tags.name,
          slug: node.tags.slug
        })),
        graphqlNode.rowVersion
      )
    : undefined;
};
