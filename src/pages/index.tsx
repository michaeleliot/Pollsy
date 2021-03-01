import { useSession } from 'next-auth/client';
import HomePage from '../components/main/state/homepage';
import SignInRedirect from '../components/main/view/SignInPage';

export default function Page() {
  const [session, sessionLoading] = useSession();
  if (sessionLoading) return <div>Loading</div>;

  return session ? <HomePage session={session} /> : <SignInRedirect />;
}
