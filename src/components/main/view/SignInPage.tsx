import { signIn } from 'next-auth/client';

export default function SignInRedirect() {
  return (
    <>
      Not signed in <br />
      <button type="button" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}