import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { Modal } from 'bootstrap';
import { ChangeDetectorRef } from '@angular/core';

import { Config } from 'datatables.net';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MultivehicleResponse,
  SingleVehicleResponse,
  VehicleResponse,
} from '../../model/interface/master';
import { Vehicle } from '../../model/class/vehicle';
import { MasterService } from '../../service/master.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AleartSrvService } from '../../service/aleart-srv.service';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    NgbModalModule,
  ],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent implements OnInit {
  // Signals for reactive state management
  count = signal<number>(0);
  vehicleList = signal<Vehicle[]>([]);
  totalVehicle = signal<number>(0);

  // Dependency Injections
  private masterSrv = inject(MasterService);
  private readonly toastr = inject(ToastrService);
  private modalService = inject(NgbModal);

  // Component State Variables
  vehicleObj: Vehicle = new Vehicle();
  // dtOptions: Config = {};
  isModalVisible = false;
  isEditMode = false;
  previousValue: string = '';

  // Form Group
  useForm: FormGroup = new FormGroup({});

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadVehicles();
  }

  // Initialize Reactive Form
  private initializeForm(): void {
    this.useForm = new FormGroup({
      vehicle_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      VIN: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      type: new FormControl('', [Validators.required]),
      YOM: new FormControl('', [Validators.required]),
      // chasis_number: new FormControl('', [Validators.required]), // Ensure this is correct
      chasis_number: new FormControl('', [Validators.required]),
      demo_start_date: new FormControl('', [Validators.required]),
      demo_end_date: new FormControl('', [Validators.required]),
    });
  }

  // Load All Vehicles
  private loadVehicles(): void {
    this.masterSrv.getAllVehicle().subscribe({
      next: (res: VehicleResponse) => {
        this.count.set(res.data.count);
        this.vehicleList.set(res.data.rows);
        // this.applyFilters(); // <-- Filter + Paginate
      },
      error: (err) => {
        this.toastr.error('Failed to load vehicles', 'Error');
        console.error('Vehicle load error:', err);
      },
    });
  }

  // Open Modal for Add/Edit
  // openModal(vehicle?: Vehicle) {
  //   // Reset form and mode
  //   this.useForm.reset();
  //   this.isEditMode = !!vehicle;

  //   if (vehicle) {
  //     // Populate form for edit
  //     this.vehicleObj = { ...vehicle };

  //     this.useForm.patchValue({
  //       vehicle_name: vehicle.vehicle_name,
  //       VIN: vehicle.VIN,
  //       type: vehicle.type,
  //       YOM: this.formatDate(vehicle.YOM),
  //       chasis_number: vehicle.chasis_number,
  //       // vehicle_id: vehicle.vehicle_id,
  //     });
  //     console.log('Edit Mode: Vechile Object ->', this.vehicleObj);
  //   } else {
  //     // ✅ Reset customerObj for creating a new user
  //     this.vehicleObj = new Vehicle();
  //     (this.vehicleObj as any).vehicle_id = undefined; // ❗ Use type assertion
  //     console.log('New vehicle Mode: Reset vehhicleobj', this.vehicleObj);
  //   }
  // }
  openModal(vehicle?: Vehicle) {
    console.log('✅ openModal() function called');

    // Reset form and set edit mode
    this.useForm.reset();
    this.isEditMode = !!vehicle; // ✅ Set edit mode flag

    console.log('hello');
    if (vehicle) {
      // ✅ Editing an existing vehicle
      this.vehicleObj = { ...vehicle };

      this.useForm.patchValue({
        vehicle_name: vehicle.vehicle_name || '',
        VIN: vehicle.VIN || '',
        type: vehicle.type || '',
        YOM: this.formatDate(vehicle.YOM) || '',
        demo_start_date: vehicle.demo_start_date
          ? this.formatDate(vehicle.demo_start_date)
          : '',
        demo_end_date: vehicle.demo_end_date
          ? this.formatDate(vehicle.demo_end_date)
          : '',
        chasis_number: vehicle.chasis_number || '',
      });
    } else {
      // ✅ Creating a new vehicle
      this.vehicleObj = new Vehicle();
      (this.vehicleObj as any).vehicle_id = undefined; // ❗ Use type assertion

      console.log('🆕 New Vehicle Mode: Reset vehicleObj', this.vehicleObj);
    }
  }

  // Disable VIN for edit mode
  // this.useForm.get('VIN')?.disable();
  // this.useForm.get('YOM')?.disable();
  // } else {
  //   // Reset for add mode
  //   this.vehicleObj = new vehicleList();
  //   this.useForm.get('VIN')?.enable();
  //   this.useForm.get('YOM')?.enable();
  // }

  // this.isModalVisible = true;

  // Close Modal

  // openModals() {
  //   ($('.bd-example-modal-sm') as any).modal('show');
  // }

  // Save New Vehicle
  // onSave(): void {
  //   console.log('Form values before submit: ', this.useForm.value);
  //   if (this.useForm.invalid) {
  //     this.markFormGroupTouched(this.useForm);
  //     this.toastr.warning(
  //       'Please fill all required fields correctly',
  //       'Validation'
  //     );
  //     return;
  //   }

  //   // Prepare submission data
  //   const formData = this.useForm.value;
  //   console.log('Form Data being sent to API:', formData);

  //   console.log('Calling createNewVehicle method...');
  //   this.masterSrv.createNewVehicle(formData).subscribe({
  //     next: () => {
  //       this.toastr.success('Vehicle Created Successfully!', 'Success');
  //       this.loadVehicles();
  //       this.closeModal();
  //     },
  //     error: (err) => {
  //       this.toastr.error(err.error.error, 'Error');
  //       console.error('Vehicle creation error:', err);
  //     },
  //   });
  // }
  // onSave() {
  //   // console.log('onSave method triggered');
  //   console.log('Form Values:', this.useForm.value); // Log the form values for debugging

  //   if (this.useForm.invalid) {
  //     this.markFormGroupTouched(this.useForm);
  //     console.log('Form Values:', this.useForm.value); // Log form values to check role_name

  //     this.toastr.warning(
  //       'Please fill all required fields correctly',
  //       'Validation'
  //     );
  //     return;
  //   }
  // onSave() {
  //   if (this.useForm.invalid) {
  //     this.markFormGroupTouched(this.useForm);
  //     console.log('Form Values:', this.useForm.value); // Log form values to check role_name

  //     this.toastr.warning(
  //       'Please fill all required fields correctly',
  //       'Validation'
  //     );
  //     return;
  //   }
  // onSave() {
  //   console.log('on save called');
  //   if (this.useForm.invalid) {
  //     this.markFormGroupTouched(this.useForm);

  //     // Log form values to check role_name
  //     console.log('Form Values:', this.useForm.value);
  //     console.log('⚠️ Missing Fields:', this.useForm.controls);

  //     // Log the invalid controls
  //     // Object.keys(this.useForm.controls).forEach((key) => {
  //     //   if (this.useForm.controls[key].invalid) {
  //     //     console.log(
  //     //       `Invalid Field: ${key}`,
  //     //       this.useForm.controls[key].errors
  //     //     );
  //     //   }
  //     // });

  //     this.toastr.warning(
  //       'Please fill all required fields correctly',
  //       'Validation'
  //     );
  //     return;
  //   }

  //   // Continue with saving if form is valid

  //   const formData = this.useForm.value;

  //   console.log('Form Data being sent to API:', formData);

  //   this.masterSrv.createNewVehicle(formData).subscribe({
  //     next: () => {
  //       this.toastr.success('Vehicle Created Successfully!', 'Success');
  //       this.loadVehicles();
  //       this.closeModal();
  //     },
  //     error: (err) => {
  //       this.toastr.error(err.error.error, 'Error');
  //       console.error('Vehicle creation error:', err);
  //     },
  //   });
  // }
  // onSave() {
  //   console.log('onsave called');
  //   if (this.useForm.invalid) {
  //     this.markFormGroupTouched(this.useForm);
  //     console.log('Form Values:', this.useForm.value); // Log form values to check role_name

  //     this.toastr.warning(
  //       'Please fill all required fields correctly',
  //       'Validation'
  //     );
  //     return;
  //   }

  //   const formData = this.useForm.value;
  //   console.log('Form Data being sent to API:', formData);

  //   this.masterSrv.createNewVehicle(formData).subscribe({
  //     next: () => {
  //       this.toastr.success('User created successfully!', 'Success');
  //       this.getAllVehicle();
  //       this.closeModal();
  //     },
  //     error: (err) => {
  //       console.error('User creation error:', err);
  //       this.toastr.error(
  //         err.message || 'Failed to create user',
  //         'Creation Error'
  //       );
  //     },
  //   });
  // }

  onSave() {
    console.log('onsave being called');
    console.log(this.useForm.value);
    console.log('Form end_date value:', this.useForm.get('end_date')?.value);

    if (this.useForm.invalid) {
      this.markFormGroupTouched(this.useForm);
      console.log('Form Values:', this.useForm.value); // Log form values to check role_name

      this.toastr.warning(
        'Please fill all required fields correctly',
        'Validation'
      );
      return;
    }

    const formData = this.useForm.value;
    console.log('Form Data being sent to API:', formData);

    this.masterSrv.createNewVehicle(formData).subscribe({
      next: () => {
        this.toastr.success('Vehicle created successfully!', 'Success');
        this.getAllVehicle();
        this.closeModal();
      },
      error: (err) => {
        console.error('Vehicle creation error:', err);
        this.toastr.error(
          err.message || 'Failed to create user',
          'Creation Error'
        );
      },
    });
  }

  // onSave() {
  //   if (this.useForm.invalid) {
  //     this.markFormGroupTouched(this.useForm);
  //     console.log('Form Values:', this.useForm.value); // Log form values to check role_name

  //     this.toastr.warning(
  //       'Please fill all required fields correctly',
  //       'Validation'
  //     );
  //     return;
  //   }
  //   console.log('hi');
  //   const formData = this.useForm.value;
  //   console.log('Form Data being sent to API:', formData);

  //   console.log('Before API Call');

  //   this.masterSrv.createNewVehicle(formData).subscribe({
  //     next: (response) => {
  //       console.log('API Response:', response);
  //       this.toastr.success('Vehicle created successfully!', 'Success');
  //       this.getAllVehicle(); // Ensure this method exists
  //       this.closeModal();
  //     },
  //     error: (err) => {
  //       console.error('API Error:', err);
  //       this.toastr.error('Failed to create vehicle', 'Error');
  //     },
  //   });
  // }
  getAllVehicle() {
    this.masterSrv.getAllVehicle().subscribe({
      next: (res: VehicleResponse) => {
        if (res && res.data.rows) {
          this.totalVehicle.set(res.data.count);
          this.vehicleList.set(res.data.rows);
        } else {
          this.toastr.warning('No Vehicle found', 'Information');
        }
      },
      error: (err) => {
        console.error('Vehicle fetch error:', err);
        this.toastr.error(err.message || 'Failed to fetch users', 'Error');
      },
    });
  }
  // Update Existing Vehicle
  // onUpdate() {

  //   console.log('Vehicle object to update:', this.vehicleObj);

  //   this.masterSrv.updateVehicle(this.vehicleObj).subscribe(
  //     (res: MultivehicleResponse) => {
  //       this.toastr.success('Vehicle Updated Successfully!', 'Success');
  //       this.loadVehicles();
  //     },
  //     (error) => {
  //       this.toastr.error('Error updating vehicle', 'Error');
  //     }
  //   );
  // }
  onUpdate() {
    if (!this.vehicleObj || !this.vehicleObj.vehicle_id) {
      this.toastr.warning('No vehicle selected for update!', 'Warning');
      return;
    }

    // ✅ Update vehicleObj from form values
    this.vehicleObj = {
      ...this.vehicleObj,
      ...this.useForm.value,
    };

    console.log('Updating vehicle:', this.vehicleObj);

    this.masterSrv.updateVehicle(this.vehicleObj).subscribe(
      (res: any) => {
        if (res && res.status === 200) {
          this.toastr.success(
            res.message || 'Vehicle updated successfully',
            'Success'
          );
          this.loadVehicles();
          this.closeModal();
        } else {
          this.toastr.warning('Update failed, check data.', 'Warning');
        }
      },
      (error) => {
        this.toastr.error('Error updating vehicle', 'Error');
      }
    );
  }

  // Delete Vehicle

  // deleteVehicleId() {
  //   if (
  //     this.selectedVehicleForDeletion &&
  //     this.selectedVehicleForDeletion.vehicle_id
  //   ) {
  //     this.masterSrv
  //       .deleteVehicle(this.selectedVehicleForDeletion.vehicle_id)
  //       .subscribe(
  //         (res: VehicleResponse) => {
  //           this.loadVehicles();
  //           this.toastr.success('Vehicle Delete Successfully!', 'Success');
  //         },
  //         (error) => {
  //           alert(error.error.error || 'Failed to delete vehicle');
  //         }
  //       );
  //   } else {
  //     alert('No vehicle selected for deletion');
  //   }
  // }

  selectedVehicleForDeletion: Vehicle | null = null;

  selectVehicleForDeletion(vehicle: Vehicle) {
    this.selectedVehicleForDeletion = vehicle;
  }

  // deleteVehicleId() {
  //   console.log(
  //     'this is the selected vehicle',
  //     this.selectedVehicleForDeletion
  //   );

  //   if (
  //     this.selectedVehicleForDeletion &&
  //     this.selectedVehicleForDeletion.vehicle_id
  //   ) {
  //     this.masterSrv
  //       .deleteVehicle(this.selectedVehicleForDeletion.vehicle_id)
  //       .subscribe(
  //         (res: VehicleResponse) => {
  //           this.toastr.success('Vehicle deleted successfully', 'Success');
  //           this.getAllVehicle();
  //         },
  //         (error) => {
  //           // alert(error.message || 'Failed to delete vehicle');
  //           this.toastr.error('Server Error', 'Error');
  //         }
  //       );
  //   } else {
  //     alert('No vehicle selected for deletion');
  //   }
  // }

  // Edit Single Vehicle
  // onEdit(id: string): void {
  //   console.log('onEdit called with id:', id); // This will confirm the method is being triggered

  //   this.masterSrv.getSingleVehicle(id).subscribe({
  //     next: (vehicle: Vehicles) => {
  //       console.log('single vechilce');
  //       this.openModal(vehicle);
  //     },
  //     error: (err) => {
  //       this.toastr.error(err.error.error, 'Error');
  //     },
  //   });
  // }
  // onEdit(vehicle: Vehicle) {
  //   console.log('onEdit method triggered'); // Should log to confirm the method is triggered

  //   console.log('onEdit called with id:', vehicle.vehicle_id); // Check if the method is triggered

  //   // this.dealerObj = data;
  //   const nameParts =
  //     vehicle.vehicle_name && vehicle.vehicle_name.trim()
  //       ? vehicle.vehicle_name.split(' ')
  //       : [];
  //   console.log('onEdit method triggered'); // This should always log if the method is called

  //   console.log('Chasis number:', vehicle.chasis_number); // Log the chasis_num specifically

  //   this.useForm.patchValue({
  //     vehicle_name: vehicle.vehicle_name,
  //     VIN: vehicle.VIN,
  //     type: vehicle.type,
  //     YOM: this.formatDate(vehicle.YOM),
  //     chasis_number: vehicle.chasis_number,
  //   });
  //   // console.log(this.userObj, 'trueeee----');
  // }
  // onEdit(vehicle: Vehicle) {
  //   console.log('onEdit triggered', vehicle); // Check if it's being called

  //   // const nameParts = customer.account_name && customer.account_name.trim() ? customer.account_name.split(' ') : [];
  //   this.isEditMode = true; // Ensure edit mode is set
  //   console.log('vehicle.vehcile_id before setting:', vehicle?.vehicle_id);
  //   this.vehicleObj = { ...vehicle }; // Spread operator to ensure reference is copied

  //   this.useForm.patchValue({
  //     vehicle_name: vehicle.vehicle_name,
  //     VIN: vehicle.VIN,
  //     type: vehicle.type,
  //     YOM: this.formatDate(vehicle.YOM),
  //     chasis_number: vehicle.chasis_number, // Ensure fallback is safe
  //   });
  //   console.log(
  //     'vehcileobj.account_id after setting:',
  //     this.vehicleObj?.vehicle_id
  //   );
  // }

  // TEAMS KA VEHCILE CODE
  // deleteVehicleId() {
  //   console.log(
  //     'this is the select user',
  //     this.selectVehicleForDeletion,
  //     this.selectedVehicleForDeletion
  //   );
  //   if (
  //     this.selectedVehicleForDeletion &&
  //     this.selectedVehicleForDeletion.vehicle_id
  //   ) {
  //     this.masterSrv
  //       .deleteVehicle(this.selectedVehicleForDeletion.vehicle_id)
  //       .subscribe(
  //         (res: VehicleResponse) => {
  //           this.toastr.success('vehicle deleted successfully', 'Success');
  //           this.getAllVehicle();
  //         },
  //         (error) => {
  //           // alert(error.message || 'Failed to delete users'); comment for server side error not come
  //           this.toastr.error('Server Error', 'Error');
  //         }
  //       );
  //   } else {
  //     alert('No vehicle selected for deletion');
  //   }
  // }
  // deleteVehicleId() {
  //   console.log(
  //     'This is the selected vehicle:',
  //     this.selectVehicleForDeletion,
  //     this.selectedVehicleForDeletion
  //   );

  //   if (
  //     this.selectedVehicleForDeletion &&
  //     this.selectedVehicleForDeletion.vehicle_id
  //   ) {
  //     // ✅ Immediately hide the modal (before API call)
  //     ($('#deleteModal') as any).modal('hide'); // Hide modal using jQuery

  //     // 🔄 Proceed with API call to delete vehicle
  //     this.masterSrv
  //       .deleteVehicle(this.selectedVehicleForDeletion.vehicle_id)
  //       .subscribe(
  //         (res: VehicleResponse) => {
  //           this.toastr.success('Vehicle deleted successfully', 'Success');
  //           this.getAllVehicle(); // Refresh vehicle list
  //         },
  //         (error) => {
  //           this.toastr.error('Server Error', 'Error');
  //         }
  //       );
  //   } else {
  //     alert('No vehicle selected for deletion');
  //   }
  // }
  // deleteVehicleId() {
  //   console.log(
  //     'this is the selected vehicle',
  //     this.selectVehicleForDeletion,
  //     this.selectedVehicleForDeletion
  //   );

  //   if (
  //     this.selectedVehicleForDeletion &&
  //     this.selectedVehicleForDeletion.vehicle_id
  //   ) {
  //     this.masterSrv
  //       .deleteVehicle(this.selectedVehicleForDeletion.vehicle_id)
  //       .subscribe(
  //         (res: VehicleResponse) => {
  //           this.toastr.success('Vehicle deleted successfully', 'Success');
  //           this.getAllVehicle();

  //           // Use jQuery to hide the modal
  //           $('#deleteModal').modal('hide'); // Hide the modal

  //           // Remove the backdrop manually using jQuery
  //           $('.modal-backdrop').remove();

  //           // Optionally, remove modal-open class if needed
  //           $('body').removeClass('modal-open');
  //         },
  //         (error) => {
  //           this.toastr.error('Server Error', 'Error');
  //         }
  //       );
  //   } else {
  //     alert('No vehicle selected for deletion');
  //   }
  // }

  // closeModal() {
  //   // Properly hide modal
  //   $('.bd-example-modal-lg').modal('hide');
  //   $('#deleteModal').modal('hide'); // Add this line if you're using #deleteModal as well

  //   // Ensure body changes are reset
  //   $('body').removeClass('modal-open');
  //   $('body').css('padding-right', '');

  //   // Remove backdrop with slight delay to ensure modal is hidden first
  //   setTimeout(() => {
  //     $('.modal-backdrop').remove();
  //   }, 150);
  // }

  deleteVehicleId() {
    console.log(
      'this is the select user',
      this.selectVehicleForDeletion,
      this.selectedVehicleForDeletion
    );
    console.log(
      'Deleting User ID:',
      this.selectedVehicleForDeletion?.vehicle_id
    );

    if (
      this.selectedVehicleForDeletion &&
      this.selectedVehicleForDeletion.vehicle_id
    ) {
      this.masterSrv
        .deleteVehicle(this.selectedVehicleForDeletion.vehicle_id)
        .subscribe(
          (res: VehicleResponse) => {
            this.toastr.success('Vehicle deleted successfully', 'Success');
            this.getAllVehicle();
          },
          (error) => {
            // alert(error.message || 'Failed to delete users'); comment for server side error not come
            this.toastr.error('Server Error', 'Error');
          }
        );
    } else {
      alert('No Vehicle selected for deletion');
    }
  }

  // Close modal
  closeModal() {
    ($('.bd-example-modal-lg') as any).modal('hide');
  }
  // onEdit(vehicle: Vehicle) {
  //   console.log('Edit button clicked. Team ID:', vehicle?.vehicle_id); // Debug log
  //   this.isEditMode = true; // Ensure edit mode is set

  //   // Set team object to the selected team to preserve data
  //   this.vehicleObj = { ...vehicle };

  //   // Fetch team details by ID (this should be the 'team/id' API call)
  //   this.masterSrv.getVehicleById(vehicle.vehicle_id).subscribe(
  //     (res: SingleVehicleResponse) => {
  //       if (res?.status === 200 && res.data) {
  //         const vehicleDetails = res.data;

  //         this.vehicleObj = { ...vehicleDetails };

  //         this.useForm.patchValue({
  //           vehicle_name: vehicleDetails.vehicle_name,
  //           VIN: vehicleDetails.VIN,
  //           type: vehicleDetails.type,
  //           YOM: this.formatDate(vehicleDetails.YOM),
  //           chasis_number: vehicleDetails.chasis_number,
  //         });

  //         console.log('Vehicle data patched successfully:', vehicleDetails);
  //       } else {
  //         console.warn('No vehicle details found for this ID');
  //       }
  //     },
  //     (err) => {
  //       console.error('Error fetching vehicle details:', err);
  //     }
  //   );
  // }
  // Helper method to format date string for input[type=date]
  formatDateForInput(date: string | null): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return ''; // Handle invalid dates
    return d.toISOString().split('T')[0]; // returns YYYY-MM-DD
  }

  onEdit(vehicle: Vehicle) {
    this.isEditMode = true; // Set the edit mode flag
    console.log('user.userObj before setting:', vehicle?.vehicle_id);

    // Copy user data to userObj
    this.vehicleObj = { ...vehicle }; // Spread operator to avoid reference issues

    // Store the previous name for comparison
    this.previousValue = vehicle.vehicle_name;

    // Initialize the form with current user data
    this.useForm.patchValue({
      vehicle_name: vehicle.vehicle_name,
      VIN: vehicle.VIN,
      type: vehicle.type,
      YOM: this.formatDate(vehicle.YOM),
      chasis_number: vehicle.chasis_number,
      demo_start_date: vehicle.demo_start_date,
      demo_end_date: vehicle.demo_end_date,
      // end_date: vehicle.end_date
      //   ? this.formatDateForInput(vehicle.end_date)
      //   : '',
    });

    console.log(
      'vehicleobj.vehicle_id after setting:',
      this.vehicleObj?.vehicle_id
    );
  }
  isVehicleNameChanged(): boolean {
    return this.useForm.value.name !== this.previousValue;
  }

  // Utility Methods
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Date Formatting Utility
  private formatDate(date: string | null | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  // Validation Helpers
  isFieldInvalid(controlName: string): boolean {
    const control = this.useForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isVehicleName(): boolean {
    return this.useForm.value.vehicle_name !== this.previousValue;
  }
}
