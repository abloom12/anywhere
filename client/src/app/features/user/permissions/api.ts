import { fetchData } from '@/shared/lib/fetch';

export type PermissionsResp = {
  permission: string;
  special_data: string;
  window_name: string;
}[];

export async function getPermissions(): Promise<PermissionsResp> {
  const response = await fetchData<PermissionsResp>('getUserPermissions', {});
  return response;
}
