import { signOut } from 'next-auth/client';
import { Poll } from '@prisma/client';

export default function Main({
  data,
  session,
}: {
  data: Poll[];
  session: any;
}) {
  return (
    <>
      Signed in as {session.user.email} <br />
      <ul>
        {data.map((poll: Poll) => (
          <li>{`${poll.title}: ${poll.description}`}</li>
        ))}
      </ul>
      <button type="button" onClick={() => signOut()}>
        Sign out
      </button>
    </>
  );
}
