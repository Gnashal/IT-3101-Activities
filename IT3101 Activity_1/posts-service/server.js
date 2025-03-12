import {ApolloServer, gql} from 'apollo-server'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

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
    updatePost(id: ID!, title: String, content: String): Post!
    deletePost(id: ID!): Post!
  }
`;
const resolvers = {
    Query: {
      posts: async () => await prisma.post.findMany(),
      post: async (_, { id }) => await prisma.post.findUnique({ where: { id: Number(id) } }),
    },
    Mutation: {
      createPost: async (_, { title, content }) =>
        await prisma.post.create({ data: { title, content } }),
  
      updatePost: async (_, { id, title, content }) =>
        await prisma.post.update({ where: { id: Number(id) }, data: { title, content } }),
  
      deletePost: async (_, { id }) =>
        await prisma.post.delete({ where: { id: Number(id) } }),
    },
  };


const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen({ port: 4002 })
  .then(serverInfo => console.log(`Server running at ${serverInfo.url}`));