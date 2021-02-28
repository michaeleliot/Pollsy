import { ApolloServer, gql } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getCurrentUser: async (
      _parent: any,
      _args: any,
      context: any,
      _info: any,
    ) =>
      prisma.user.findUnique({ where: { email: context.session.user.email } }),
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
    getCurrentUser: User
  }
`;

const context = async ({ req }: { req: any }) => {
  req.headers.cookie = req.headers.cookies
    ? req.headers.cookies
    : req.headers.cookie;
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
