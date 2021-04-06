import { useSession, signIn } from 'next-auth/client';
import TopBar from '../components/main/view/TopBar';
import Polls from '../components/main/state/Polls';

export default function Index() {
  const [session, sessionLoading] = useSession();
  if (sessionLoading) return <div>Loading</div>;

  if (!session) {
    signIn();
    return <div> Redirecting </div>;
  }
  return (
    <>
      <TopBar name={session!.user.name as string} />
      <Polls />
    </>
  );
}
