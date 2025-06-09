import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This makes it available throughout your application
})
export class Vehicle {
  vehicle_id: string;
  YOM: string;
  vehicle_name: string;
  type: string;
  VIN: string;
  created_at: string;
  updated_at: string;
  corporate_id: string;
  deleted: boolean;
  chasis_number: string;
  demo_start_date: string;
  demo_end_date: string;

  constructor() {
    this.deleted = false;
    this.vehicle_id = ' ';
    this.YOM = '';
    this.vehicle_name = '';
    this.type = '';
    this.VIN = '';
    this.created_at = '';
    this.updated_at = '';
    this.corporate_id = '';
    this.chasis_number = '';
    this.demo_start_date = '';
    this.demo_end_date = '';
  }
}
