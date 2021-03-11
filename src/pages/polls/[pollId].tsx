import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import PollView from '../../components/main/view/PollView';
import { GET_POLL } from '../../components/graphql/queries';
import SignInRedirect from '../../components/main/view/SignInPage';

export default function Page() {
  const router = useRouter();
  const { pollId } = router.query;

  const [session, sessionLoading] = useSession();
  if (sessionLoading) return <div>Loading</div>;

  const { loading, error, data } = useQuery(GET_POLL, {
    variables: {
      pollId: parseInt(pollId as string, 10),
    },
  });

  if (error) return <div>Error getting poll.</div>;
  if (loading) return <div>Loading</div>;

  return session ? (
    <div>
      <PollView poll={data.getPoll} />
      <Link href="/">
        <a>Back to the Homepage</a>
      </Link>
    </div>
  ) : (
    <SignInRedirect />
  );
}
