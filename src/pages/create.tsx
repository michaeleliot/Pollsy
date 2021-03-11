import { useSession } from 'next-auth/client';
import CreateForm from '@/components/create/CreateForm';
import SignInRedirect from '../components/main/view/SignInPage';

export default function Page() {
  const [session, sessionLoading] = useSession();
  if (sessionLoading) return <div>Loading</div>;

  return session ? <CreateForm /> : <SignInRedirect />;
}
