import { Store } from '@/core/Store';
import { type SettingsStore } from './types';
import { getSettings, type SettingsResp } from './api';

export const appSettings = new Store<SettingsStore>();

async function getUserSettings() {
  try {
    const response: SettingsResp = await getSettings();
  } catch (error) {
    //
  }
}
