import { fetchData } from '@/shared/lib/fetch';

export type SettingsResp = Record<string, string | null>;

export async function getSettings(): Promise<SettingsResp> {
  const response = await fetchData<SettingsResp[]>('getDefaultAnywhereSettingsJSON', {});
  return response[0];
}
