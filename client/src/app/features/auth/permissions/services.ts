import { Store } from '@/core/Store';
import { getPermissions, getSettings } from './api';

export const permissions = new Store<boolean | string>();
export const settings = new Store<boolean | string>();

export async function getUserPermissions() {
  try {
    const resp = await getPermissions();
  } catch (error) {
    //
  }
}

export async function getUserSettings() {
  try {
    const resp = await getSettings();
  } catch (error) {
    //
  }
}
