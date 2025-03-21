import { signIn } from '@/auth';

export default function SignIn() {
  return (
    <form
      action={async (formData: FormData) => {
        'use server';
        await signIn('keycloak', {
          redirect: true,
          redirectTo: `${process.env.NEXT_PUBLIC_HOST}/admin`
        });
      }}
    >
      <button type="submit" className="btn btn-accent w-full">
        Signin with Keycloak
      </button>
    </form>
  );
}
