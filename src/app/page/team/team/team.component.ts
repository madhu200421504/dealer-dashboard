import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Teams } from '../../../model/class/team';
// import { MasterService } from '../../service/master.service';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../../../service/master.service';
import { CommonModule } from '@angular/common';
import {
  MultiuserResponse,
  SingleTeamResponse,
  TeamsResponse,
} from '../../../model/interface/master';
// import { AleartSrvService } from '../../service/aleart-srv.service';
import { Teamss } from '../../../model/class/teamss';

import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AleartSrvService } from '../../../service/aleart-srv.service';
import { UserList } from '../../../model/class/multiuser';
@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'], // Fixed syntax error
})
export class TeamComponent {
  // Signals for reactive state management

  totalUser = signal<number>(0);
  teamList = signal<Teams[]>([]);
  totalteam = signal<number>(0);
  userList = signal<UserList[]>([]);
  teamObj: Teams = new Teams();
  count = signal<number>(0);
  userObj: Teams = new Teams();
  previousValue: string = '';
  totalPages: number = 0;
  // paginatedTeams: any[] = []; // your current paginated users (already existing)

  // Dependency injection
  masterSrv = inject(MasterService);
  private readonly toastr = inject(ToastrService);

  // Form and user management properties
  useForm: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  previousEmail: string = '';
  // count: number;
  // teamObj: any = {}; // For editing
  // userObj: any = {}; // Used for modal title condition
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedTeams: any[] = []; // your current paginated users (already existing)
  allUsers: any[] = []; // Complete list
  pages: number[] = [];
  filteredTeams: Teams[] = []; // Filtered list after search

  constructor(
    private aleartsrv: AleartSrvService,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    // this.displayAllUser();
    // this.getAllDealer();
    this.getAllTeams();
    this.displayAllTeams();
    this.filteredTeams = this.teamList(); // make sure userList() returns an array
    this.paginateTeams();
  }
  initializeForm() {
    this.useForm = new FormGroup({
      // post data bind karna le liye and used for validation of form.

      // user_id: new FormControl(''),
      team_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      // team_lead_id: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(2),
      //   Validators.maxLength(50),
      // ]),
      // team_lead_email: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(2),
      //   Validators.maxLength(50),
      // ]),

      // role: new FormControl('', [Validators.required]),
    });
  }

  // openModal(team?: Teams) {
  //   // Reset the form
  //   this.useForm.reset();
  //   this.isEditMode = !!team;

  //   if (team) {
  //     // Populate form fields for editing
  //     this.useForm.patchValue({
  //       // user_id: user.user_id,
  //       // name: user.name || '',
  //       // account_id: user.account_id || '',
  //       // email: user.email || '',
  //       // phone: user.phone || '',
  //       // user_role: user.user_role || '',
  //       // dealer_code: user.dealer_code || '',
  //       // dealer_id: user.dealer_id || null,
  //       // team_id: user.team?.team_id || null,
  //       // team_name: user.team?.team_name || null,
  //       team_name: team.team_name,
  //       team_lead_email: team.team_lead_email,

  //       team_lead_id: team.team_lead_id,
  //     });

  //     // Store previous email for validation
  //     this.previousEmail = team.team_lead_email || '';

  //     // Debugging logs
  //     // console.log('User team info:', user.team);
  //     console.log('Form team values:', {
  //       team_lead_id: this.useForm.get('team_lead_id')?.value,
  //       team_name: this.useForm.get('team_name')?.value,
  //     });
  //   }
  // }

  // onEdit(id: string) {
  //     this.masterSrv.updateSingleTeam(id).subscribe({
  //       next: (res: Teams) => {
  //         this.userObj = res;
  //         this.openModal(res);
  //       },
  //       error: (err) => {
  //         console.error('User fetch error:', err);
  //         this.toastr.error('Failed to fetch user details', 'Error');
  //       },
  //     });
  //   }
  openModal(team?: Teams) {
    console.log('✅ openModal() function called');

    // Reset form and set edit mode
    this.useForm.reset();
    this.isEditMode = !!team; // ✅ Set edit mode flag

    if (team) {
      // ✅ Editing an existing vehicle
      this.teamObj = { ...team };

      this.useForm.patchValue({
        team_name: team.team_name,
        team_lead_email: team.team_lead_email,

        team_lead_id: team.team_lead_id,
      });
      console.log('fhgir');
      console.log('🔹 Edit Mode: team Object ->', this.teamObj);
      console.log('🔹 teamobj.team_id ->', this.teamObj.team_id);
    } else {
      // ✅ Creating a new vehicle
      this.teamObj = new Teams();
      (this.teamObj as any).team_id = undefined; // ❗ Use type assertion

      console.log('🆕 New Vehicle Mode: Reset vehicleObj', this.teamObj);
    }
  }
  // onEdit(team: Teams) {
  //   // const nameParts = customer.account_name && customer.account_name.trim() ? customer.account_name.split(' ') : [];
  //   this.isEditMode = true; // Ensure edit mode is set
  //   console.log('team.team_id before setting:', team?.team_id);
  //   this.teamObj = { ...team }; // Spread operator to ensure reference is copied

