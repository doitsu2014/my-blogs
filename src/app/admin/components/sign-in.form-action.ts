'use server';

import { signIn } from '@/auth';

export async function signInAction(formData: FormData) {
  const host = process.env.NEXT_PUBLIC_HOST || '';
  console.debug('host: ', !host ? 'undefined' : host);

  return await signIn('keycloak', {
    redirect: true,
    redirectTo: `${host}/admin`,
  });
}
