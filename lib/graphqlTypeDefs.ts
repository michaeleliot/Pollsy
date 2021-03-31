import { gql } from '@apollo/client';

export const typeDefs = gql`
  type User {
    email: String
    name: String
  }
  type Poll {
    id: String
    title: String
    description: String
    privacy: Privacy
    user: User
    mine: Boolean
    options: [Option]
  }
  type Option {
    id: String
    description: String
    votes: Int
    selected: Boolean
  }
  input OptionInput {
    description: String
  }
  type Answer {
    id: String
    option: Option
    optionId: String
    userId: Int
  }
  type Query {
    getUsers: [User]
    getCurrentUser: User
    getPolls(offset: Int, limit: Int, mine: Boolean): [Poll]
    getPoll(pollId: String!): Poll
  }
  type Mutation {
    createPoll(
      title: String
      description: String
      privacy: Privacy
      options: [OptionInput]
    ): Poll
    deletePoll(pollId: String!): Poll
    answerPoll(optionId: String!, pollId: String!): Answer
    clearPolls: [Poll]
  }
  enum Privacy {
    PUBLIC
    PRIVATE
    LINKED
  }
`;