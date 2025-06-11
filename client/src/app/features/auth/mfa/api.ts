import { fetchData } from '@/shared/lib/fetch';

export type AuthenticateLoginResp = {
  authenticatedLoginResult: 'Invalid key' | 'Expired key' | 'Too many failed attempts';
};

export async function authenticateLogin(
  user: string,
  key: string,
): Promise<AuthenticateLoginResp> {
  const response = await fetchData<AuthenticateLoginResp>('authenticatedLogin', {
    userName: user,
    genKey: key,
  });

  return response;
}
