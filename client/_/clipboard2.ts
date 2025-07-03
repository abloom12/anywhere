// @ts-nocheck
// prettier-ignore

function getDefaultAnywhereSettings() {
  // $.session.anAdmin = res.admistrator;
  $.session.defaultCaseNoteReviewDays = res.setting_value === '' ? '7' : res.setting_value;
  $.session.defaultProgressNoteReviewDays = res.notes_days_back === '' ? '99' : res.notes_days_back;
  $.session.defaultIncidentTrackingDaysBack = res.incidentTracking_days_back === '' ? '7' : res.incidentTracking_days_back;
  $.session.defaultProgressNoteChecklistReviewDays = res.checklist_days_back === '' ? '7' : res.checklist_days_back;
  $.session.anywhereMinutestotimeout = res.minutesToTimeout === '' ? '15' : res.minutesToTimeout;
  $.session.removeGoalsWidget = res.removeGoalsWidget === 'Y' ? true : false;
  $.session.seAdminRemoveMap = res.removeSEAdminMap === 'Y' ? true : false;
  $.session.isASupervisor = res.isASupervisor === '' ? false : true;
  $.session.sttEnabled = res.sttEnabled === 'Y' ? true : false;
  $.session.watchingConnection = '';
  $.session.azureSTTApi = res.azureSttApi;
  $.session.reportSeconds = res.reportSeconds;
  $.session.incidentTrackingPopulateIncidentDate = res.incidentTrackingPopulateIncidentDate;
  $.session.incidentTrackingPopulateIncidentTime = res.incidentTrackingPopulateIncidentTime;
  $.session.incidentTrackingPopulateReportedDate = res.incidentTrackingPopulateReportedDate;
  $.session.incidentTrackingPopulateReportedTime = res.incidentTrackingPopulateReportedTime;
  $.session.incidentTrackingShowCauseAndContributingFactors = res.incidentTrackingShowCauseAndContributingFactors === 'Y' ? true : false;
  $.session.incidentTrackingShowPreventionPlan = res.incidentTrackingShowPreventionPlan === 'Y' ? true : false;
  $.session.updateIncidentSummaryText = res.appendITSummary === 'Y' ? true : false;
  $.session.updateIncidentActionText = res.appendITImmediateAction === 'Y' ? true : false;
  $.session.updateIncidentPreventionText = res.appendITPreventionPlan === 'Y' ? true : false;
  $.session.updateIncidentCauseText = res.appendITCause === 'Y' ? true : false;
  $.session.planFormCarryover = res.planFormCarryover === 'Y' ? true : false;
  //Waiting List
  $.session.sendWaitingListEmail = true; // res.sendWaitingListEmail === 'Y' ? true : false;
  //Hide stuff
  $.session.useAbsentFeature = res.useAbsentFeature;
  $.session.billableTransportation = res.billableTransportation;
  $.session.requireTimeEntryTransportationTimes = res.requireTimeEntryTransportationTimes;
  $.session.ohioEVVChangeDate = res.ohioEVVChangeDate;
  $.session.anyRequireEndTime = res.anyRequireEndTime;
  $.session.useProgressNotes = res.useProgressNotes;
  $.session.applicationName = res.application;
  $.session.portraitPath = res.portraitPath;
  $.session.anywhereMainPermission = res.anywhereMainPermission;
  $.session.outcomesPermission = res.outcomesPermission;
  $.session.dayServicesPermission = res.dayServicesPermission;
  $.session.caseNotesPermission = res.caseNotesPermission;
  $.session.incidentTrackingPermission = res.incidentTrackingPermission;
  $.session.singleEntryPermission = res.singleEntryPermission;
  $.session.workshopPermission = res.workshopPermission;
  $.session.intellivuePermission = res.intellivuePermission;
  $.session.schedulingPermission = res.schedulingPermission;
  $.session.anywhereSchedulingPermission = res.anywhereSchedulingPermission;
  $.session.covidPermission = res.covidPermission;
  $.session.webPermission = res.webPermission; //Should be set equal to Web when true
  $.session.transportationPermission = res.transportationPermission;
  $.session.emarPermission = res.emarPermission;
  $.session.formsPermission = res.formsPermission;
  $.session.OODPermission = res.OODPermission;
  $.session.anywherePlanPermission = res.anywherePlanPermission;
  $.session.singleEntryApproveEnabled = res.singleEntryApproveEnabled;
  $.session.singleEntryLocationRequired = res.singleEntryLocationRequired;
  $.session.singleEntryShowConsumerSignature = res.seShowConsumerSignature;
  $.session.singleEntryShowConsumerNote = res.seShowConsumerNote;
  $.session.singleEntryShowTransportation = res.seShowTransportation;
  $.session.schedAllowCallOffRequests = res.allowCallOffRequests;
  $.session.schedRequestOpenShifts = res.requestOpenShifts;
  $.session.oneSpan = res.oneSpan;
  $.session.anywhereResetPasswordPermission = res.anywhereResetPasswordPermission;
  $.session.anywhereConsumerFinancesPermission = res.anywhereConsumerFinancesPermission;
  $.session.anywhereEmploymentPermission = res.anywhereEmploymentPermission;
  $.session.anywhereFSSPermission = res.anywhereFSSPermission;
  //Default Work
  $.session.defaultRosterLocation = res.defaultrosterlocation;
  $.session.defaultRosterLocationName = res.defaultrosterlocationname;
  $.session.defaultRosterGroupValue = res.defaultrostergroup;
  $.session.defaultDayServiceLocation = res.defaultdayservicelocation === 'notDSCertified' ? '' : res.defaultdayservicelocation;
  $.session.defaultDayServiceLocationName = res.defaultdayservicelocationname;
  $.session.dsCertified = res.defaulttimeclocklocation === 'notDSCertified' ? false : true;
  $.session.defaultDSTimeClockValue = res.defaulttimeclocklocation;
  $.session.defaultDSTimeClockName = res.defaulttimeclocklocationName;
  $.session.defaultWorkshopLocationValue = res.defaultworkshoplocation;
  $.session.defaultWorkshopLocation = res.defaultworkshoplocationname;
  $.session.defaultMoneyManagementLocationValue = res.defaultMoneyManagementLocation;
  $.session.defaultMoneyManagementLocation = res.defaultMoneyManagementLocationName;
  //database state - Indiana or Ohio
  $.session.stateAbbreviation = res.stateAbbreviation;
  $.session.planPeopleId = res.planPeopleId;

  if ($.session.applicationName === 'Gatekeeper') {
    $.session.caseNotesWarningStartTime = res.warningStartTime;
    $.session.caseNotesWarningEndTime = res.warningEndTime;
  }

  defaultRosterLocationValue = res.defaultrosterlocation;
  defaultRosterLocationName = res.defaultrosterlocationname;
  defaultDayServiceLocationValue = res.defaultdayservicelocation;
  defaultDayServiceLocationName = res.defaultdayservicelocationname;
  defaultTimeClockLocationValue = res.defaulttimeclocklocation;
  defaultTimeClockLocationName = res.defaulttimeclocklocationname;
  defaultWorkshopLocationValue = res.defaultworkshoplocation;
  defaultWorkshopLocationName = res.defaultworkshoplocationname;
  defaultRosterGroupValue = res.defaultrostergroup;
  defaultRosterGroupName = res.defaultrostergroupname;
  $.session.defaultWorkshopLocation = defaultWorkshopLocationName;
}
