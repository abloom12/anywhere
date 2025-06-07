import { login } from './api';

export type LoginResult =
  | { kind: 'success'; token: string; isPSI: boolean }
  | { kind: 'mfa'; deviceId: string }
  | { kind: 'failed attempts'; count: string }
  | { kind: 'error'; message: string };

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
    const responseXML = await login(user, password);
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
      return { kind: 'error', message: `Error: Empty <results>` };
    }

    if (windowName === 'Token') {
      return { kind: 'success', token: specialData, isPSI: user.toLowerCase() === 'psi' };
    }

    if (windowName === '2FA') {
      return { kind: 'mfa', deviceId: specialData };
    }

    if (windowName.toLowerCase() === 'failed attempts') {
      return { kind: 'failed attempts', count: specialData };
    }

    return {
      kind: 'error',
      message:
        LOGIN_ERRORS[windowName as keyof typeof LOGIN_ERRORS] ||
        'Unkown error with /getLogIn',
    };
  } catch (error) {
    if (error instanceof Error) {
      return { kind: 'error', message: `Login Error: ${error.message}` };
    }

    return { kind: 'error', message: `Unkown error with /getLogIn` };
  }
}
