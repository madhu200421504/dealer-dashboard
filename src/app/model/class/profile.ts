// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root', // This makes it available throughout your application
// })

// export interface DealerProfile {
//   dealer_id: string;
//   dealer_name: string;
//   dealer_email: string;
//   password: string;
//   otp_validated: boolean;
//   otp: number;
//   otp_expiration: string;
//   role: string;
//   dealer_code: number;
//   location: string;
//   mobile: string;
//   phone: string;
//   deleted: boolean;
//   created_at: string;
//   updated_at: string;
//   corporate_id: string;

//   constructor() {
//   dealer_id='';

//   }

// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This makes it available throughout your application
})
export class Profile {
  dealer_id: string;
  dealer_name: string;
  dealer_email: string;

  location: string;
  mobile: string;

  constructor() {
    this.dealer_id = '';
    this.dealer_email = '';
    this.dealer_name = '';
    this.location = '';
    this.mobile = '';
  }
}
