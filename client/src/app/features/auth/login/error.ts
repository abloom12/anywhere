const LOGIN_ERRORS = {
  'Failed attempts': '',
  'Not active': `Your account is inactive. Please contact your System Administrator to enable your account.`,
  'Invalid username': `Invalid user name or password.`,
  'No demographics record': `There is no Name in Demographics defined for your user. Please contact your system administrator to login to Anywhere.`,
  'No recipient': `Two-Factor authentication is enabled for your organization. There was no valid email address or cell phone number found for your account. Please contact your system administrator to login to Anywhere.`,
  'Expired password': '',
};

function getLoginError(windowName: string, specialData: string) {
  if (windowName === 'Token') {
    // $.session.isPSI = username === 'PSI'
  }

  if (windowName === '2FA') {
  }

  if (windowName === 'Invalid username') {
  }
  if (windowName === 'Failed attempts') {
    const count = specialData;
  }
  if (windowName === 'Expired password') {
  }
  if (windowName === 'Not active') {
  }
  if (windowName === 'No demogrphics record') {
  }
  if (windowName === 'No recipient') {
  }
}
