const { ApolloServer } = require('apollo-server');
const { sequelize } = require('./models');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { PORT } = require('./utils/config');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (context) => context,
});

server.listen({ port: PORT }).then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);

  sequelize
    .authenticate()
    .then(() => console.log('PSQL connected!'))
    .catch((err) => console.log(err));
});
