import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Poll from '../../components/main/state/Poll';
import { GET_POLL } from '../../components/graphql/queries';

export default function Page() {
  const router = useRouter();
  const { pollId } = router.query;

  const [session, sessionLoading] = useSession();
  if (sessionLoading) return <div>Loading</div>;

  if (!session) {
    signIn();
    return <div> Redirecting </div>;
  }

  const { loading, error, data } = useQuery(GET_POLL, {
    variables: {
      pollId,
    },
  });

  if (error) return <div>Error getting poll.</div>;
  if (loading) return <div>Loading</div>;

  return (
    <div>
      <Poll poll={data.getPoll} />
      <Link href="/">
        <a>Back to the Homepage</a>
      </Link>
    </div>
  );
}
