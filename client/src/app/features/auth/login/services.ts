import { login } from './api';

export type LoginResult =
  | { type: 'success'; token: string; isPSI: boolean }
  | { type: 'mfa'; deviceId: string }
  | { type: 'expired password' }
  | { type: 'failed attempts'; message: string }
  | { type: 'error'; name?: string; message: string };

const ERROR_MESSAGES: Record<string, string> = {
  'not active': `Your account is inactive. Please contact your System Administrator to enable your account.`,
  'invalid username': `Invalid user name or password.`,
  'no demographics record': `There is no Name in Demographics defined for your user. Please contact your system administrator to login to Anywhere.`,
  'no recipient': `Two-Factor authentication is enabled for your organization. There was no valid email address or cell phone number found for your account. Please contact your system administrator to login to Anywhere.`,
  'failed attempts:1': `Invalid user name or password.`,
  'failed attempts:2': `This is your second failed login attempt. If you have one more failed attempt your account will become inactive. Please use the Forgot Password link below to reset your password.`,
  'failed attempts:3': `Your account is inactive due to the number of failed login attempts. Please contact your System Administrator to enable your account.`,
};

export async function loginUser(user: string, password: string): Promise<LoginResult> {
  try {
    const responseXML = await login(user, password);
    const windowNameNode = responseXML.getElementsByTagName('window_name')[0];
    const specialDataNode = responseXML.getElementsByTagName('special_data')[0];
    const windowName = windowNameNode?.innerHTML.toLowerCase();
    const specialData = specialDataNode?.innerHTML;

    if (windowName === 'token') {
      return { type: 'success', token: specialData, isPSI: user.toLowerCase() === 'psi' };
    }

    if (windowName === '2fa') {
      return { type: 'mfa', deviceId: specialData };
    }

    if (windowName === 'expired password') {
      return { type: 'expired password' };
    }

    if (windowName === 'failed attempts') {
      const key = `${windowName}:${specialData}`;

      return {
        type: 'failed attempts',
        message: ERROR_MESSAGES[key] ?? 'Unknown failed attempts error.',
      };
    }

    return {
      type: 'error',
      name: windowName,
      message: ERROR_MESSAGES[windowName] || 'Unknown error with /getLogIn',
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);

    if (error instanceof Error) {
      return { type: 'error', message: `Login Error: ${error.message}` };
    }

    return { type: 'error', message: `Unkown error with /getLogIn` };
  }
}
