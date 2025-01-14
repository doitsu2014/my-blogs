import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://my-cms-api.ducth.dev/graphql/immutable',
  cache: new InMemoryCache()
});

export default client;
