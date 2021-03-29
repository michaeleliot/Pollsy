import { ApolloServer } from 'apollo-server-micro';
import { getSession } from 'next-auth/client';
import { typeDefs } from '../../../lib/graphqlTypeDefs';
import { resolvers } from '../../../lib/graphqlResolvers';

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
