import { Store } from '@/core/Store';
import { CustomError } from '@/shared/util/custom-error';
import { getPermissions, type PermissionsResp } from './api';
import { type PermissionStore, type SingleEntryKeys } from './types';

export const appPermissions = new Store<PermissionStore>();

let productName: 'advisor' | 'gatekeeper';

function setPermissions(response: PermissionsResp) {
  for (const resp of response) {
    const windowName = resp.window_name;

    if (windowName === 'ProductName') {
      productName = resp.permission.toLowerCase() as 'advisor' | 'gatekeeper';
      continue;
    }

    if (windowName === 'IsAnAdmin') {
      appPermissions.get('user')?.set('isAdmin', resp.permission === 'Y');
      continue;
    }

    if (windowName === 'admin') {
      //TODO: idk yet how to handle this (old anywhere 4.0 code below)
      // $.session.DayServiceView = true;
      // $.session.DayServiceInsert = true;
      // $.session.DayServiceUpdate = true;
      // $.session.DayServiceDelete = true;
      // $.session.DayServiceNonBillable = true;
      // $.session.DayServiceOverRide = true;
      // $.session.Roster = true;
      // $.session.DenyClockUpdate = false;
      // $.session.DenyClockUpdate = false;
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

    if (windowName === 'Default Staff Location') {
      appPermissions.set('defaultStaffLocation', resp.permission);
      continue;
    }

    if (windowName === 'SEShowServiceLocations' || windowName === 'SEDocumentTime') {
      const key = windowName.replace('SE', '').trim() as SingleEntryKeys;
      appPermissions.get('Single Entry')?.set(key, true);
      continue;
    }

    if (windowName === 'SEAddConsumerOnBillable') {
      const key = windowName.replace('SE', '').trim() as SingleEntryKeys;
      const value =
        resp.permission !== 'P' && resp.permission !== 'Y' ? 'N' : resp.permission;
      appPermissions.get('Single Entry')?.set(key, value);
      continue;
    }

    if (windowName.includes('Anywhere')) {
      const key = windowName.replace('Anywhere', '').trim() as keyof PermissionStore;
      (appPermissions.get(key) as Map<string, boolean>).set(resp.permission, true);
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

export function isUserAuthenticated() {
  return appPermissions.get('token') ? true : false;
}

export function getRoutePermissions() {
  const authorizations = appPermissions.get('Authorizations')?.get('View');
  const caseNotes = appPermissions.get('Case Notes')?.get('View');
  const consumerFinances = appPermissions.get('Consumer Finances')?.get('View');
  const dayServices = appPermissions.get('Day Services')?.get('View');
  const demographics = appPermissions.get('Day Services')?.get('View');
  const employment = appPermissions.get('Day Services')?.get('View');
  const eMar = appPermissions.get('Day Services')?.get('View');
  const forms = appPermissions.get('Day Services')?.get('View');
  const fss = appPermissions.get('Day Services')?.get('View');
  const incidentTracking = appPermissions.get('Day Services')?.get('View');
  const ood = appPermissions.get('Day Services')?.get('View');
  const resetPassword = appPermissions.get('Day Services')?.get('View');
  const roster = appPermissions.get('Day Services')?.get('View');
  const scheduling = appPermissions.get('Day Services')?.get('View');
  const singleEntry = appPermissions.get('Day Services')?.get('View');
  const goalsOutcomes = appPermissions.get('Service Activity')?.get('View');
  const transportation = appPermissions.get('Day Services')?.get('View');
  const userHome = appPermissions.get('Day Services')?.get('View');
  const workshop = appPermissions.get('Day Services')?.get('View');
  const plan = appPermissions.get('Day Services')?.get('View');
  const waitinglist = appPermissions.get('Day Services')?.get('View');
}
