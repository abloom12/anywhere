export type PermissionStore = {
  'token': string;
  'user': Map<string, string | boolean>;
  'staffLocations': Map<string, string>;
  'defaultStaffLocation': string;
  //modules
  'Authorizations': Map<AuthorizationsKeys, boolean>;
  'Case Notes': Map<CaseNotesKeys, boolean>;
  'Consumer Finances': Map<ConsumerFinancesKeys, boolean>;
  'Day Services': Map<DayServiceKeys, boolean>;
  'Demographics': Map<DemographicsKeys, boolean>;
  'Employment': Map<EmploymentKeys, boolean>;
  'eMAR': Map<eMarKeys, boolean>;
  'Forms': Map<FormsKeys, boolean>;
  'FSS': Map<FSSKeys, boolean>;
  'Incident Tracking': Map<IncidentTrackingKeys, boolean>;
  'OOD': Map<OODKeys, boolean>;
  'Reset Passwords': Map<ResetPasswordKeys, boolean>;
  'Roster': Map<RosterKeys, boolean>;
  'Scheduling': Map<SchedulingKeys, boolean>;
  'Single Entry': Map<SingleEntryKeys, string | boolean>;
  'Service Activity': Map<ServiceActivityKeys, boolean>;
  'Transportation': Map<TransportationKeys, boolean>;
  'User Home': Map<UserHomeKeys, boolean>;
  'Workshop': Map<WorkshopKeys, boolean>;
  'Plan': Map<PlanKeys, boolean>;
  'Waiting List Assessment': Map<WaitingListKeys, boolean>;
};

type AuthorizationsKeys = 'View' | 'View Vendor Info';

type CaseNotesKeys = 'View' | 'Update' | 'View Entered' | 'Update Entered' | 'SSA Notes';

type ConsumerFinancesKeys =
  | 'View'
  | 'Update'
  | 'Delete'
  | 'Insert'
  | 'Add Payee'
  | 'Edit Account Entries'
  | 'Insert Accounts'
  | 'Update Edit Accounts'
  | 'View Edit Accounts'
  | 'View Checking'
  | 'View Credit Card'
  | 'View Food Stamps'
  | 'View Petty Cash'
  | 'View Savings'
  | 'View Christmas Club'
  | 'View System 2018.3A'
  | 'View System 2018.3'
  | 'View Ohio EBT'
  | 'View Food Stamp Debit Card EBT';

type DayServiceKeys =
  | 'View'
  | 'Update'
  | 'Delete'
  | 'Insert'
  | 'Deny TimeClock Change'
  | 'Override location requirement';

type DemographicsKeys =
  | 'View'
  | 'Update'
  | 'View Relationships'
  | 'View General'
  | 'Update Picture'
  | 'Delete Picture'
  | 'View Notes'
  | 'View Attachments'
  | 'View Location Schedule'
  | 'View DOB'
  | 'View Medicaid Number'
  | 'View Medicare Number'
  | 'View Resident Number'
  | 'View SSN'
  | 'View Consumer Number'
  | 'View Local ID'
  | 'Update Relationships';

type eMarKeys = 'View';

type EmploymentKeys =
  | 'View'
  | 'Update'
  | 'Delete'
  | 'Insert Employers'
  | 'Update Employers';

type FormsKeys = 'View' | 'Update' | 'Delete' | 'Insert';

type FSSKeys = 'View' | 'Update' | 'Delete' | 'Insert';

type IncidentTrackingKeys =
  | 'View'
  | 'Update'
  | 'Delete'
  | 'Insert'
  | 'Reviewed By User'
  | 'Email Incident'
  | 'View incident'
  | 'View internal investigation'
  | 'View mui'
  | 'View ui';

type OODKeys = 'View' | 'Update' | 'Delete' | 'Insert' | 'Insert Employers';

type PlanKeys =
  | 'View'
  | 'Update'
  | 'Delete Plan'
  | 'Send to DODD'
  | 'Send to Portal'
  | 'Insert New Team Member'
  | 'Assign Case Load'
  | 'Update DOB'
  | 'Update Building Number'
  | 'Clear Signatures'
  | 'Download Plans'
  | 'Update Email';

type ResetPasswordKeys = 'View' | 'Update';

type RosterKeys = 'Delete Absent' | 'Hide Progress Notes';

type SchedulingKeys = 'View' | 'Update';

type ServiceActivityKeys =
  | 'View'
  | 'Update'
  | 'Insert Outcomes'
  | 'Update Outcomes'
  | 'Insert Services'
  | 'Update Services'
  | 'Update Plan'
  | 'Review';

export type SingleEntryKeys =
  | 'View'
  | 'Update'
  | 'Edit Time Entry'
  | 'ShowServiceLocations'
  | 'DocumentTime'
  | 'AddConsumerOnBillable';

type TransportationKeys = 'View' | 'Update' | 'Manage Routes' | 'Add Routes';

type UserHomeKeys =
  | 'Deny Staff TimeClock Change'
  | 'View My Information'
  | 'Update My Information';

type WaitingListKeys = 'View' | 'Update' | 'Delete' | 'Insert';

type WorkshopKeys = 'View' | 'Update';
