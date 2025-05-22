import { md5 } from '@/shared/lib/crypto';
import { fetchData } from '@/shared/util/fetch';
import { parseXml } from '@/shared/util/parse-xml';

export type LoginResp = XMLDocument;

export async function login(user: string, password: string): Promise<LoginResp> {
  const response = await fetchData('getLogIn', {
    userId: user,
    hash: md5(password),
  });

  return parseXml(response) as LoginResp;
}
