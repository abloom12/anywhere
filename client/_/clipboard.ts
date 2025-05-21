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
