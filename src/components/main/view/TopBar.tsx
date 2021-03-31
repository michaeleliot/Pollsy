import Link from 'next/link';
import { signOut } from 'next-auth/client';

export default function HomePage({ name }: { name: string }) {
  return (
    <div className="flex justify-between p-5">
      <div className="flex gap-5">
        <Link href="/">Pollsy</Link>
        {name}
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
