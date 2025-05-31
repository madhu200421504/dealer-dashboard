import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DealerResponse,
  MultiuserResponse,
  roleResponse,
  TeamsResponse,
  UserResponse,
} from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { UserList } from '../../model/class/multiuser';
import { ToastrService } from 'ngx-toastr';
import { AleartSrvService } from '../../service/aleart-srv.service';
import { TooltipModule } from 'primeng/tooltip';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { Accounts } from '../../model/class/customer';
import { Users } from '../../model/class/users';
import { dealers } from '../../model/class/dealers';
import { Teams } from '../../model/class/team'; // ✅ Import the correct interface
import { Role } from '../../model/class/role';
import { error } from 'node:console';
import { HttpHeaders } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

declare var $: any;

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TooltipModule,
    FloatLabelModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgxDatatableModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  // Signals for reactive state management
  totalUser = signal<number>(0);
  userList = signal<UserList[]>([]);
  dealerList = signal<dealers[]>([]);
  totalDealer = signal<number>(0);
  // teamData: Team[] = [];
  teamList = signal<Teams[]>([]);
  totalteam = signal<number>(0);
  dealerObj: dealers = new dealers();
  roleList = signal<Role[]>([]);

  // Service injections
  masterSrv = inject(MasterService);
  private readonly toastr = inject(ToastrService);

  // Form and user management properties
  useForm: FormGroup = new FormGroup({});
  userObj: UserList = new UserList();
  previousEmail: string = '';
  isEditMode: boolean = false;
  count: any;
  Role: any;
  totalrole: any;
  previousValue: any;
  user_id: string = ''; // Ensure this is properly initialized with the user ID
  dataTable: any;

  columns: any[] = [];
  constructor(
    private aleartsrv: AleartSrvService,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    // Call your existing functions
    this.displayAllUser();
    // this.getAllDealer();
    this.getAllTeams();
    this.loadRole();

    // Add this to subscribe to the role_id field's value changes
    this.useForm.get('role_id')?.valueChanges.subscribe((roleId) => {
      if (roleId) {
        // Access the value of the WritableSignal
        const roles = this.roleList(); // Call it like a function to get the array

        // Find the selected role from the roleList
        const selectedRole = roles.find((role) => role.role_id === roleId);

        if (selectedRole) {
          // Log both role_id and role_name to the console
          console.log('Role ID:', roleId);
          console.log('Role Name:', selectedRole.role_name);

          // Optionally, update the user_role field in the form
          this.useForm.patchValue({
            user_role: selectedRole.role_name,
          });
        }
      }
    });
  }

  // Initialize form with comprehensive validators
  initializeForm() {
    this.useForm = new FormGroup({
      // user_id: new FormControl(''),
      fname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      lname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      // role: new FormControl('', [Validators.required]),
      // user_role: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),

      phone: new FormControl(Number, [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
        Validators.maxLength(10),
      ]),
      // team_name: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern(/^\d{10}$/),
      //   Validators.maxLength(10),
      // ]),
      // role_id: new FormControl(null, [Validators.required]),

      // dealer_id: new FormControl(null, [Validators.required]),
      // team_id: new FormControl(null, [Validators.required]),
      // team_id: new FormControl(null, [Validators.required]),
      // dealer_id: new FormControl(null),
      // team_name: new FormControl(null, [Validators.required]),
      user_role: new FormControl(null, [Validators.required]),
      role_id: new FormControl(null, [Validators.required]),
    });
  }

  // number validation

  restrictToNumbers(event: KeyboardEvent): void {
    const keyCode = event.key;
    if (!/^\d$/.test(keyCode)) {
      event.preventDefault(); // Prevents the keypress if it's not a number
    }
  }
  // nameList = [
  //   { user_code: 'Admin' },
  //   { user_code: 'User' },
  //   { user_code: 'Manager' },
  //   { user_code: 'Developer' }
  // ];
  // staticDealerList2 = [
  //   { dealer_code: 'D001' },
  //   { dealer_code: 'D002' },
  //   { dealer_code: 'D003' },
  //   { dealer_code: 'D004' }
  // ];

  // staticDealerList = [
  //   { dealer_code: 'Adminnnnnn' },
  //   { dealer_code: 'SalesManager' },
  //   { dealer_code: 'Salesperson' },
  //   { dealer_code: 'GM' },
  // ];
  // roleList = [
  //   { dealer_code: 'Adminnnnnllllln' },
  //   { dealer_code: 'SalesManager' },
  //   { dealer_code: 'Salesperson' },
  //   { dealer_code: 'GM' },
  // ];
  staticDealerList = [
    { dealer_code: 15255 },
    { dealer_code: 56424 },
    { dealer_code: 45252 },
    { dealer_code: 541248 },
  ];

  // Fetch all dealers
  // Fetch all dealers

  // getAllDealer() {
  //   this.masterSrv.getAllDealer().subscribe({
  //     next: (res: DealerResponse) => {
  //       if (res && res.data.dealer && res.data.dealer.rows) {
  //         this.dealerList.set(res.data.dealer.rows); // Set the dealer list from response
  //         console.log('Fetched dealers:', this.dealerList()); // Log the dealer list
  //         this.totalDealer.set(res.data.dealer.count); // Set the total dealer count
  //       } else {
  //         this.toastr.warning('No dealers found', 'Information');
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Dealer fetch error:', err);
  //       this.toastr.error(err.message || 'Failed to fetch dealers', 'Error');
  //     },
  //   });
  // }

  // getAllTeams() {
  //   this.masterSrv.getAllTeams().subscribe({
  //     next: (res: TeamsResponse) => {  // Use TeamResponse instead of Team
  //       if (res.data.rows.length > 0) {
  //         this.team= res.data.rows; // Store API response in teamData
  //         console.log('Fetched teams:', this.teamData);
  //       } else {
  //         console.warn('No teams found');
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching teams:', err);
  //     }
  //   });
  // }

  // res.data.rows --idar rows direclty add kyuki response mei dealer nahi and rows hai so direct rows.
  getAllTeams() {
    this.masterSrv.getAllTeams().subscribe({
      next: (res: TeamsResponse) => {
        if (res && res.data.rows && res.data.rows) {
          this.teamList.set(res.data.rows); // Set the dealer list from response
          console.log('Fetched teams:', this.teamList()); // Log the dealer list
          this.totalteam.set(res.data.count); // Set the total dealer count
        } else {
          this.toastr.warning('No teams found', 'Information');
        }
      },
      error: (err) => {
        console.error('teams fetch error:', err);
        this.toastr.error(err.message || 'Failed to fetch teams', 'Error');
      },
    });
  }

  //   loadRole() {
  //     this.masterSrv.getAllRole().subscribe({
  //       next: (res: roleResponse) => {
  //         if (res && res.data.rows && res.data.rows) {
  //           this.roleList.set(res.data.rows);
  //           console.log('Fetched role:', this.roleList());

  //           this.totalrole.set(res.data.count);
  // =        } else {
  //           this.toastr.warning('No role found', 'Information');
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Error fetching roles:', err);
  //         this.toastr.error(err.error.error, 'Error');
  //       },
  //     });
  //   }
  loadRole() {
    this.masterSrv.getAllRole().subscribe({
      next: (res: roleResponse) => {
        if (res && res.data && Array.isArray(res.data)) {
          this.roleList.set(res.data);
          console.log('Fetched roles:', this.roleList());
          this.totalrole.set(res.data.length); // Assuming count is length of array
        } else {
          this.toastr.warning('No roles found', 'Information');
        }
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
        this.toastr.error(err.error?.error || 'Error fetching roles', 'Error');
      },
    });
  }

  // loadRole(){
  //   this.masterSrv.role
  // }

  // Open modal for adding/editing user
  // openModal(user?: UserList) {
  //   console.log('✅ openModal() function calledm of user');

  //   // Reset the form to clear previous data
  //   this.useForm.reset();

  //   // Determine if we're in edit mode
  //   this.isEditMode = !!user;

  //   if (user) {
  //     // If we have a user, we are in edit mode
  //     // Populate the form with the user data for editing
  //     this.useForm.patchValue({
  //       user_id: user.user_id,
  //       name: user.name || '',
  //       account_id: user.account_id || '',
  //       email: user.email || '',
  //       phone: user.phone || '',
  //       role_id: user.role ? user.role.role_id : '', // Accessing role_id from the role object
  //       user_role: user.role ? user.role.role_name : '', // Accessing role_name from the role object
  //       dealer_code: user.dealer_code || '',
  //       dealer_id: user.dealer_id || null,
  //       team_id: user.team ? user.team.team_id : null,
  //       team_name: user.team ? user.team.team_name : null,
  //     });

  //     // Store previous email for comparison
  //     this.previousEmail = user.email || '';

  //     // Log team information for debugging
  //     console.log('User team info:', user.team);
  //     console.log('Form team values:', {
  //       team_id: this.useForm.get('team_id')?.value,
  //       team_name: this.useForm.get('team_name')?.value,
  //     });
  //     console.log('fhgir');
  //     console.log('🔹 Edit Mode: user Object ->', this.userObj);
  //     console.log('🔹 userObj.user_id ->', this.userObj.user_id);
  //   } else {
  //     // If no user is passed, we are in create mode
  //     // Create a new user object
  //     this.userObj = {} as UserList; // This will create an empty UserList object

  //     // Optionally, set the user_id to undefined or null
  //     this.userObj.user_id = undefined;

  //     console.log('🆕 New user Mode: Reset userObj', this.userObj);
  //   }
  // }
  openModal(user?: UserList) {
    console.log('✅ openModal() function calledm of user');
    console.log('User object received in openModal:', user);

    // Reset the form to clear previous data, but only reset the userObj in create mode
    if (!user) {
      this.userObj = {} as UserList; // Reset userObj only if no user is passed (create mode)
    }

    this.useForm.reset();

    // Determine if we're in edit mode
    this.isEditMode = !!user;

    if (user) {
      // If we have a user, we are in edit mode
      // Populate the form with the user data for editing
      this.useForm.patchValue({
        user_id: user.user_id,
        name: user.name || '',
        account_id: user.account_id || '',
        email: user.email || '',
        phone: user.phone || '',
        role_id: user.role_id || '',
        user_role: user.role_name || '',
        // dealer_code: user.dealer_code || '',
        // dealer_id: user.dealer_id || null,
        team_id: user.team_id || null,
        team_name: user.team_name || '',
        fname: user.fname || '',
        lname: user.lname || '',
      });

      // Store previous email for comparison
      this.previousEmail = user.email || '';

      // Log team information for debugging
      console.log('User team info:', user.team);
      console.log('Form team values:', {
        team_id: this.useForm.get('team_id')?.value,
        team_name: this.useForm.get('team_name')?.value,
      });

      // Set userObj with user details for editing
      this.userObj = { ...user }; // Spread operator to copy the user object
    } else {
      // If no user is passed, we are in create mode
      // Create a new user object
      this.userObj = {} as UserList; // This will create an empty UserList object
    }
  }

  // Handle dealer code change
  // onDealerChange() {
  //   const dealerCodeControl = this.useForm.get('dealer_code');
  //   const dealerIdControl = this.useForm.get('dealer_id');

  //   if (dealerCodeControl && dealerIdControl) {
  //     const selectedDealer = this.dealerList().find(
  //       (dealer) => dealer.dealer_code === dealerCodeControl.value
  //     );

  //     if (selectedDealer) {
  //       dealerIdControl.setValue(selectedDealer.dealer_id);
  //     }
  //   }
  // }
  // Handle dealer code change
  onDealerChange() {
    const dealerCodeControl = this.useForm.get('dealer_code');
    const dealerIdControl = this.useForm.get('dealer_id');

    if (dealerCodeControl && dealerIdControl) {
      const selectedDealer = this.dealerList().find(
        (dealer) => dealer.dealer_code === dealerCodeControl.value
      );

      if (selectedDealer) {
        dealerIdControl.setValue(selectedDealer.dealer_id); // Set the corresponding dealer_id
      }
    }
  }

  // <div class="row">
  //         <div class="col-md-6 form-group">
  //           <label for="team_name" class="form-label">Team name</label>
  //           <select
  //             id="team_name"
  //             class="form-control form-control-lg"
  //             formControlName="team_name"
  //             (change)="onTeamChange()"
  //             [ngClass]="{
  //               'is-invalid':
  //                 useForm.get('team_name')?.touched &&
  //                 useForm.get('team_name')?.invalid
  //             }"
  //           >
  //             <option value="" disabled selected>Select team name</option>
  //             <option
  //               *ngFor="let team of teamList()"
  //               [value]="team.team_name"
  //             >
  //               {{ team.team_name }}
  //             </option>
  //           </select>
  //           <div
  //             class="text-danger"
  //             *ngIf="
  //               useForm.get('team_name')?.touched &&
  //               useForm.get('team_name')?.invalid
  //             "
  //           >
  //             <span>Team is required.</span>
  //           </div>
  //         </div>
  //       </div>

  // onTeamChange() {
  //   const teamNameControl = this.useForm.get('team_name');
  //   const teamIdControl = this.useForm.get('team_id'); // Ensure team_id is part of your form

  //   // ✅ Get the actual array from the Signal
  //   const teamsArray = this.teamList(); // <-- Access the signal value

  //   if (!teamsArray || teamsArray.length === 0) {
  //     console.warn('Team list is empty or undefined');
  //     return;
  //   }

  //   if (teamNameControl && teamIdControl) {
  //     const selectedTeam = teamsArray.find(
  //       (team) => team.team_name === teamNameControl.value
  //     );

  //     if (selectedTeam) {
  //       teamIdControl.setValue(selectedTeam.team_id); // ✅ Auto-update team_id
  //     } else {
  //       console.warn('Selected team not found in the list');
  //     }
  //   }
  // }

  onTeamChange() {
    console.log('onTeamChange() function called');

    const teamNameControl = this.useForm.get('team_name');
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
      } else {
        console.warn('Team not found:', teamNameControl.value);
      }
    }
  }

  // onTeamChange() {
  //   debugger;
  //   console.log('onTeamChange() function called'); // ✅ Debugging log

  //   const teamNameControl = this.useForm.get('team_name');
  //   const teamIdControl = this.useForm.get('team_id');

  //   if (teamNameControl && teamIdControl && teamNameControl.value) {
  //     const selectedTeams = this.teamList().find(
  //       (Teams) => Teams.team_name === teamNameControl.value
  //     );

  //     if (selectedTeams) {
  //       console.log('Selected Team:', selectedTeams);

  //       teamIdControl.setValue(selectedTeams.team_id); // Set the corresponding dealer_id
  //     }
  //   }
  // }

  // Fetch all users
  displayAllUser() {
    this.masterSrv.getMultipleUser().subscribe({
      next: (res: MultiuserResponse) => {
        if (res && res.data.rows) {
          this.totalUser.set(res.data.count);
          this.userList.set(res.data.rows);
        } else {
          this.toastr.warning('No users found', 'Information');
        }
      },
      error: (err) => {
        console.error('Users fetch error:', err);
        this.toastr.error(err.message || 'Failed to fetch users', 'Error');
      },
    });
  }

  // Save new user
  // onSave() {
  //   if (this.useForm.invalid) {
  //     this.markFormGroupTouched(this.useForm);
  //     this.toastr.warning(
  //       'Please fill all required fields correctly',
  //       'Validation'
  //     );
  //     return;
  //   }

  //   this.masterSrv.createNewUser(this.useForm.value).subscribe({
  //     next: () => {
  //       this.toastr.success('User created successfully!', 'Success');
  //       this.displayAllUser();
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
    const selectedRole = this.roleList().find(
      (role) => role.role_id === formData.role_id
    );
    formData.user_role = selectedRole?.role_name || '';

    this.masterSrv.createNewUser(formData).subscribe({
      next: () => {
        this.toastr.success('User created successfully!', 'Success');
        this.displayAllUser();
        this.closeModal();
      },
      error: (err) => {
        console.error('User creation error:', err);
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

  //   const formData = this.useForm.value;
  //   console.log('Form Data being sent to API:', formData);

  //   // Ensure role_id exists
  //   const selectedRole = this.roleList().find(
  //     (role) => role.role_id === formData.role_id
  //   );

  //   // Log the selected role for debugging
  //   console.log('Selected Role:', selectedRole);

  //   // If no role is selected or not found, display an error and stop submission
  //   if (!selectedRole) {
  //     this.toastr.error('Please select a valid role.', 'Error');
  //     return;
  //   }

  //   // Ensure user_role is set from the selected role
  //   formData.user_role = selectedRole.role_name;

  //   console.log('Final Form Data before sending:', formData);

  //   this.masterSrv.createNewUser(formData).subscribe({
  //     next: () => {
  //       this.toastr.success('User created successfully!', 'Success');
  //       this.displayAllUser();
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

  // // Update existing user
  // onUpdate() {
  //   console.log('onUpdate func called');
  //   if (!this.userObj || !this.userObj.user_id) {
  //     this.toastr.warning('No user selected for update!', 'Warning');
  //     console.error('Update failed: Missing user ID', this.userObj);
  //     return;
  //   }

  //   console.log('Updating user:', this.userObj);

  //   this.masterSrv.updateUser(this.userObj).subscribe(
  //     (res: any) => {
  //       console.log('API Response:', res); // ✅ Log API response

  //       this.toastr.success('User updated successfully', 'Success');
  //       this.displayAllUser(); // Call to refresh the list after update
  //     },
  //     (error) => {
  //       this.toastr.error('Error updating User', 'Error');
  //     }
  //   );
  onUpdate() {
    console.log('on update');
    console.log('Form Values:', this.useForm.value);

    if (this.useForm.valid) {
      const formValues = this.useForm.value;

      // Create the formatted name with proper space
      const formattedName = `${formValues.fname || ''} ${
        formValues.lname || ''
      }`
        .trim()
        .replace(/\s+/g, ' ');

      // Set the name property correctly
      formValues.name = formattedName;

      // Update the userObj with all properties including the formatted name
      this.userObj = { ...this.userObj, ...formValues };

      console.log('🔍 Form Status:', this.useForm.status);
      console.log('🚀 Updated Payload before API call:', this.userObj);

      // Call the updateUser API with the updated user object
      this.masterSrv.updateUser(this.userObj).subscribe(
        (res: any) => {
          if (res.status === 200) {
            console.log('API Response:', res); // Log full response

            console.log('✅ Update Success:', res);
            this.toastr.success(res.message, 'Success');

            // Update the UI immediately with the correctly formatted name
            this.userList.set(
              this.userList().map((user) =>
                user.user_id === this.userObj.user_id
                  ? {
                      ...user,
                      ...this.userObj,
                      name: formattedName, // Ensure the name is correctly set with space
                    }
                  : user
              )
            );

            setTimeout(() => {
              this.cdr.detectChanges(); // Force UI update
              this.cdr.markForCheck(); // Mark for change detection if using OnPush
            }, 0);

            // Fetch all users after update
            this.displayAllUser();

            // Close the modal
            this.closeModal();

            // Reset the form after successful update
            this.useForm.reset();
          } else {
            this.toastr.error('Update failed', 'Error');
          }
        },
        (error) => {
          console.error('❌ API Error:', error);
          if (error.response) {
            this.toastr.error(error.response.data.message, 'Error');
          } else {
            this.toastr.error('Failed to update user', 'Error');
          }
        }
      );
    } else {
      this.toastr.error('Invalid form data. Please check inputs.', 'Error');
    }
  }

  // closeModal() {
  //   ($('.bd-example-modal-lg') as any).modal('hide');
  // }
  // onUpdate() {
  //   if (this.useForm.valid) {
  //     this.userObj = { ...this.userObj, ...this.useForm.value };

  //     console.log('🚀 Updated Payload before API call:', this.userObj);

  //     this.masterSrv.updateUser(this.userObj).subscribe(
  //       (res: any) => {
  //         console.log('✅ API Response:', res); // ✅ Check API response

  //         if (res.status === 200) {
  //           this.toastr.success(res.message, 'Success');

  //           // 🔄 Ensure we fetch updated data after updating
  //           setTimeout(() => {
  //             this.displayAllUser();
  //           }, 500);
  //         } else {
  //           this.toastr.error('Update failed, no data received', 'Error');
  //         }
  //       },
  //       (error) => {
  //         console.error('❌ API Error:', error);
  //         this.toastr.error('Failed to update customer', 'Error');
  //       }
  //     );
  //   } else {
  //     this.toastr.error('Invalid form data. Please check inputs.', 'Error');
  //   }

  // this.masterSrv.updateUser(this.useForm.value).subscribe({
  //   next: () => {
  //     this.toastr.success('User updated successfully!', 'Success');
  //     this.displayAllUser();
  //     this.closeModal();
  //   },
  //   error: (err) => {
  //     console.error('User update error:', err);
  //     this.toastr.error('Update the E-mail and AccountId', 'Update Error');
  //   },
  // });

  // onUpdate() {
  //   if (!this.userObj || !this.userObj.user_id) {
  //     this.toastr.warning('No vehicle selected for update!', 'Warning');
  //     console.error('Update failed: Missing vehcile ID', this.userObj);
  //     return;
  //   }

  //   console.log('Updating vehcile:', this.userObj); // ✅ Log before update

  //   this.masterSrv.updateUser(this.userObj).subscribe(
  //     (res: any) => {
  //       console.log('API Response:', res); // ✅ Log API response

  //       if (res && res.status === 200) {
  //         this.toastr.success(
  //           res.message || 'vehicle updated successfully',
  //           'Success'
  //         );

  //         // ✅ Manually reload customers after update
  //         this.loadUsers();

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
  // private loadUsers(): void {
  //   this.masterSrv.getAllUser().subscribe({
  //     next: (res: UserResponse) => {
  //       this.count.set(res.data);
  //       this.userList.set(res.data);
  //     },
  //     error: (err) => {
  //       this.toastr.error('Failed to load vehicles', 'Error');
  //       console.error('Vehicle load error:', err);
  //     },
  //   });
  // }
  // Edit a specific user
  // onEdit(id: string) {
  //   this.masterSrv.getSingleUser(id).subscribe({
  //     next: (res: UserList) => {
  //       this.userObj = res;
  //       this.openModal(res);
  //     },
  //     error: (err) => {
  //       console.error('User fetch error:', err);
  //       this.toastr.error('Failed to fetch user details', 'Error');
  //     },
  //   });
  // }
  // Track the original name before editing
  // previousValue: string = ''; // Store the name before editing

  // Method to handle the Edit button click
  onEdit(user: UserList) {
    this.isEditMode = true; // Set the edit mode flag
    console.log('user.userObj before setting:', user?.user_id);

    // Copy user data to userObj
    this.userObj = { ...user }; // Spread operator to avoid reference issues

    // Store the previous name for comparison
    this.previousValue = user.name;

    // Create formatted name (ensure exactly one space between fname and lname)
    const formattedName = `${user.fname || ''} ${user.lname || ''}`
      .trim()
      .replace(/\s+/g, ' ');

    console.log('Formatted name onEdit:', formattedName); // Log the formatted name to check

    // Initialize the form with current user data
    this.useForm.patchValue({
      user_id: user.user_id,
      name: formattedName, // Use the formatted name here
      account_id: user.account_id || '',
      email: user.email || '',
      phone: user.phone || '',
      role_id: user.role_id || '',
      team_id: user.team_id || null,
      team_name: user.team_name || '',
      fname: user.fname || '',
      lname: user.lname || '',
      user_role: user.user_role || '',
    });

    console.log('userObj.user_id after setting:', this.userObj?.user_id);
  }

  // Check if the name field has been changed

  // Check if the name field has been changed
  isUserNameChanged(): boolean {
    return this.useForm.value.name !== this.previousValue; // Compare the current name to the previous value
  }

  selectedUserForDeletion: UserList | null = null;

  selectUserForDeletion(user: UserList) {
    this.selectedUserForDeletion = user;
  }

  deleteUserId() {
    console.log(
      'this is the select user',
      this.selectUserForDeletion,
      this.selectedUserForDeletion
    );
    console.log('Deleting User ID:', this.selectedUserForDeletion?.user_id);

    if (this.selectedUserForDeletion && this.selectedUserForDeletion.user_id) {
      this.masterSrv.deleteUser(this.selectedUserForDeletion.user_id).subscribe(
        (res: MultiuserResponse) => {
          this.toastr.success('User deleted successfully', 'Success');
          this.displayAllUser();
        },
        (error) => {
          // alert(error.message || 'Failed to delete users'); comment for server side error not come
          this.toastr.error('Server Error', 'Error');
        }
      );
    } else {
      alert('No users selected for deletion');
    }
  }

  // Close modal
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
  
}
