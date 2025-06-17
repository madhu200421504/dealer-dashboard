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
  // roles = []; // Assuming roles are fetched from an API or database
  // filteredRoles = []; // Holds the filtered roles for search
  // paginatedRoles = []; // Holds roles to display in the current page
  // currentPage: number = 1;
  // itemsPerPage: number = 5;
  // totalPages: number = 1;
  // searchTerm: string = '';
  // roles: Role[] = []; // All roles
  // filteredRoles: Role[] = []; // Filtered list after search
  // paginatedRoles: Role[] = []; // Current page data
  // searchTerm: string = ''; // Bound to input
  // currentPage: number = 1;
  // itemsPerPage: number = 5;
  // totalPages: number = 1;
  // pages: number[] = [];
  roleObj: Role = new Role();
  previousValue: string = '';
  isEditMode: boolean = false;

  roleListAll = []; // Full list from backend
  // filteredRoles = [];
  // paginatedRoles = [];
  searchTerm = '';
  itemsPerPage = 10;
  currentPage = 1;
  pages: number[] = [];
  totalPages = 1;

  filteredRoles: any[] = [];
  paginatedRoles: any[] = [];
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

  openModals(role?: Role) {
    console.log('✅ openModals() function called for Role');
    console.log('Role object received in openModals:', role);

    if (!role) {
      this.roleObj = {} as Role;
    }

    this.useForm.reset();
    this.isEditMode = !!role;

    if (role) {
      this.useForm.patchValue({
        role_id: role.role_id || '',
        role_name: role.role_name || '',
        description: role.description || '',
      });
      console.log('Role information:', role);
      this.roleObj = { ...role };
    } else {
      this.roleObj = {} as Role;
    }

    // ✅ Corrected: backdrop should be boolean false, not string 'false'
    ($('.bd-example-modal-lg') as any)
      .modal({
        backdrop: false, // ✅ no quotes
        keyboard: false,
      })
      .modal('show');
  }

  private loadRole(): void {
    this.masterSrv.getAllRole().subscribe({
      next: (res: roleResponse) => {
        this.roleList.set(res.data);
        this.count.set(res.data.length);

        // Apply filter & pagination on load
        this.filteredRoles = res.data;
        this.applyFilterAndPagination();
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
  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilterAndPagination();
  }
  onItemsPerPageChange(event: any): void {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.applyFilterAndPagination();
  }

  applyFilterAndPagination(): void {
    const allRoles = this.roleList(); // your BehaviorSubject accessor

    this.filteredRoles = allRoles.filter(
      (role) =>
        role.role_name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        role.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalPages = Math.ceil(this.filteredRoles.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    this.paginateRoles();
  }
  paginateRoles(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedRoles = this.filteredRoles.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginateRoles();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateRoles();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateRoles();
    }
  }
  getShowingTo(): number {
    return Math.min(
      this.currentPage * this.itemsPerPage,
      this.filteredRoles.length
    );
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }

  // onItemsPerPageChange(event: Event): void {
  //   const target = event.target as HTMLSelectElement;
  //   this.itemsPerPage = parseInt(target.value, 10);
  //   this.currentPage = 1;
  //   this.updatePagination();
  // }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRoles.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginatedRoles = this.filteredRoles.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }
  isRoleNameChanged(): boolean {
    return this.useForm.value.name !== this.previousValue;
  }
  // goToPage(page: number): void {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.currentPage = page;
  //     this.updatePagination();
  //   }
  // }

  // previousPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.updatePagination();
  //   }
  // }

  // nextPage(): void {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.updatePagination();
  //   }
  // }

  // count(): number {
  //   return this.roles.length;
  // }

  // min(a: number, b: number): number {
  //   return Math.min(a, b);
  // }

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
