import { md5 } from '@/shared/lib/crypto';
import { parseXml } from '@/shared/util/parse-xml';
import { fetchData } from '@/shared/util/fetch';

const LOGIN_ERRORS = {
  'Failed attempts': '',
  'Not active': `Your account is inactive. Please contact your System Administrator to enable your account.`,
  'Invalid username': `Invalid user name or password.`,
  'No demographics record': `There is no Name in Demographics defined for your user. Please contact your system administrator to login to Anywhere.`,
  'No recipient': `Two-Factor authentication is enabled for your organization. There was no valid email address or cell phone number found for your account. Please contact your system administrator to login to Anywhere.`,
  'Expired password': '',
};

function authenticateUser(authResp: string) {
  if (!authResp) {
    //! Please enter a valid username.
  }

  if (authResp.indexOf('609')) {
    //? custom password change
  }
  if (authResp.indexOf('608')) {
    //? user name does not exist
  }

  const resXML: XMLDocument = parseXml(authResp);
  const windowName = resXML.getElementsByTagName('window_name')[0];

  if (windowName.innerHTML === 'Token') {
    // $.session.isPSI = username === 'PSI'
  }

  if (windowName.innerHTML === '2FA') {
  }

  if (windowName.innerHTML === 'Invalid username') {
  }
  if (windowName.innerHTML === 'Failed attempts') {
    const count = resXML.getElementsByTagName('special_data')[0].innerHTML;
  }
  if (windowName.innerHTML === 'Expired password') {
  }
  if (windowName.innerHTML === 'Not active') {
  }
  if (windowName.innerHTML === 'No demogrphics record') {
  }
  if (windowName.innerHTML === 'No recipient') {
  }
}

export async function login(user: string, password: string) {
  const response = await fetchData('getLogIn', {
    userId: user,
    hash: md5(password),
  });
}

export async function logout() {}

export async function changePassword() {}

export async function resetPassword() {}
