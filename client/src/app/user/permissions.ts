import { fetchData } from '@/shared/util/fetch';

async function getUserPermissions() {
  const resp = await fetchData('getUserPermissions', {});
}
