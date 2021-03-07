import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { signOut } from 'next-auth/client';
import { GET_POLLS } from '../../graphql/queries';
import PollListView from '../view/PollListView';

export default function HomePage({ session }: { session: any }) {
  const { loading, error, data, fetchMore } = useQuery(GET_POLLS, {
    variables: {
      offset: 0,
      limit: 20,
    },
  });

  if (error) return <div>Error getting polls.</div>;
  if (loading) return <div>Loading</div>;

  const polls = data.getPolls;
  return (
    <>
      Signed in as {session.user.email} <br />
      <PollListView data={polls} fetchMore={fetchMore} />
      <Link href="/create">
        <a>Create a poll!</a>
      </Link>
      <button type="button" onClick={() => signOut()}>
        Sign out
      </button>
    </>
  );
}
