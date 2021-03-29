import { gql } from '@apollo/client';

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

export const DELETE_POLL = gql`
  mutation deletePoll($pollId: String!) {
    deletePoll(pollId: $pollId) {
      id
    }
  }
`;
