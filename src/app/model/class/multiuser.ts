import { Injectable } from '@angular/core';
import { Teams } from './team';

@Injectable({
  providedIn: 'root',
})
export class UserList {
  user_id: string;
  account_id: string;
  name: string;
  email: string;
  phone: number | undefined | null;
  user_role: string | null;
  password: string;
  otp_validated: string;
  otp: string;
  otp_expiration: string;
  corporate_id: string;
  // dealer_code: number | undefined | null;
  // dealer_id: string;
  role_id: string;
  role_name: string;
  team_id: string;
  team_name: string;
  fname: string;
  lname: string;

  team?: Teams;
  role: string;

  constructor() {
    this.user_id = '';
    this.account_id = '';
    this.name = '';
    this.phone = undefined;
    this.email = '';
    this.user_role = '';
    this.password = '';
    this.otp_validated = '';
    this.otp = '';
    this.otp_expiration = '';
    // this.dealer_code = undefined;
    this.corporate_id = '';
    // this.dealer_id = '';
    this.role_id = '';
    this.role_name = '';
    this.team_id = '';
    this.team_name = '';
    this.fname = '';
    this.lname = '';

    this.role = '';
  }
}
