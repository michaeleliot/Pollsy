import { signIn, signOut, useSession } from 'next-auth/client';
import { useQuery } from '@apollo/client';
import { GET_POLLS } from '../components/graphql/queries';

export default function Page() {
  const [session, sessionLoading] = useSession();
  const { loading, error, data } = useQuery(GET_POLLS);

  if (error) return <div>Error getting polls.</div>;
  if (loading || sessionLoading) return <div>Loading</div>;

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
