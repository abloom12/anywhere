export type SettingsStore = {
  administrator: string | null;
  adminPermission: string | null;
  allowCallOffRequests: string | null;
  anyRequireEndTime: string | null;
  anyUndocumentedServices: string | null;
  anywhereConsumerFinancesPermission: string | null;
  anywhereEmploymentPermission: string | null;
  anywhereFSSPermission: string | null;
  anywhereMainPermission: string | null;
  anywherePlanPermission: string | null;
  anywhereResetPasswordPermission: string | null;
  anywhereSchedulingPermission: string | null;
  appendITCause: string | null;
  appendITImmediateAction: string | null;
  appendITPreventionPlan: string | null;
  appendITSummary: string | null;
  application: 'Advisor' | 'Gatekeeper';
  automateSimpleBilling: string | null;
  azureSttApi: string | null;
  billableTransportation: string | null;
  caseNotesPermission: string | null;
  checklist_days_back: string | null;
  covidPermission: string | null;
  dayServicesPermission: string | null;
  defaultEmploymentgroup: string | null;
  defaultEmploymentgroupname: string | null;
  defaultEmploymentlocation: string | null;
  defaultEmploymentlocationname: string | null;
  defaultFormsgroup: string | null;
  defaultFormsgroupname: string | null;
  defaultFormslocation: string | null;
  defaultFormslocationname: string | null;
  defaultMoneyManagementLocation: string | null;
  defaultMoneyManagementLocationName: string | null;
  defaultOODLocation: string | null;
  defaultOODLocationName: string | null;
  defaultOutcomesLocation: string | null;
  defaultOutcomesLocationName: string | null;
  defaultTimeEntrygroup: string | null;
  defaultTimeEntrygroupname: string | null;
  defaultTimeEntrylocation: string | null;
  defaultTimeEntrylocationname: string | null;
  defaultcontact: string | null;
  defaultdayservicelocation: string | null;
  defaultdayservicelocationname: string | null;
  defaultplangroup: string | null;
  defaultplangroupname: string | null;
  defaultplanlocation: string | null;
  defaultplanlocationname: string | null;
  defaultrostergroup: string | null;
  defaultrostergroupname: string | null;
  defaultrosterlocation: string | null;
  defaultrosterlocationname: string | null;
  defaulttimeclocklocation: string | null;
  defaulttimeclocklocationName: string | null;
  defaultworkshoplocation: string | null;
  defaultworkshoplocationname: string | null;
  emarPermission: string | null;
  formsPermission: string | null;
  incidentTrackingPermission: string | null;
  incidentTrackingPopulateIncidentDate: string | null;
  incidentTrackingPopulateIncidentTime: string | null;
  incidentTrackingPopulateReportedDate: string | null;
  incidentTrackingPopulateReportedTime: string | null;
  incidentTrackingShowCauseAndContributingFactors: string | null;
  incidentTrackingShowPreventionPlan: string | null;
  incidentTracking_days_back: string | null;
  intellivuePermission: string | null;
  isASupervisor: string | null;
  minutesToTimeout: string | null;
  notes_days_back: string | null;
  ohioEVVChangeDate: string | null;
  oneSpan: string | null;
  OODPermission: string | null;
  outcomesPermission: string | null;
  planFormCarryover: string | null;
  planPeopleId: string | null;
  portraitPath: string | null;
  removeGoalsWidget: string | null;
  removeSEAdminMap: string | null;
  reportSeconds: string | null;
  requireTimeEntryTransportationTimes: string | null;
  RequireViewPlan: string | null;
  requestOpenShifts: string | null;
  resetPassword: string | null;
  schedulingPermission: string | null;
  seShowConsumerNote: string | null;
  seShowConsumerSignature: string | null;
  seShowTransportation: string | null;
  sendWaitingListEmail: string | null;
  setting_value: string | null;
  showConsumerNote: string | null;
  showConsumerSignature: string | null;
  singleEntryApproveEnabled: string | null;
  singleEntryLocationRequired: string | null;
  singleEntryPermission: string | null;
  stateAbbreviation: 'OH' | 'IN';
  sttEnabled: string | null;
  transportationPermission: string | null;
  useAbsentFeature: string | null;
  useProgressNotes: string | null;
  warningEndTime: string | null;
  warningStartTime: string | null;
  webPermission: string | null;
  workshopPermission: string | null;
};
