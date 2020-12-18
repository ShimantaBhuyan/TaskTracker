import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://test-323.herokuapp.com/v1/graphql',
  cache: new InMemoryCache()
});