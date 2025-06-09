// @ts-nocheck
//! do not delete above

//1: checkModulePermissions()
//2: getDefaultAnywhereSettings()
//3: disableModules();
//4: loadApp();

function checkforErrors(xmlReturn) {
  //check for Errors
  var retVal = 0;
  //alert("checkForErrors" + xmlReturn);
  var ErrorText = $('Error', xmlReturn).text();
  //alert('Error text: ' + ErrorText);
  //session didn't exist
  if (ErrorText == 'Error:606') {
    //setCookieOnFail("<Errors><Error>Please log in again.</Error></Errors>");
    errorMessage = 'Please log in again.';
    retVal = -1;
  }
  //session expired
  if (ErrorText == 'Error:607') {
    //setCookieOnFail("<Errors><Error>Session has timed out, please log in again.</Error></Errors>");
    errorMessage = 'Session has timed out, please log in again.';
    retVal = -1;
  }
  //session didn't exist
  if (ErrorText == 'Error:608') {
    //setCookieOnFail("<Errors><Error>This user name does not exist in demographics.</Error></Errors>");
    errorMessage = 'This user name does not exist in demographics.';
    retVal = -1;
  }
  if (ErrorText == 'Error:609') {
    //setCookieOnFail("<Errors><Error>Password has expired</Error></Errors>");
    errorMessage = 'Password has expired.';
    retVal = -1;
  }
  if (ErrorText == 'Error:610') {
    //setCookieOnFail("<Errors><Error>Previous Password is invalid</Error></Errors>");
    errorMessage = 'Previous Password is invalid.';
    retVal = -1;
  }
  return retVal;
}

//
windowName === 'Expired password';
customPasswordChange();
//
if (res.indexOf('609') > -1) {
  customPasswordChange();
}
//
if ($('#error').hasClass('hippaRestriction')) {
  $('#errortext').text('Password cannot match a recently used password');
} else if ($('#error').hasClass('userInputError')) {
  $('#errortext').text('Invalid username or password');
} else if (res.indexOf('608') > -1) {
  $('#errortext').text('This user name does not exist in demographics.');
} else {
  $('#errortext').text('Login unsuccessful');
}

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
