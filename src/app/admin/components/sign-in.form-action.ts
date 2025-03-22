'use server';

import { signIn } from '@/auth';

export async function signInAction(formData: FormData) {
  return await signIn('keycloak', {
    redirect: true,
    redirectTo: `/admin`,
  });
}
