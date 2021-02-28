import { gql } from '@apollo/client';

export const GET_USER = gql`
  {
    getCurrentUser {
      id
      email
      name
    }
  }
`;
