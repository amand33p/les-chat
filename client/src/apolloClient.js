import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import storage from './utils/localStorage';
import backendUrls from './backendUrls';
const { http, ws } = backendUrls;

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
  uri: http,
});

const wsLink = new WebSocketLink({
  uri: ws,
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: () => {
      return {
        Authorization: storage.loadUser()?.token,
      };
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
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getGroups: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link: splitLink,
});

export default client;
