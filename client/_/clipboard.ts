// @ts-nocheck
/* eslint-disable */ // for ESLint
/* tslint:disable */ // for TSLint

//* AFTER USER LOGS IN (fetch: /getLogIn) ---OLD---
// create cookie with response from /getLogIn
// fetch: /getStrongPassword !!!ONLY NEEDED FOR CHANING/RESETING PASSWORD
// setUpGoogleMapsApi() => knob()
// setSession() (read the cookie we set from /getLogIn, this sets $.session.Token)
// fetch: /getUserPermissions
// setSessionVariables() with response from /getUserPermissions
// checkModulePermissions() This sets which modules user can access
// fetch: /getDefaultAnywhereSettingsJSON
// disableModules() Guess this also sets which modules user can access
// loadApp('home') Navigate to dashboard page

//* AFTER USER LOGS IN (fetch: /getLogIn) ---NEW---
// set TOKEN (this comes from /getLogIn)
// FETCH: /getUserPermissions => THEN: setSessionVariables() => THEN: checkModulePermissions()
// FETCH: /getDefaultAnywhereSettingsJSON => THEN: disableModules()
//? checkModulePermissions & disableModules both handle hiding/showing nav module links
// AppRouter.navigate('/')

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
