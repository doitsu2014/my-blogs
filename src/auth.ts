import NextAuth from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';
import * as jwt from 'jsonwebtoken';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Keycloak({
      clientId: 'my-blogs-admin-localhost',
      clientSecret: 'jBYbpUPFAeqgbgm6u6ESilDuRNwlyjKN',
      issuer: 'https://my-ids-admin.ducth.dev/realms/master',
      authorization: {
        params: {
          scope: 'my-headless-cms-api-all email openid profile'
        }
      },
      profile({ profile }) {
        return { ...profile };
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const identity: any = jwt.decode(account.id_token || '');
        const accessToken: any = jwt.decode(account.access_token || '');
        // Extract roles from Keycloak profile (if present)
        token.email = identity.email;
        token.roles = accessToken.realm_access.roles;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.roles = token.roles;
      session.user.email = token.email || '';
      return session;
    }
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isAdmin = nextUrl.pathname.startsWith('/admin');
    //   if (isAdmin) {
    //     if (isLoggedIn) return true;
    //     return Response.redirect(new URL('/admin', nextUrl)); // Redirect unauthenticated users to login page
    //   }
    //   // TODO: Must enhance there to support multiple apps else if (isLoggedIn) {
    //     return Response.redirect(new URL('/admin', nextUrl));
    //   }
    //   return true;
    // }
  }
});
