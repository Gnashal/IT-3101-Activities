import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';

const prisma = new PrismaClient();
const pubsub = new PubSub();

// GraphQL Schema
const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!): Post!
  }

  type Subscription {
    postCreated: Post!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    posts: async () => await prisma.post.findMany(),
    post: async (_, { id }) => await prisma.post.findUnique({ where: { id: Number(id) } }),
  },
  
  Mutation: {
    createPost: async (_, { title, content }) => {
      const post = await prisma.post.create({ data: { title, content } });

      // Publish the new post event
      pubsub.publish('POST_CREATED', { postCreated: post });

      return post;
    }
  },

  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(['POST_CREATED'])
    }
  }
};

// Create the schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an HTTP server
const httpServer = createServer();

// Create Apollo Server
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req, pubsub })
});

// Start the Apollo server
server.applyMiddleware({ app: httpServer });

// Create a WebSocket server for subscriptions
const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  {
    server: httpServer, // Attach to the HTTP server
    path: server.graphqlPath, // Use the same path as Apollo Server
  }
);

// Start the HTTP server
httpServer.listen(4002, () => {
  console.log(`🚀 Server ready at http://localhost:4002${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:4002${server.graphqlPath}`);
});