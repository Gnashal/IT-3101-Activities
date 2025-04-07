import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import bodyParser from 'body-parser';

const prisma = new PrismaClient();

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    updateUser(id: ID!, name: String, email: String): User!
    deleteUser(id: ID!): User!
  }
`;

const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    user: async (_, { id }) => await prisma.user.findUnique({ where: { id: Number(id) } }),
  },

  Mutation: {
    createUser: async (_, { name, email }) => {
      return await prisma.user.create({ data: { name, email } });
    },
    updateUser: async (_, { id, name, email }) => {
      return await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email }
      });
    },
    deleteUser: async (_, { id }) => {
      return await prisma.user.delete({ where: { id: Number(id) } });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

await server.start();

app.use('/graphql', expressMiddleware(server));

const PORT = 4003;
app.listen(PORT, () => {
  console.log(`🚀 User-service running at http://localhost:${PORT}/graphql`);
});
