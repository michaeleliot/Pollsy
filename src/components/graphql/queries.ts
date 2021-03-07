import { gql } from '@apollo/client';

export const typeDefs = gql`
  type User {
    email: String
    name: String
  }
  type Poll {
    id: Int
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
  type Query {
    getUsers: [User]
    getCurrentUser: User
    getPolls(offset: Int, limit: Int): [Poll]
    getPoll(pollId: Int!): Poll
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
  query getPolls($offset: Int, $limit: Int) {
    getPolls(offset: $offset, limit: $limit) {
      id
      title
      description
      options {
        id
        description
        votes
      }
    }
  }
`;

export const GET_POLL = gql`
  query getPoll($pollId: Int!) {
    getPoll(pollId: $pollId) {
      id
      title
      description
      title
      user {
        name
      }
      options {
        id
        description
        votes
      }
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
    answerPoll(optionId: $optionId) {
      option {
        votes
      }
    }
  }
`;