import { fetchData } from '@/shared/lib/fetch';

export async function getPermissions(): Promise<any> {
  // all permissions including module view permissions (hide/show link and guard route)
  const response = await fetchData('getUserPermissions', {});
  return response;
}

export async function getSettings(): Promise<any> {
  const response = await fetchData('getDefaultAnywhereSettingsJSON', {});
  return response;
}
