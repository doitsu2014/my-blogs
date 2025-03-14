import { auth } from '@/auth';

export const getFetchHeaderWithAuthorization = async () => {
  const session = await auth();
  return {
    Authorization: `Bearer ${session?.accessToken}`,
    'Content-Type': 'application/json'
  };
};
