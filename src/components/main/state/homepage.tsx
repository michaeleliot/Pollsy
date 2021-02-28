import { signIn, signOut, useSession } from 'next-auth/client';
import { useQuery } from '@apollo/client';
import { GET_POLLS } from '../../graphql/queries';
import SignInRedirect from '../view/signin';
import Main from '../view/main';

export default function Page({ session }: { session: any }) {
  const { loading, error, data } = useQuery(GET_POLLS);

  if (error) return <div>Error getting polls.</div>;
  if (loading) return <div>Loading</div>;

  return (
    <>
      {!session && <SignInRedirect />}
      {session && <Main data={data.getPolls} session={session} />}
    </>
  );
}
