import { signIn, signOut, useSession } from 'next-auth/client';
import { useQuery } from '@apollo/client';
import { Poll } from '@prisma/client';
import { GET_POLLS } from '../components/graphql/queries';

export default function Page() {
  const [session, sessionLoading] = useSession();
  if (sessionLoading) return <div>Loading</div>;

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
          <ul>
            {data.getPolls.map((poll: Poll) => (
              <li>{`${poll.title}: ${poll.description}`}</li>
            ))}
          </ul>
          <button type="button" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      )}
    </>
  );
}
