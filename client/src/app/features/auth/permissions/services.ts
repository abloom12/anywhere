import { Store } from '@/core/Store';
import { capitalize } from '@/shared/lib/strings';
import { getPermissions, getSettings } from './api';

type StaffLocations = {
  name: string;
  id: string;
};
type PermissionTypes = boolean | string | StaffLocations[];

export const permissions = new Store<PermissionTypes>();
export const settings = new Store<boolean | string>();

async function getUserPermissions() {
  try {
    const response = await getPermissions();
    for (const resp of response) {
      const windowName = resp.window_name;
      const permKey = windowName
        .split(' ')
        .map(chunk => capitalize(chunk.toLowerCase()))
        .join('');

      if (windowName === 'Name') {
        permissions.set('userId', resp.special_data);
        permissions.set('userFirstName', resp.permission);
        continue;
      }

      if (windowName === 'LName') {
        permissions.set('peopleId', resp.special_data);
        permissions.set('userLastName', resp.permission);
        continue;
      }

      if (windowName === 'stafflocation') {
        if (!permissions.has(permKey)) {
          permissions.set(permKey, []);
        }

        const perm = permissions.get(permKey);
        if (Array.isArray(perm)) {
          perm.push({
            name: resp.permission,
            id: resp.special_data,
          });
        }
      }

      permissions.set(permKey, resp.permission);
    }
  } catch (error) {
    //
  }
}

async function getUserSettings() {
  try {
    const response = await getSettings();
  } catch (error) {
    //
  }
}
