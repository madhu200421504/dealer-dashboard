export class Users {
  user_id: string;
  user_account_id: string;
  account_id: string;
  name: string;
  email: string;
  phone: string;
  user_role: string;
  dealer_code: string;
  static role: any;
  role_id: string;
  role_name: string;
  team_name: string;
  team_id: string;
  // dealer_id: string;
  fname: string;
  lname: string;
  // role: string;
  password: string; // Default or fetched separately if needed
  otp: string;
  otp_validated: false;
  otp_expiration: string;
  created_at: string;
  updated_at: string;
  deleted: false;
  corporate_id: string;

  constructor() {
    this.user_account_id = '';
    (this.user_id = ''), (this.account_id = '');
    this.name = '';
    this.email = '';
    this.phone = '';
    this.user_role = '';
    this.dealer_code = '';
    this.role_id = '';
    this.role_name = '';
    this.team_name = '';
    // this.dealer_id = '';
    this.team_id = '';
    this.fname = '';
    this.lname = '';
    // this.role = '';
    (this.password = ''), // Default or fetched separately if needed
      (this.otp = ''),
      (this.otp_validated = false),
      (this.otp_expiration = ' '),
      (this.created_at = ''),
      (this.updated_at = ' '),
      (this.deleted = false),
      (this.corporate_id = '');
  }
}
