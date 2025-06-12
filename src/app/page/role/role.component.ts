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
  searchTerm: string = '';
  roles: Role[] = []; // All roles
  filteredRoles: Role[] = []; // Filtered list after search
  paginatedRoles: Role[] = []; // Current page data
  // searchTerm: string = ''; // Bound to input
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
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
    this.filteredRoles = this.roleList(); // make sure userList() returns an array
    this.paginateRoles();
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
    console.log('Opening modal...'); // Is this printing in console?
    this.useForm.reset({
      role_name: '',
      description: '',
    });

    ($('.bd-example-modal-lg') as any).modal('show');
  }

  private loadRole(): void {
    this.masterSrv.getAllRole().subscribe({
      next: (res: roleResponse) => {
        this.roleList.set(res.data);
        this.count.set(res.data.length);

        // ✅ Once data is set, update filtered list and pagination
        this.filteredRoles = this.roleList(); // or res.data directly
        this.paginateRoles();
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
  onSearchChange() {
    this.filterRoles();
    this.currentPage = 1;
    this.paginateRoles();
  }

  filterRoles() {
    if (!this.searchTerm) {
      this.filteredRoles = this.roleList();
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredRoles = this.roleList().filter((role) => {
        return (
          role.role_name?.toLowerCase().includes(term) ||
          role.description?.toLowerCase().includes(term)
        );
      });
    }
    this.currentPage = 1;
    this.paginateRoles();
  }
  paginateRoles() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRoles = this.filteredRoles.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredRoles.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onItemsPerPageChange(event: any) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.paginateRoles();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateRoles();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateRoles();
    }
  }

  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.paginateRoles();
    }
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
