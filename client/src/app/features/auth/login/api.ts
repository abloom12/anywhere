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

export async function getPermissions(): Promise<any> {
  // all permissions including module view permissions (hide/show link and guard route)
  const response = await fetchData('getUserPermissions', {});
  return response;
}

export async function getSettings(): Promise<any> {
  const response = await fetchData('getDefaultAnywhereSettingsJSON', {});
  return response;
}
