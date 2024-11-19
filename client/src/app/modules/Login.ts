import { md5 } from '@/util/crypto';
import { fetchData } from '@/util/fetch';
import { parseXml } from '@/util/parseXML';

const LOGIN_ERRORS = {
  'Failed attempts': '',
  'Not active': `Your account is inactive. Please contact your System Administrator to enable your account.`,
  'Invalid username': `Invalid user name or password.`,
  'No demographics record': `There is no Name in Demographics defined for your user. Please contact your system administrator to login to Anywhere.`,
  'No recipient': `Two-Factor authentication is enabled for your organization. There was no valid email address or cell phone number found for your account. Please contact your system administrator to login to Anywhere.`,
  'Expired password': '',
};

// const form = new Form({
//   name: "login",
//   fields: [
//     field.text("userId", "Login Name").$,
//     field.password("password", "Password").$,
//     field.textarea("aboutYou", "About You...").$,
//   ],
// });

async function onLoginAttempt() {
  const resp = await fetchData('getLogIn', {
    userId: 'ash',
    hash: md5('ash'),
  });

  if (!resp) {
    //! Please enter a valid username.
  }

  if (resp.indexOf('609')) {
    //? custom password change
  }
  if (resp.indexOf('608')) {
    //? user name does not exist
  }

  const resXML = parseXml(resp);
  const windowName = resXML.getElementsByTagName('window_name')[0];

  if (windowName.innerHTML === 'Token') {
    // $.session.isPSI = username === 'PSI'
    onLoginSuccess();
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

async function onLoginSuccess() {
  //? This function holds what we should "pre fetch" on first route load
  //? although we can not tie this to '/' (home route) bc we only want to fetch this data once
  //? maybe we create a app.init() or somethig for this one time only stuff that only happens on after login

  // DO WHENEVER: checkVersion()

  const resp = await fetchData('getUserPermissions', {});

  // setSessionVariables() => checkModulePermissions() => 

  const resp2 = await fetchData('getDefaultAnywhereSettingsJSON', {});

  // disableModules() => loadApp('home')
}

async function loadApp() {
  const resp2 = await fetchData('featureLogging', {featureDescription: 'Anywhere __moduleName__'});

  // go to home route (dashboard)
}