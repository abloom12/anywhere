import { md5 } from '@/shared/lib/crypto';
import { parseXml } from '@/shared/util/parse-xml';
import { fetchData } from '@/shared/util/fetch';

export async function getUser(user: string, password: string): Promise<string> {
  // onSubmit call /getLogIn
  // getLogInResults === TOKEN
  // store TOKEN in global store

  const authResp = await fetchData('getLogIn', {
    userId: user,
    hash: md5(password),
  });

  if (!authResp) {
    //! Please enter a valid username.
  }

  if (authResp.indexOf('609')) {
    //? custom password change
  }
  if (authResp.indexOf('608')) {
    //? user name does not exist
  }

  const resXML = parseXml(authResp);
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

  return 'hey';
}

const LOGIN_ERRORS = {
  'Failed attempts': '',
  'Not active': `Your account is inactive. Please contact your System Administrator to enable your account.`,
  'Invalid username': `Invalid user name or password.`,
  'No demographics record': `There is no Name in Demographics defined for your user. Please contact your system administrator to login to Anywhere.`,
  'No recipient': `Two-Factor authentication is enabled for your organization. There was no valid email address or cell phone number found for your account. Please contact your system administrator to login to Anywhere.`,
  'Expired password': '',
};

async function onPageLoad() {
  const resp = await fetchData('getCustomTextAndAnywhereVersion', {});
  function companyLogo() {
    // './images/custom-logo/customLogo.jpg'
  }
}

async function onLoginSuccess() {
  //? This function holds what we should "pre fetch" on first route load
  //? although we can not tie this to '/' (home route) bc we only want to fetch this data once
  //? maybe we create a app.init() or somethig for this one time only stuff that only happens on after login

  // DO WHENEVER: checkVersion()

  const resp = await fetchData('getUserPermissions', {});

  // setSessionVariables() => checkModulePermissions() =>

  const resp2 = await fetchData('getDefaultAnywhereSettingsJSON', {});

  // disableModules() => loadApp('home')

  const resp3 = await fetchData('getLocationsJSON', {});
}

async function loadApp() {
  const resp2 = await fetchData('featureLogging', {
    featureDescription: 'Anywhere __moduleName__',
  });

  // go to home route (dashboard)
}
