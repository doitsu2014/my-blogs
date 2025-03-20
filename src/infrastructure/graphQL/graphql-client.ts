import { CategoryModel } from '@/domains/category';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const graphQLClient = new ApolloClient({
  uri: `${process.env.MY_CMS_API_URL}/graphql/immutable`,
  cache: new InMemoryCache()
});

export default graphQLClient;
