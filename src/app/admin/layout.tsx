import { auth, signIn, signOut } from '@/auth';

export default async function AdminLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session) {
    return (
      <>
        {session.user?.email}

        <button
          onClick={async () => {
            'use server';
            await signOut();
          }}
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button
        onClick={async () => {
          'use server';
          await signIn('keycloak');
        }}
      >
        Sign in
      </button>
    </>
  );
}
