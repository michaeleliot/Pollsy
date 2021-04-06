import { useSession, signIn } from 'next-auth/client';
import CreateForm from '@/components/create/CreateForm';

export default function Create() {
  const [session, sessionLoading] = useSession();
  if (sessionLoading) return <div>Loading</div>;
  if (!session) {
    signIn();
    return <div> Redirecting </div>;
  }
  return <CreateForm />;
}
