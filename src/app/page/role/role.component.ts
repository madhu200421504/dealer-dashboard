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
import { ChangeDetectorRef } from '@angular/core';

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
  isModalOpen = false;

  roleObj: Role = new Role();
  previousValue: string = '';
  isEditMode: boolean = false;

  // Add loading state to prevent multiple submissions
  isSubmitting = false;

  roleListAll = [];
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

  constructor(private cdr: ChangeDetectorRef) {
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
      description: new FormControl(''),
    });
  }

  openModal(role?: Role) {
    this.useForm.reset();
    this.isModalOpen = true;
    this.isSubmitting = false; // Reset submitting state
    document.body.classList.add('modal-open');

    this.isEditMode = !!role;

    if (role) {
      this.useForm.patchValue({
        role_name: role.role_name || '',
        description: role.description || '',
      });
      this.roleObj = { ...role };
    } else {
      this.roleObj = new Role(); // Use new instance instead of empty object
    }
  }

  onSaveAndClose() {
    if (this.useForm.valid) {
      this.onSave();
      // Don't call closeModal here - let onSave handle it
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
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
    if (this.useForm.invalid) {
      this.useForm.markAllAsTouched(); // ✅ This ensures validation errors are shown
      this.toastr.warning(
        'Please fill all required fields correctly',
        'Validation'
      );
      return;
    }
    if (this.isSubmitting) return;

    this.markFormGroupTouched(this.useForm);
    console.log('Save button clicked');

    if (this.useForm.invalid) {
      console.warn('Form is invalid:', this.useForm.value);
      this.useForm.markAllAsTouched();
      return;
    }

    console.log('Form is valid. Submitting:', this.useForm.value);
    this.isSubmitting = true;

    this.masterSrv.createRole(this.useForm.value).subscribe({
      next: (response) => {
        console.log('Role created successfully', response);
        this.toastr.success('Role created successfully!', 'Success');
        this.loadRole();
        console.log('closing from next');
        this.closeModal();
      },
      error: (err) => {
        console.error('Create role error:', err);
        this.isSubmitting = false;

        const backendError =
          err.error?.error || err.error?.message || 'Failed to create role.';
        this.toastr.error(backendError, 'Error');

        this.closeModal(); // ✅ Add here
        console.log('closing from error');
      },
      complete: () => {
        this.isSubmitting = false;
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
    const allRoles = this.roleList();

    this.filteredRoles = allRoles.filter(
      (role) =>
        role.role_name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        role.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalPages = Math.ceil(this.filteredRoles.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    this.paginateRoles();
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.classList.remove('modal-open');
    console.log('Modal closed'); // <== Add this
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

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRoles.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginatedRoles = this.filteredRoles.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  isRoleNameChanged(): boolean {
    return this.useForm.value.role_name !== this.previousValue; // Fixed: was checking 'name' instead of 'role_name'
  }
}
