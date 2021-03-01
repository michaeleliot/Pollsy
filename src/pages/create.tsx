import { useSession } from 'next-auth/client';
import CreateForm from '@/components/create/CreateForm';

export default function Page() {
  const [session, sessionLoading] = useSession();
  if (sessionLoading) return <div>Loading</div>;

  return <CreateForm />;
}
