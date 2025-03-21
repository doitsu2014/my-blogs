import { signIn } from '@/auth';

export default function SignIn() {
  return (
    <form
      action={async (formData: FormData) => {
        'use server';
        const host = formData.get('host') as string;
        console.log(host);
        await signIn('keycloak', {
          redirect: true,
          redirectTo: `${host}/admin`
        });
      }}
    >
      <input type="hidden" name="host" value={process.env.NEXT_PUBLIC_HOST || ''} />
      <button type="submit" className="btn btn-accent w-full">
        Signin with Keycloak
      </button>
    </form>
  );
}
