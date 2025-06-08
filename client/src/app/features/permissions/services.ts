import { Store } from '@/core/Store';
import { capitalize } from '@/shared/lib/strings';
import { CustomError } from '@/shared/util/custom-error';
import { getPermissions, type PermissionsResp } from './api';

type PermissionStore = {
  'token': string;
  'user': Map<string, string | boolean>;
  'staffLocations': Map<string, string>;
  'defaultStaffLocation': string;
  //modules
  'Authorizations': Map<string, string>;
  'Case Notes': Map<string, string>;
  'Consumer Finances': Map<string, string>;
  'Day Services': Map<string, string>;
  'Demographics': Map<string, string>;
  'Employment': Map<string, string>;
  'eMAR': Map<string, string>;
  'Forms': Map<string, string>;
  'FSS': Map<string, string>;
  'Incident Tracking': Map<string, string>;
  'OOD': Map<string, string>;
  'Reset Passwords': Map<string, string>;
  'Roster': Map<string, string>;
  'Scheduling': Map<string, string>;
  'Single Entry': Map<string, string>;
  'Service Activity': Map<string, string>;
  'Transportation': Map<string, string>;
  'User Home': Map<string, string>;
  'Workshop': Map<string, string>;
  'Plan': Map<string, string>;
  'Waiting List Assessment': Map<string, string>;
};

export const appPermissions = new Store<PermissionStore>();

function setPermissions(response: PermissionsResp) {
  for (const resp of response) {
    const windowName = resp.window_name;
    const permKey = windowName
      .split(' ')
      //.map(chunk => capitalize(chunk.toLowerCase()))
      .join('');

    if (windowName === 'IsAnAdmin') {
      appPermissions.get('user')?.set('isAdmin', resp.permission === 'Y');
      continue;
    }

    if (windowName === 'Name') {
      appPermissions.get('user')?.set('id', resp.special_data);
      appPermissions.get('user')?.set('firstName', resp.permission);
      continue;
    }

    if (windowName === 'LName') {
      appPermissions.get('user')?.set('peopleId', resp.special_data);
      appPermissions.get('user')?.set('lastName', resp.permission);
      continue;
    }

    if (windowName === 'stafflocation') {
      appPermissions.get('staffLocations')?.set(resp.special_data, resp.permission);
      continue;
    }

    if (windowName.includes('Anywhere')) {
      appPermissions.get(
        windowName.replace('Anywhere', '').trim() as keyof PermissionStore,
      );
    }
  }
}

export async function setUserPermissions() {
  try {
    const response = await getPermissions();
    setPermissions(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError(
        error.name,
        `Message: ${error.message} {StackTrace: ${error.stack}}`,
      );
    }
  }
}
