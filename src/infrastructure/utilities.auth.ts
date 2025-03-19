import { auth } from '@/auth';

export const buildHeader = async (includeAuthorizedToken: boolean = true, isContentTypeJson: boolean = true) => {
  const session = await auth();
  
  let header: any = {
  };

  if (includeAuthorizedToken && session?.accessToken) {
    header['Authorization'] = `Bearer ${session.accessToken}`;
  }

  if (isContentTypeJson) {
    header["Content-Type"] = 'application/json';
  }

  return header;
};