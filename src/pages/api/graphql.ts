import { ApolloServer, UserInputError } from 'apollo-server-micro';
import { Option, PollPrivacy } from '@prisma/client';
import { getSession } from 'next-auth/client';
import { typeDefs } from '../../components/graphql/queries';
import prisma from '../../../lib/prismaClient';

export const resolvers = {
  Query: {
    getCurrentUser: async (
      _parent: any,
      _args: any,
      context: any,
      _info: any,
    ) =>
      prisma.user.findUnique({ where: { email: context.session.user.email } }),
    getPolls: async (_parent: any, args: any, context: any, _info: any) => {
      const userId = context.session?.user?.userId ?? 1;
      const where = args.mine ? { userId } : { privacy: PollPrivacy.PUBLIC };
      let polls = await prisma.poll.findMany({
        skip: args.offset,
        take: args.limit,
        where,
        include: {
          options: {
            include: {
              answers: true,
            },
          },
        },
      });
      // TODO Have this filtering done in the sql request can use prisma raw call
      polls = polls.map((poll) => {
        const poll_copy = poll;
        poll_copy.options = poll.options.map((option: Option) => {
          const option_copy: any = option;
          option_copy.votes = option_copy.answers.length;
          option_copy.selected = option_copy.answers.some(
            (answer: any) => answer.userId === userId,
          );
          delete option_copy.answers;
          return option_copy;
        });
        return poll_copy;
      });
      return polls;
    },
    getPoll: async (_parent: any, args: any, context: any, _info: any) => {
      const userId = context.session?.user?.userId ?? 1;
      const poll_copy = await prisma.poll.findUnique({
        where: { id: args.pollId },
        include: { options: { include: { answers: true } }, user: true },
      });
      if (poll_copy) {
        poll_copy.options = poll_copy.options.map((option: Option) => {
          const option_copy: any = option;
          option_copy.votes = option_copy.answers.length;
          option_copy.selected = option_copy.answers.some(
            (answer: any) => answer.userId === userId,
          );
          delete option_copy.answers;
          return option_copy;
        });
        return poll_copy;
      }
      throw new UserInputError(`Invalid poll`);
    },
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
          privacy: args.privacy,
        },
        include: {
          options: true,
        },
      }),
    answerPoll: async (_parent: any, args: any, context: any, _info: any) => {
      if (false) {
        return prisma.answer.upsert({
          where: {
            user_poll_unique_constraint: {
              userId: context.session?.user.userId
                ? context.session?.user.userId
                : 1,
              pollId: args.pollId,
            },
          },
          update: {
            optionId: args.optionId,
          },
          create: {
            pollId: args.pollId,
            optionId: args.optionId,
            userId: context.session?.user.userId,
          },
        });
      }
      return prisma.answer.create({
        data: {
          pollId: args.pollId,
          optionId: args.optionId,
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
