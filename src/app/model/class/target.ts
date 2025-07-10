import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Target {
  enquiries: number;
  testDrives: number;
  orders: number;
  original?: {
    enquiries: number;
    testDrives: number;
    orders: number;
  };

  constructor() {
    this.enquiries = 1;
    this.testDrives = 3;
    this.orders = 3;

    // ✅ Set original on initialization
    this.original = {
      enquiries: this.enquiries,
      testDrives: this.testDrives,
      orders: this.orders,
    };
  }
}

