import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { signOut } from 'next-auth/client';
import { GET_POLLS } from '../../graphql/queries';
import PollListView from '../view/PollListView';

export default function HomePage({
  session,
  mine,
}: {
  session: any;
  mine: boolean;
}) {
  const { loading, error, data, fetchMore } = useQuery(GET_POLLS, {
    variables: {
      offset: 0,
      limit: 20,
      mine,
    },
  });

  if (error) return <div>Error getting polls.</div>;
  if (loading) return <div>Loading</div>;

  const polls = data.getPolls;
  return (
    <>
      <div className="flex justify-between p-5">
        <div className="flex gap-5">
          <Link href="/">Pollsy</Link>
          <Link href="/mine">{session.user.email}</Link>
          <button
            type="button"
            className="text-gray-600"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
        <div>
          <Link href="/create">
            <a>Create a poll!</a>
          </Link>
        </div>
      </div>
      <PollListView data={polls} fetchMore={fetchMore} mine={mine} />
    </>
  );
}
