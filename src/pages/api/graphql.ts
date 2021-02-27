import { ApolloServer, gql } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/client';
import { exception } from 'console';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getUsers: async (parent, args, context, info) => prisma.user.findMany(),
  },
};

export const typeDefs = gql`
  type User {
    id: Int
    email: String
    name: String
  }
  type Query {
    getUsers: [User]
  }
`;

const context = async ({ req }: { req: any }) => {
  req.headers.cookie = req.headers.cookies;
  const session = await getSession({ req });
  return { session };
};

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: `/api/graphql` });
