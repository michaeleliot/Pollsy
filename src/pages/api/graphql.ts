import { ApolloServer } from 'apollo-server-micro';
import { getSession } from 'next-auth/client';
import prisma from '@/../lib/prismaClient';
import { typeDefs } from '../../../lib/graphqlTypeDefs';
import { resolvers } from '../../../lib/graphqlResolvers';

const context = async ({ req }: { req: any }) => {
  req.headers.cookie = req.headers.cookies
    ? req.headers.cookies
    : req.headers.cookie;
  const session = await getSession({ req });
  let user = null;
  if (session) {
    user = await prisma.user.findUnique({
      where: {
        email: session!.user.email as string,
      },
    });
  }
  return { session, user };
};

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: `/api/graphql` });
