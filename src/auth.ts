import NextAuth from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Keycloak({
      clientId: 'my-blogs-admin-localhost',
      clientSecret: 'jBYbpUPFAeqgbgm6u6ESilDuRNwlyjKN',
      issuer: 'https://keycloak-admin.doitsu.tech/realms/master'
    })
  ]
});
