import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Role } from '../../model/class/role';
import { roleResponse } from '../../model/interface/master';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  private http = inject(HttpClient);
  useForm: FormGroup = new FormGroup({});
  roleList = signal<Role[]>([]);
  count = signal<number>(0);
  totalRoles = signal<number>(0);

  // service
  private masterSrv = inject(MasterService);
  private readonly toastr = inject(ToastrService);

  constructor() {
    console.log('Constructor called');
    this.initializeForm();
  }

  staticDealerList = [
    { dealer_code: 'Admin' },
    { dealer_code: 'SM' },
    { dealer_code: 'PS' },
    { dealer_code: 'GM' },
    { dealer_code: 'DP' },
  ];

  ngOnInit(): void {
    console.log('ngOnInit triggered');
    this.loadRole();
  }

  private initializeForm(): void {
    console.log('Initializing form...');
    this.useForm = new FormGroup({
      role_name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  closeModal() {
    console.log('Closing modal...');
    ($('.bd-example-modal-lg') as any).modal('hide');
  }

  openModals() {
    console.log('Opening modal...');

    // Clear the form
    this.useForm.reset({
      role_name: '',
      description: '',
    });

    // Show modal using jQuery (now that Bootstrap isn't auto-opening it)
    ($('.bd-example-modal-lg') as any).modal('show');
  }

  private loadRole(): void {
    this.masterSrv.getAllRole().subscribe({
      next: (res: roleResponse) => {
        // Set the list directly from res.data (which is an array)
        this.roleList.set(res.data);

        // Set count as length of the array
        this.count.set(res.data.length);
      },
      error: (err) => {
        this.toastr.error('Failed to load role', 'Error');
        console.error('role load error:', err);
      },
    });
  }

  onSave() {
    console.log('Save button clicked');
    if (this.useForm.invalid) {
      console.warn('Form is invalid:', this.useForm.value);
      this.useForm.markAllAsTouched();
      return;
    }

    console.log('Form is valid. Submitting:', this.useForm.value);

    this.masterSrv.createRole(this.useForm.value).subscribe({
      next: () => {
        console.log('Role created successfully');
        this.loadRole();
        this.toastr.success('Role created successfully!', 'Success');
        this.useForm.reset();
        this.closeModal();
      },
      error: (err) => {
        console.error('Create role error:', err);
        const backendError =
          err.error?.error || err.error?.message || 'Failed to create role.';
        this.toastr.error(backendError, 'Error');
      },
    });
  }

  // getAllRoles() {
  //   console.log('Calling getAllRoles() API...');
  //   this.masterSrv.getAllRoles().subscribe({
  //     next: (res: any) => {
  //       console.log('getAllRoles response:', res);
  //       if (res && res.data && res.data.rows) {
  //         this.totalRoles.set(res.data.count);
  //         this.roleList.set(res.data.rows);
  //       } else {
  //         console.warn('No roles found in response');
  //         this.toastr.warning('No roles found', 'Information');
  //       }
  //     },
  //     error: (err) => {
  //       console.error('getAllRoles error:', err);
  //       this.toastr.error(err.message || 'Failed to fetch roles', 'Error');
  //     },
  //   });
  // }
}
