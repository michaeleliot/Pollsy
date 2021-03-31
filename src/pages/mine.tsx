import { useSession } from 'next-auth/client';
import TopBar from '../components/main/view/TopBar';
import Polls from '../components/main/state/Polls';
import SignInRedirect from '../components/main/view/SignInPage';

export default function Page() {
  const [session, sessionLoading] = useSession();
  if (sessionLoading) return <div>Loading</div>;

  return session ? (
    <>
      <TopBar email={session.user.email as string} />
      <Polls mine />
    </>
  ) : (
    <SignInRedirect />
  );
}
