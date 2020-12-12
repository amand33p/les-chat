import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import storage from './utils/localStorage';
//import backendUrl from './backendUrl';

const authLink = setContext((_, { headers }) => {
  const loggedUser = storage.loadUser();

  return {
    headers: {
      ...headers,
      authorization: loggedUser ? loggedUser.token : null,
    },
  };
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: storage.loadUser()?.token,
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default client;
