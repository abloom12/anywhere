import { md5 } from '@/shared/lib/crypto';
import { fetchData } from '@/shared/lib/fetch';
import { parseXml } from '@/shared/lib/parse-xml';

export async function login(user: string, password: string): Promise<XMLDocument> {
  const response = await fetchData<string>('getLogIn', {
    userId: user,
    hash: md5(password),
  });

  return parseXml(response);
}
