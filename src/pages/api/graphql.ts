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
    getPolls: async (_parent: any, args: any, context: any, _info: any) =>
      prisma.poll.findMany({
        skip: args.offset,
        take: args.limit,
        include: {
          options: true,
          Answer: {
            where: {
              userId: context.session?.user.userId
                ? context.session?.user.userId
                : 1,
            },
          },
        },
      }),
    getPoll: async (_parent: any, args: any, _context: any, _info: any) =>
      prisma.poll.findUnique({
        where: { id: args.pollId },
        include: { options: true, user: true },
      }),
  },
  Mutation: {
    clearPolls: async () => {
      await prisma.answer.deleteMany();
      await prisma.option.deleteMany();
      return prisma.poll.deleteMany();
    },
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
      const userAnswer = await prisma.answer.findFirst({
        where: {
          userId: context.session?.user.userId
            ? context.session?.user.userId
            : 1,
          pollId: args.pollId,
        },
      });
      if (userAnswer) {
        await prisma.option.update({
          where: {
            id: userAnswer.optionId,
          },
          data: {
            votes: {
              decrement: 1,
            },
          },
        });
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
        return prisma.answer.update({
          where: {
            id: userAnswer.id,
          },
          data: {
            optionId: args.optionId,
          },
        });
      }
      const res = await prisma.answer.create({
        data: {
          pollId: args.pollId,
          optionId: args.optionId,
          userId: context.session?.user.userId
            ? context.session?.user.userId
            : 1,
        },
      });
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
      return res;
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
