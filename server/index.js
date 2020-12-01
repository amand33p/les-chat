const { ApolloServer } = require('apollo-server');
const { sequelize } = require('./models');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { PORT } = require('./utils/config');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`);

  sequelize
    .authenticate()
    .then(() => console.log('PSQL connected!'))
    .catch((err) => console.log(err));
});
