import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { signOut } from 'next-auth/client';
import { GET_POLLS } from '../../graphql/queries';
import PollListView from '../view/PollListView';

export default function HomePage({ session }: { session: any }) {
  const { loading, error, data } = useQuery(GET_POLLS);

  if (error) return <div>Error getting polls.</div>;
  if (loading) return <div>Loading</div>;

  return (
    <>
      Signed in as {session.user.email} <br />
      <PollListView data={data.getPolls} />
      <Link href="/create">
        <a>Create a poll!</a>
      </Link>
      <button type="button" onClick={() => signOut()}>
        Sign out
      </button>
    </>
  );
}
