import NextAuth from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';
import * as jwt from 'jsonwebtoken';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID ,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER,
      authorization: {
        params: {
          scope: 'my-headless-cms-api-all email openid profile'
        }
      },
      checks: ['pkce'],
      profile({ profile }) {
        return { ...profile };
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // TOOD: need to implement refresh token
      if (account && profile) {
        // NOTE: There are place to extract information of access_token
        const identity: any = jwt.decode(account.id_token || '');
        const accessToken: any = jwt.decode(account.access_token || '');

        // Extract roles from Keycloak profile (if present)
        token.email = identity.email;
        token.name = identity.name;
        token.roles = accessToken.realm_access.roles;
        token.picture = accessToken.avatar;
        token.accessToken = account.access_token || '';
        token.refreshToken = account.refresh_token || '';
      }

      return token;
    },
    async session({ session, token }) {
      session.user.roles = token.roles;
      session.user.email = token.email || '';
      session.user.image = token.picture;
      session.accessToken = token.accessToken;
      return session;
    }
  }
});
