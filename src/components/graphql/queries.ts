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
    answerPoll(optionId: String!, pollId: String!): Answer
    clearPolls: [Poll]
  }
  enum Privacy {
    PUBLIC
    PRIVATE
    LINKED
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
  query getPolls($offset: Int, $limit: Int, $mine: Boolean) {
    getPolls(offset: $offset, limit: $limit, mine: $mine) {
      id
      title
      description
      privacy
      options {
        id
        description
        votes
        selected
      }
    }
  }
`;

export const GET_POLL = gql`
  query getPoll($pollId: String!) {
    getPoll(pollId: $pollId) {
      id
      title
      description
      privacy
      user {
        name
      }
      options {
        id
        description
        votes
        selected
      }
    }
  }
`;

export const CREATE_POLL = gql`
  mutation createPoll(
    $title: String!
    $description: String!
    $options: [OptionInput]!
    $privacy: Privacy
  ) {
    createPoll(
      title: $title
      description: $description
      options: $options
      privacy: $privacy
    ) {
      title
      description
      privacy
      options {
        description
      }
    }
  }
`;

export const ANSWER_POLL = gql`
  mutation answerPoll($optionId: String!, $pollId: String!) {
    answerPoll(optionId: $optionId, pollId: $pollId) {
      option {
        id
      }
    }
  }
`;
