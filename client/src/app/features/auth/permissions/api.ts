import { fetchData } from '@/shared/lib/fetch';

type getPermissionsResp = {
  permission: string;
  special_data: string;
  window_name: string;
};

type getSettingsResp = Record<string, string | null>;

export async function getPermissions(): Promise<getPermissionsResp> {
  // all permissions including module view permissions (hide/show link and guard route)
  const response = (await fetchData('getUserPermissions', {})) as getPermissionsResp[];
  return response[0];
}

export async function getSettings(): Promise<getSettingsResp> {
  const response = (await fetchData(
    'getDefaultAnywhereSettingsJSON',
    {},
  )) as getSettingsResp[];
  return response[0];
}
