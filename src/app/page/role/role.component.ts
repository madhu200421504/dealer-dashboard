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

  // service
  private masterSrv = inject(MasterService);
  private readonly toastr = inject(ToastrService);

  constructor() {
    this.initializeForm();
  }

  staticDealerList = [
    { dealer_code: 'Admin' },
    { dealer_code: 'SalesManager' },
    { dealer_code: 'Salesperson' },
    { dealer_code: 'GM' },
  ];

  ngOnInit(): void {
    this.loadRole();
  }

  private initializeForm(): void {
    this.useForm = new FormGroup({
      role_name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }
  // Example for setting the role list dynamically

  closeModal() {
    ($('.bd-example-modal-lg') as any).modal('hide');
  }

  // openModals() {
  //   ($('.bd-example-modal-sm') as any).
  //   ('show');
  // }
  openModals() {
    ($('.bd-example-modal-sm') as any).modal('show');
  }

  loadRole() {
    this.masterSrv.getAllRole().subscribe({
      next: (res: roleResponse) => {
        // 🔍 Filter out duplicate role names
        const uniqueRoles: Role[] = [];
        const seen = new Set<string>();

        for (const role of res.data.rows) {
          const name = role.role_name.trim().toLowerCase(); // normalize name
          if (!seen.has(name)) {
            seen.add(name);
            uniqueRoles.push(role);
          }
        }

        // ✅ Update the count and signal with unique roles
        this.count.set(uniqueRoles.length);
        this.roleList.set(uniqueRoles);
      },
      error: (err) => {
        this.toastr.error(err.error.error, 'Error');
      },
    });
  }

  onSave() {
    if (this.useForm.invalid) {
      this.useForm.markAllAsTouched(); // show validation errors if any
      return;
    }

    this.masterSrv.createRole(this.useForm.value).subscribe({
      next: () => {
        this.loadRole(); // refresh the role list
        this.toastr.success('Role created successfully!', 'Success');
        this.useForm.reset(); // clear the form
        this.closeModal(); // close the modal (make sure this method works)
      },
      error: (err) => {
        this.toastr.error(err.error.error || 'Failed to create role.', 'Error');
      },
    });
  }
}