  //   this.useForm.patchValue({
  //     team_name: team.team_name,
  //     team_lead_email: team.team_lead_email,

  //     team_lead_id: team.team_lead_id,
  //   });
  //   console.log('teamobj.team_id after setting:', this.teamObj?.team_id);
  // }

  onEdit(team: Teams) {
    console.log('Edit button clicked. Team ID:', team?.team_id); // Debug log
    this.isEditMode = true; // Ensure edit mode is set

    // Set team object to the selected team to preserve data
    this.teamObj = { ...team };

    // Fetch team details by ID (this should be the 'team/id' API call)
    this.masterSrv.getTeamById(team.team_id).subscribe(
      (res: SingleTeamResponse) => {
        if (res?.status === 200) {
          const team = res.data?.TeamDetails;

          if (team) {
            console.log('Team Details:', team); // Debug log

            // Patch the form with the team data
            this.useForm.patchValue({
              team_name: team.team_name,
              team_lead_email: team.team_lead_email,
              team_lead_id: team.team_lead_id,
            });

            console.log('Form data patched, opening modal...');
            // Open the modal for editing
            setTimeout(() => {
              ($(`#exampleModalCenter`) as any).modal('show');
            }, 0);
          } else {
            console.error('No team details found');
            this.toastr.error('Team details not found', 'Error');
          }
        }
      },
      (error) => {
        console.error('Error fetching team details:', error);
        this.toastr.error('Error fetching team details', 'Error');
      }
    );
  }

  isTeamNameChanged(): boolean {
    return this.useForm.value.name !== this.previousValue;
  }

  selectedteamForDeletion: Teams | null = null;

  selectteamForDeletion(user: Teams) {
    this.selectedteamForDeletion = user;
  }
  //  deleteUserId() {
  //     console.log(
  //       'this is the select user',
  //       this.selectteamForDeletion,
  //       this.selectedteamForDeletion
  //     );
  //     if (this.selectedteamForDeletion && this.selectedteamForDeletion.team_id) {
  //       this.masterSrv.deleteUser(this.selectedteamForDeletion.team_id).subscribe(
  //         (res: TeamsResponse ) => {
  //           this.toastr.success('User deleted successfully', 'Success');
  //           this.displayAllteams();
  //         },
  //         (error) => {
  //           // alert(error.message || 'Failed to delete users'); comment for server side error not come
  //           this.toastr.error('Server Error', 'Error');
  //         }
  //       );
  //     } else {
  //       alert('No users selected for deletion');
  //     }
  //   }
  //  displayAllteams() {
  //     this.masterSrv.getMultipleUser().subscribe({
  //       next: (res: TeamsResponse) => {
  //         if (res && res.data.rows) {
  //           this.totalUser.set(res.data.totalteams);
  //           this.teamList.set(res.data.rows);
  //         } else {
  //           this.toastr.warning('No users found', 'Information');
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Users fetch error:', err);
  //         this.toastr.error(err.message || 'Failed to fetch users', 'Error');
  //       },
  //     });
  //   }

  onTeamChange() {
    console.log('onTeamChange() function called');

    const teamNameControl = this.useForm.get('team_name');
    const teamEmailControl = this.useForm.get('team_lead_email');

    const teamIdControl = this.useForm.get('team_id');

    if (teamNameControl && teamIdControl && teamNameControl.value) {
      console.log('Team name value:', teamNameControl.value);
      console.log('Available teams:', this.teamList());

      const selectedTeam = this.teamList().find(
        (team) => team.team_name === teamNameControl.value
      );

      if (selectedTeam) {
        console.log('Selected Team:', selectedTeam);
        teamIdControl.setValue(selectedTeam.team_id);
        teamEmailControl?.setValue(selectedTeam.team_lead_email);
      } else {
        console.warn('Team not found:', teamNameControl.value);
      }
    }
  }
  //  displayAllTeams() {
  //     console.log('getAllTeams() function called'); // Debugging Log

  //   this.masterSrv.getAllTeams().subscribe({

  //     next: (res: TeamsResponse) => {
  //               console.log('API Response:', res); // Log API response

