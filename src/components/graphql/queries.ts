import { gql } from '@apollo/client';

export const typeDefs = gql`
  type User {
    email: String
    name: String
  }
  type Poll {
    title: String
    description: String
    user: User
    options: [Option]
  }
  type Option {
    id: Int
    description: String
    votes: Int
  }
  input OptionInput {
    description: String
  }
  type Answer {
    user: User
    option: Option
  }
  type Whatever {
    optionId: Int
    count: Int
  }
  type Query {
    getUsers: [User]
    getCurrentUser: User
    getPolls: [Poll]
    getPollInfo(pollId: Int!): [Whatever]
  }
  type Mutation {
    createPoll(title: String, description: String, options: [OptionInput]): Poll
    answerPoll(optionId: Int!): Answer
    clearPolls: [Poll]
  }
`;

export const GET_USER = gql`
  {
    getCurrentUser {
      id
      email
      name
    }
  }
`;

export const GET_POLLS = gql`
  {
    getPolls {
      title
      description
    }
  }
`;

export const CREATE_POLL = gql`
  mutation createPoll(
    $title: String!
    $description: String!
    $options: [OptionInput]!
  ) {
    createPoll(title: $title, description: $description, options: $options) {
      title
      description
      options {
        description
      }
    }
  }
`;

export const ANSWER_POLL = gql`
  mutation answerPoll($optionId: Int!) {
    answerPoll(option: $optionId) {
      pollId
    }
  }
`;
