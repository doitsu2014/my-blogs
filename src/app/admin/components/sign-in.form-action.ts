'use server';

import { signIn } from '@/auth';

export async function signInAction(formData: FormData) {
  console.debug('environment: ', process.env.NODE_ENV);
  const host = process.env.PROXY_HOST || '';
  console.debug('host: ', !host ? 'undefined' : host);

  return await signIn('keycloak', {
    redirect: true,
    redirectTo: `${host}/admin`,
  });
}
