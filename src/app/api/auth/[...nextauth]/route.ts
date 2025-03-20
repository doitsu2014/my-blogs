import { handlers } from '@/auth';
import NextAuth from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';

export const { GET, POST } = handlers;
