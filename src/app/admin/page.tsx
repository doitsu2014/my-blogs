import { signIn, signOut, auth } from '@/auth';

export default async function AdminHomePage() {
  const session = await auth();
  if (session) {
    return <>{session.user?.email}</>;
  }

  return <></>;
}
