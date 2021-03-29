import Link from 'next/link';
import { signOut } from 'next-auth/client';

export default function HomePage({ email }: { email: string }) {
  return (
    <div className="flex justify-between p-5">
      <div className="flex gap-5">
        <Link href="/">Pollsy</Link>
        <Link href="/mine">{email}</Link>
        <button
          type="button"
          className="text-gray-600"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
      <div>
        <Link href="/create">
          <a>Create a poll!</a>
        </Link>
      </div>
    </div>
  );
}
