import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://my-cms-api.doitsu.tech/graphql/immutable',
  cache: new InMemoryCache()
});

export default client;