  //       if (res && res.data.rows && res.data.rows) {
  //         this.teamList.set(res.data.rows); // Set the dealer list from response
  //         console.log('Fetched teams:', this.teamList()); // Log the dealer list
  //         this.totalteam.set(res.data.count); // Set the total dealer count
  //       } else {
  //         this.toastr.warning('No teams found', 'Information');
  //       }
  //     }
  //   })
  //     error: (err) => {
  //       console.error('teams fetch error:', err);
  //       this.toastr.error(err.message || 'Failed to fetch teams', 'Error');
  //     },
  //   });
  // }
  // onEdit(id: string) {
  //    this.masterSrv.getSingleUser(id).subscribe({
  //      next: (res: Teams) => {
  //        this.userObj = res;
  //        this.openModal(res);
  //      },
  //      error: (err) => {
  //        console.error('User fetch error:', err);
  //        this.toastr.error('Failed to fetch user details', 'Error');
  //      },
  //    });
  //  }
  getAllTeams() {
    this.masterSrv.getMultipleUser().subscribe({
      next: (res: MultiuserResponse) => {
        if (res && res.data.rows) {
          this.allUsers = res.data.rows;
        } else {
          this.toastr.warning('No teams found', 'Information');
        }
      },
      error: (err) => {
        console.error('teams fetch error:', err);
        this.toastr.error(err.message || 'Failed to fetch users', 'Error');
      },
    });
  }
  paginateTeams() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTeams = this.filteredTeams.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredTeams.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSearchChange(): void {
    const term = this.searchTerm?.toLowerCase() || '';
    this.filteredTeams = this.teamList().filter(
      (team) => team.team_name?.toLowerCase().includes(term)
      // Add more fields if needed
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  onItemsPerPageChange(event: any): void {
    this.itemsPerPage = +event.target.value;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const filtered = this.filteredTeams; // ✅ correct
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTeams = filtered.slice(start, end);
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // filteredTeams(): any[] {
  //   if (!this.searchTerm) return [...this.allUsers];
  //   const lowerTerm = this.searchTerm.toLowerCase();
  //   return this.allUsers.filter(
  //     (user) =>
  //       user.name?.toLowerCase().includes(lowerTerm) ||
  //       user.email?.toLowerCase().includes(lowerTerm) ||
  //       user.user_role?.toLowerCase().includes(lowerTerm)
  //   );
  // }

  // totalUser(): number {
  //   return this.filteredUsers().length;
  // }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  min(a: number, b: number): number {
    return Math.min(a, b);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  // openModal(): void {
  //   this.useForm.reset();
  //   this.teamObj = {};
  //   this.userObj = {};
  // }

  // closeModal(): void {
  //   this.useForm.reset();
  //   this.teamObj = {};
  // }

  deleteTeamid() {
    console.log(
      'this is the select user',
      this.selectteamForDeletion,
      this.selectedteamForDeletion
    );
    if (this.selectedteamForDeletion && this.selectedteamForDeletion.team_id) {
      this.masterSrv.deleteTeam(this.selectedteamForDeletion.team_id).subscribe(
        (res: TeamsResponse) => {
          this.toastr.success('Team deleted successfully', 'Success');
          this.displayAllTeams();
        },
        (error) => {
          // alert(error.message || 'Failed to delete users'); comment for server side error not come
          this.toastr.error('Server Error', 'Error');
        }
      );
    } else {
      alert('No Team selected for deletion');
    }
  }

  displayAllTeams() {
    console.log('Fetching all teams...');
    this.masterSrv.getMultipleTeams().subscribe({
      next: (res: TeamsResponse) => {
        if (res && res.data.rows) {
          this.teamList.set(res.data.rows);
          this.filteredTeams = res.data.rows;

          // ✅ Set totalteam count here
          this.totalteam.set(res.data.rows.length);

          this.updatePagination();
        } else {
          this.toastr.warning('No team found', 'Information');
          this.totalteam.set(0); // optional: reset count to 0
        }
      },
      error: (err) => {
        console.error('team fetch error:', err);
        this.toastr.error(err.message || 'Failed to fetch team', 'Error');
        this.totalteam.set(0); // optional: reset count to 0 on error
      },
    });
  }

  // onUpdate() {
  //   if (this.useForm.invalid) {
  //     this.markFormGroupTouched(this.useForm);
  //     this.toastr.warning(
  //       'Please fill all required fields correctly',
  //       'Validation'
  //     );
  //     return;
  //   }

  //   this.masterSrv.updateUser(this.useForm.value).subscribe({
  //     next: () => {
  //       this.toastr.success('User updated successfully!', 'Success');
  //       this.displayAllTeams();
  //       this.closeModal();
  //     },
  //     error: (err) => {
  //       console.error('User update error:', err);
  //       this.toastr.error('Update the E-mail and AccountId', 'Update Error');
  //     },
  //   });
  // }
  // onUpdate() {
  //   console.log('🔍 Debug: team_id before update ->', this.teamObj.team_id); // ✅ Log before API call

  //   if (!this.teamObj || !this.teamObj.team_id) {
  //     this.toastr.warning('No team selected for update!', 'Warning');
  //     console.error('Update failed: Missing team ID', this.teamObj);
  //     return;
  //   }

  //   console.log('Updating team:', this.teamObj); // ✅ Log before update

  //   this.masterSrv.updateTeam(this.teamObj).subscribe(
  //     (res: any) => {
  //       console.log('API Response:', res); // ✅ Log API response

  //       if (res && res.status === 200) {
  //         this.toastr.success(
  //           res.message || 'vehicle updated successfully',
  //           'Success'
  //         );

  //         // ✅ Manually reload customers after update
  //         this.loadTeams();

  //         // ✅ Close the modal after updating
  //         this.closeModal();
  //       } else {
  //         this.toastr.warning('Update failed, check data.', 'Warning');
  //       }
  //     },
  //     (error) => {
  //       this.toastr.error('Error updating customer', 'Error');
  //       console.error('Update error:', error);
  //     }
  //   );
  // }

  onUpdate() {
    if (this.useForm.valid) {
      this.teamObj = { ...this.teamObj, ...this.useForm.value }; // Update the team object with the form values

      console.log('🚀 Updated Payload before API call:', this.teamObj);

      // Call the updateTeam API with the updated team object
      this.masterSrv.updateTeam(this.teamObj).subscribe(
        (res: any) => {
          if (res.status === 200) {
            console.log('✅ Update Success:', res);

            this.toastr.success(res.message, 'Success');
            this.displayAllTeams(); // Fetch and display all teams again after update
            this.closeModal(); // Close the modal

            // Update the UI immediately
            this.userList.set(
              this.userList().map((user) =>
                user.team_id === this.teamObj.team_id
                  ? { ...user, ...this.teamObj }
                  : user
              )
            );

            setTimeout(() => {
              this.cdr.detectChanges(); // Force UI update
              this.cdr.markForCheck(); // Mark for change detection if using OnPush
            }, 0);
          } else {
            this.toastr.error('Update failed', 'Error');
          }
        },
        (error) => {
          console.error('❌ API Error:', error);
          this.toastr.error('Failed to update team', 'Error');
        }
      );
    } else {
      this.toastr.error('Invalid form data. Please check inputs.', 'Error');
    }
  }

  closeModal() {
    ($('.bd-example-modal-lg') as any).modal('hide');
  }

  // Utility method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Check if email has changed (for update validation)
  isEmailChange(): boolean {
    return this.useForm.get('email')?.value !== this.previousEmail;
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

  //   const formData = this.useForm.value;
  //   console.log('Form Data being sent to API:', formData);

  //   this.masterSrv.createNewTeam(formData).subscribe({
  //     next: () => {
  //       this.toastr.success('team created successfully!', 'Success');
  //       this.displayAllTeams();
  //       this.closeModal();
  //     },
  //     error: (err) => {
  //       console.error('team creation error:', err);
  //       this.toastr.error(
  //         err.message || 'Failed to create user',
  //         'Creation Error'
  //       );
  //     },
  //   });
  // }
  onSave() {
    if (this.useForm.invalid) {
      this.useForm.markAllAsTouched();
      this.toastr.warning(
        'Please fill all required fields correctly',
        'Validation'
      );
      return;
    }
    console.log('📦 Payload Before API Call:', this.useForm.value);

    const formData = this.useForm.value;
    console.log('Form Data being sent to API:', formData);
    this.masterSrv.createNewTeam(formData).subscribe({
      next: (response) => {
        this.toastr.success('Team created successfully!', 'Success');
        // Use displayAllTeams() instead of getAllTeams() to update the table immediately
        this.displayAllTeams();
        this.closeModal();

        // Force change detection to ensure UI updates
        setTimeout(() => {
          this.cdr.detectChanges();
          this.cdr.markForCheck();
        }, 0);
      },
      error: (err) => {
        console.error('Team creation error:', err);
        this.toastr.error(
          err.message || 'Failed to create team',
          'Creation Error'
        );
      },
    });
  }
  private loadTeams(): void {
    this.masterSrv.getAllTeams().subscribe({
      next: (res: TeamsResponse) => {
        // this.count.set(res.data.count);
        this.count.set(res.data.count);

        this.teamList.set(res.data.rows);
      },
      error: (err) => {
        this.toastr.error('Failed to load vehicles', 'Error');
        console.error('Vehicle load error:', err);
      },
    });
  }
}
