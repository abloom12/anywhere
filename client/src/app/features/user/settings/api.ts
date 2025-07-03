import { fetchData } from '@/shared/lib/fetch';
import { type SettingsStore } from './types';

export async function getSettings(): Promise<SettingsStore> {
  const response = await fetchData<SettingsStore[]>('getDefaultAnywhereSettingsJSON', {});
  return response[0];
}
