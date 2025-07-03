// @ts-nocheck
//! do not delete above

function checkModulePermissions() {
  if ($.session.DayServiceView == false) {
    $('#dayservicesettingsdiv').addClass('disabledModule');
  }
  if ($.session.GoalsView == false) {
    $('#goalssettingsdiv').addClass('disabledModule');
  }
  if (
    $.session.CaseNotesView == false ||
    $.session.CaseNotesTablePermissionView == false
  ) {
    $('#casenotessettingsdiv').addClass('disabledModule');
  }
  if ($.session.SingleEntryView == false) {
    $('#singleentrysettingsdiv').addClass('disabledModule');
  }
  if ($.session.WorkshopView == false) {
    $('#workshopsettingsdiv').addClass('disabledModule');
  }
  if ($.session.incidentTrackingView == false) {
    $('#incidenttrackingsettingsdiv').addClass('disabledModule');
  }
  if ($.session.schedulingView == false) {
    $('#schedulersettingsdiv').addClass('disabledModule');
  }
  if ($.session.authorizationsView == false) {
    $('#authorizationsdiv').addClass('disabledModule');
  }
  if ($.session.planView == false) {
    $('#plansettingsdiv').addClass('disabledModule');
  }
  if ($.session.transportationView == false) {
    $('#transportationsettingsdiv').addClass('disabledModule');
  }
  if ($.session.emarView == false) {
    $('#emarsettingsdiv').addClass('disabledModule');
  }
  if ($.session.formsView == false) {
    $('#PDFFormssettingsdiv').addClass('disabledModule');
  }
  if ($.session.OODView == false) {
    $('#OODsettingsdiv').addClass('disabledModule');
  }
  if ($.session.ResetPasswordView == false) {
    $('#Adminsettingdiv').addClass('disabledModule');
  }
  if ($.session.EmploymentView == false) {
    $('#Employmentsettingsdiv').addClass('disabledModule');
  }
  if ($.session.FSSView == false) {
    $('#fSSdiv').addClass('disabledModule');
  }
  if ($.session.CFView == false) {
    $('#cfAccountDiv').addClass('disabledModule');
  }
  if ($.session.CFViewEditAccounts == false) {
    $('#cfEditAccountDiv').addClass('disabledModule');
  }

  if ($.session.CFView == false && $.session.CFViewEditAccounts == false) {
    $('#consumerfinancessettingsdiv').addClass('disabledModule');
  }

  $('#adminsingleentrysettingsdiv').hide();
  if ($.session.ViewAdminSingleEntry === true) {
    if ($.session.SEViewAdminWidget === true) {
      $('#adminsingleentrysettingsdiv').show();
    }
  }
}

function disableModules() {
  if ($.session.applicationName == 'Gatekeeper') {
    $('#singleentrysettingsdiv').css('display', 'none');
    $('#adminsingleentrysettingsdiv').css('display', 'none');
    $('#transportationsettingsdiv').css('display', 'none');
    $('#OODsettingsdiv').css('display', 'none');

    $('#customlinks').css('display', 'none');
  }

  if ($.session.applicationName == 'Advisor') {
    $('#authorizationsdiv').css('display', 'none');
    $('#waitingListdiv').css('display', 'none');
    $('#fSSdiv').css('display', 'none');
  }

  if ($.session.dayServicesPermission == 'Anywhere_DayServices') {
    // leave module on
  } else {
    $('#dayservicesettingsdiv').css('display', 'none');
  }

  if ($.session.outcomesPermission == 'Anywhere_Outcomes') {
    // leave module on
  } else {
    $('#goalssettingsdiv').css('display', 'none');
  }

  if ($.session.workshopPermission == 'Anywhere_Workshop') {
    // leave module on
  } else {
    $('#workshopsettingsdiv').hide();
  }

  if ($.session.intellivuePermission == 'Intellivue') {
    // leave module on
  } else {
    $('#intellivuesettingsdiv').hide();
  }

  if ($.session.caseNotesPermission == 'Anywhere_CaseNotes') {
    // leave module on
  } else {
    $('#casenotessettingsdiv').css('display', 'none');
  }

  if ($.session.singleEntryPermission == 'Anywhere_SingleEntry') {
    // leave module on
  } else {
    $('#singleentrysettingsdiv').css('display', 'none');
  }
  if ($.session.singleEntryApproveEnabled == 'Y') {
    //Leave module on
  } else {
    //$("#adminsingleentrysettingsdiv").css("display", "none");
  }
  if ($.session.incidentTrackingPermission == 'Anywhere_Incident_Tracking') {
    //Leave module on
  } else {
    $('#incidenttrackingsettingsdiv').css('display', 'none');
  }
  if ($.session.anywhereSchedulingPermission == 'Anywhere_Scheduling') {
    //Leave module on
  } else {
    $('#schedulersettingsdiv').css('display', 'none');
  }
  if ($.session.covidPermission == 'COVID_19') {
    //Leave module on
  } else {
    $('#covidchecklistsettingsdiv').css('display', 'none');
  }
  if ($.session.transportationPermission == 'Anywhere_Transportation') {
    //Leave module on
  } else {
    $('#transportationsettingsdiv').css('display', 'none');
  }
  if ($.session.emarPermission == 'Anywhere_eMAR') {
    //Leave module on
  } else {
    $('#emarsettingsdiv').css('display', 'none');
  }
  if ($.session.formsPermission == 'Anywhere_Forms') {
    //Leave module on
  } else {
    $('#PDFFormssettingsdiv').css('display', 'none');
  }
  if ($.session.OODPermission == 'Anywhere_OOD') {
    //Leave module on
  } else {
    $('#OODsettingsdiv').css('display', 'none');
  }
  if ($.session.anywherePlanPermission == 'Anywhere_Plan') {
    //Leave module on
  } else {
    $('#plansettingsdiv').css('display', 'none');
  }

  if ($.session.anywhereResetPasswordPermission == 'Anywhere_Administration') {
    //Leave module on
  } else {
    $('#Adminsettingdiv').css('display', 'none');
  }

  if ($.session.anywhereConsumerFinancesPermission == 'Anywhere_Consumer_Finances') {
    //Leave module on
  } else {
    $('#consumerfinancessettingsdiv').css('display', 'none');
  }

  if ($.session.anywhereEmploymentPermission == 'Anywhere_Employment') {
    //Leave module on
  } else {
    $('#Employmentsettingsdiv').css('display', 'none');
  }

  if ($.session.anywhereFSSPermission == 'Anywhere_FSS') {
    //Leave module on
  } else {
    $('#fSSdiv').css('display', 'none');
  }
}
