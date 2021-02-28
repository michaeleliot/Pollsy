import { signIn, signOut, useSession } from 'next-auth/client';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../components/graphql/user';

export default function Page() {
  const [session, sessionLoading] = useSession();
  const { loading, error, data } = useQuery(GET_USER);

  if (error) return <div>Error getting user.</div>;
  if (loading) return <div>Loading</div>;

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button type="button" onClick={() => signIn()}>
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button type="button" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      )}
    </>
  );
}
