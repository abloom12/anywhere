import { fetchData } from '@/shared/util/fetch';

async function getUserSettings() {
  const resp2 = await fetchData('getDefaultAnywhereSettingsJSON', {});
}
