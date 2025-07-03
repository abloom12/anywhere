import { Store } from '@/core/Store';
import { type SettingsStore } from './types';
import { getSettings } from './api';

export const appSettings = new Store<SettingsStore>();

async function getUserSettings() {
  try {
    const response: SettingsStore = await getSettings();
  } catch (error) {
    //
  }
}
