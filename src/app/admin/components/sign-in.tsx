import { signIn } from '@/auth';

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('keycloak', {
          redirect: true,
          redirectTo: '/admin'
        });
      }}
    >
      <button type="submit" className="btn btn-accent w-full">
        Signin with Keycloak
      </button>
    </form>
  );
}
