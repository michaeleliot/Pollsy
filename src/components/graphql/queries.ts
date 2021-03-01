import { gql } from '@apollo/client';

export const typeDefs = gql`
  type User {
    id: Int
    email: String
    name: String
  }
  type Poll {
    id: Int
    title: String
    description: String
    options: [Option]
    user: User
  }
  type Option {
    id: Int
    description: String
    votes: Int
  }
  type Query {
    getUsers: [User]
    getCurrentUser: User
    getPolls: [Poll]
  }
  type Mutation {
    createPoll(title: String!, description: String!): Poll
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
    }
  }
`;
