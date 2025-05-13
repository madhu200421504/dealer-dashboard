import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Target {
  enquiries: number;
  testDrives: number;
  orders: number;

  constructor() {
    this.enquiries = 1;
    this.testDrives = 3;
    this.orders = 3;
  }
}
