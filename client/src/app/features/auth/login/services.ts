import { login, type LoginResp, getPermissions, getSettings } from './api';

type LoginResult =
  | { kind: 'success'; token: string; isPSI: boolean }
  | { kind: 'mfa'; deviceId: string }
  | { kind: 'failed attempts'; count: string }
  | { kind: 'error'; error: string };

const LOGIN_ERRORS = {
  'Failed attempts': '',
  'Expired password': '',
  'Not active': `Your account is inactive. Please contact your System Administrator to enable your account.`,
  'Invalid username': `Invalid user name or password.`,
  'No demographics record': `There is no Name in Demographics defined for your user. Please contact your system administrator to login to Anywhere.`,
  'No recipient': `Two-Factor authentication is enabled for your organization. There was no valid email address or cell phone number found for your account. Please contact your system administrator to login to Anywhere.`,
};

export async function loginUser(user: string, password: string): Promise<LoginResult> {
  try {
    const responseXML: LoginResp = await login(user, password);
    const windowNameNode = responseXML.getElementsByTagName('window_name')[0];
    const specialDataNode = responseXML.getElementsByTagName('special_data')[0];
    const windowName = windowNameNode?.innerHTML;
    const specialData = specialDataNode?.innerHTML;

    if (!windowNameNode) {
      //TODO: idk yet (this would be responseXML === "<results></results>\" ?? I think at least)
      // if (''.indexOf('609')) {
      //   //? custom password change
      // }
      // if (''.indexOf('608')) {
      //   //? user name does not exist
      // }
    }

    if (windowName === 'Token') {
      return { kind: 'success', token: specialData, isPSI: user === 'psi' };
    }

    if (windowName === '2FA') {
      return { kind: 'mfa', deviceId: specialData };
    }

    //? do we need to return count or for failed attempts and teh rest we just return kind: error along with custom error message?
    if (windowName.toLowerCase() === 'failed attempts') {
      return { kind: 'failed attempts', count: specialData };
    }

    //TODO: get login error and swap it for the string below
    // if (windowName === 'Invalid username') {}
    // if (windowName === 'Expired password') {}
    // if (windowName === 'Not active') {}
    // if (windowName === 'No demogrphics record') {}
    // if (windowName === 'No recipient') {}

    return { kind: 'error', error: `Login Error` };
  } catch (error) {
    if (error instanceof Error) {
      return { kind: 'error', error: `Login Error: ${error.message}` };
    }

    return { kind: 'error', error: `Unkown error with /getLogIn` };
  }
}

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
