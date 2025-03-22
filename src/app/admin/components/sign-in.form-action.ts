'use server';

import { signIn } from '@/auth';

export async function signInAction(formData: FormData) {
  const host = process.env.PROXY_HOST || '';

  return await signIn('keycloak', {
    redirect: true,
    redirectTo: `${host}/admin`,
  });
}
