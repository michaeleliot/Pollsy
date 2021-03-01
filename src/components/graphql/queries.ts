import { gql } from '@apollo/client';

export const typeDefs = gql`
  type User {
    email: String
    name: String
  }
  type Poll {
    title: String
    description: String
    options: [Option]
    user: User
  }
  type Option {
    description: String
    votes: Int
  }
  input OptionInput {
    description: String
  }
  type Query {
    getUsers: [User]
    getCurrentUser: User
    getPolls: [Poll]
  }
  type Mutation {
    createPoll(
      title: String!
      description: String!
      options: [OptionInput]!
    ): Poll
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
  mutation createPoll($title: String!, $description: String!) {
    createPoll(title: $title, description: $description) {
      title
      description
      options
    }
  }
`;
