import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, Session } from 'next-auth/client';
import { gql } from 'apollo-server-micro';
import { HttpLink, ApolloClient, InMemoryCache, concat } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let cookies: string | undefined = ``;

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    cookies,
  },
}));

const httpLink = new HttpLink({ uri: `http://localhost:3000/api/graphql` });

const client = new ApolloClient({
  ssrMode: typeof window === `undefined`,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  cookies = req.headers.cookie;
  const GET_USERS = gql`
    {
      getUsers {
        id
        email
        name
      }
    }
  `;
  const result = await client.query({
    query: GET_USERS,
    context: session,
  });
  console.log(result);
  res.statusCode = 200;
  res.json(result.data);
};
