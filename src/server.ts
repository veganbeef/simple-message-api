import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';

// create app and server
const app = express();
const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true
});

// start app
server.applyMiddleware({ app, path: '/graphql' });
app.listen(
  { port: 3000 },
  (): void => console.log(`\nGraphQL is now running on http://localhost:3000/graphql`)
);
