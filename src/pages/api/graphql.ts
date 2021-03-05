import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient, Option, Poll } from '@prisma/client';
import { getSession } from 'next-auth/client';
import { typeDefs } from '../../components/graphql/queries';

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
    getPolls: async () =>
      prisma.poll.findMany({
        include: {
          user: true,
          options: true,
        },
      }),
  },
  Mutation: {
    clearPolls: async () => prisma.poll.deleteMany(),
    createPoll: async (_parent: any, args: any, context: any, _info: any) =>
      prisma.poll.create({
        data: {
          title: args.title,
          description: args.description,
          userId: context.session?.user.userId
            ? context.session?.user.userId
            : 1,
          options: {
            create: args.options,
          },
        },
        include: {
          options: true,
        },
      }),
    answerPoll: async (_parent: any, args: any, context: any, _info: any) => {
      // TODO Fix this to be atomic
      await prisma.option.update({
        where: {
          id: args.optionId,
        },
        data: {
          votes: {
            increment: 1,
          },
        },
      });
      return prisma.answer.create({
        data: {
          optionId: args.optionId,
          userId: context.session?.user.userId
            ? context.session?.user.userId
            : 1,
        },
      });
    },
  },
};

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
