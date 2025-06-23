import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  Signal,
  signal,
  NgZone,
} from '@angular/core';
import {
  Lead,
  LeadResponse,
  SingleDealerResponse,
  TaskResponse,
  UserResponse,
} from '../../model/interface/master';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MasterService } from '../../service/master.service';
import { Users } from '../../model/class/users';
import { Tasks } from '../../model/class/tasks';
import { Events } from '../../model/class/event';
import { Leads } from '../../model/class/leads';
import { Opportunities } from '../../model/class/opportunities';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { data, param } from 'jquery';
import { ContextService } from '../../service/context.service';
import { response } from 'express';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var $: any;


// declare var $: any;
@Component({
  selector: 'app-single-dealer',
  standalone: true,
  imports: [FormsModule, CommonModule, SharedModule, RouterLink],
  templateUrl: './single-dealer.component.html',
  styleUrls: ['./single-dealer.component.css'],
})
export class SingleDealerComponent implements AfterViewInit {
  // userList = signal<Users[]>([]);
  UserList: any[] = []; // ✅ Initialize as an empty array
  loading: boolean = false;
  leadList: any[] = []; // ✅ Initialize as an empty array
  TaskList: any[] = []; // ✅ Initialize as an empty array
  EventList: any[] = []; // ✅ Initialize as an empty array

  OpportunityList = signal<Opportunities[]>([]);
  // TaskList = signal<Tasks[]>([]);
  // EventList = signal<Events[]>([]);
  // leadList = signal<Leads[]>([]);
  dealerData: SingleDealerResponse | undefined;
  masterSrv = inject(MasterService);
  showUsersTable: boolean = true;
  showLeadsTable: boolean = false;
  showOpportunityTable: boolean = false;
  showTaskTable: boolean = false;
  showEventTable: boolean = false;
  dealer_name: string | null = '';
  toastr: any;
  user: any;
  apiService: any;
  // Users: any;
  // trackByUserId: TrackByFunction<Users>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}
  ngOnInit() {
    console.log('ngOnInit is called');

    this.handleQueryParams();
    this.handleRouteData();
    this.handleDealerId((dealerId) => {
      this.getAllUser(dealerId);
      this.getAllLeads(dealerId);
      this.getAllTasks(dealerId);
      this.getAllEvent(dealerId);
      // this.fetchUsers();
      // this.getAllEvent(dealerId);
      // this.getAllLeads(dealerId);
      // this.getAllOpp(dealerId);
      // this.getAllTasks(dealerId)

      console.log('API Data:', data); // Check the data in console

      console.log('dealerData:', this.dealerData);
      console.log('Fetched UserList:', this.UserList);
    });
  }

  // selectedOption: string = 'users';

  private dropdownService = inject(ContextService);
  selectedOption = this.dropdownService.getSelectedOption();

  handleSelectionChange(event: Event) {
    const option = (event.target as HTMLSelectElement).value;
    // this.selectedOption = option;
    //  const option = (event.target as HTMLSelectElement).value;
    this.dropdownService.setSelectedOption(option);

    console.log('this is option', this.selectedOption());

    switch (option) {
      case 'leads':
        console.log('dealerData:', this.dealerData); // Log the value of dealerData

        if (this.dealerData) {
          this.getAllLeads(this.dealerData.data.dealer.dealer_id);
          this.toggleLeadsTable();
        } else {
          console.warn('lead data is not available.');
        }
        break;
      case 'users':
        if (this.dealerData) {
          this.getAllUser(this.dealerData.data.dealer.dealer_id);
          this.toggleUsersTable();
        } else {
          console.warn('Dealer data is not available.');
        }
        break;
      case 'opportunities':
        console.log(this.dealerData);
        this.toggleOpportunityTable();
        if (this.dealerData) {
          this.getAllOpp(this.dealerData.data.dealer.dealer_id);
        }
        break;

      case 'events':
        this.toggleEventTable();
        if (this.dealerData) {
          this.getAllEvent(this.dealerData.data.dealer.dealer_id);
        }
        break;
      case 'tasks':
        this.toggleTasksTable();
        if (this.dealerData) {
          this.getAllTasks(this.dealerData.data.dealer.dealer_id);
        }
        break;
    }
  }

  toggleUsersTable() {
    this.showLeadsTable = false;
    this.showUsersTable = true;
    this.showOpportunityTable = false;
    this.showTaskTable = false;
    this.showEventTable = false;
  }

  toggleTasksTable() {
    this.showTaskTable = true;
    this.showUsersTable = false;
    this.showLeadsTable = false;
    this.showOpportunityTable = false;
    this.showEventTable = false;
  }

  toggleLeadsTable() {
    this.showLeadsTable = true;
    this.showUsersTable = false;
    this.showOpportunityTable = false;
    this.showTaskTable = false;
    this.showEventTable = false;
  }

  toggleOpportunityTable() {
    this.showOpportunityTable = true;
    this.showEventTable = false;
    this.showUsersTable = false;
    this.showLeadsTable = false;
    this.showTaskTable = false;
  }

  toggleEventTable() {
    this.showEventTable = true;
    this.showOpportunityTable = false;
    this.showUsersTable = false;
    this.showLeadsTable = false;
    this.showTaskTable = false;
  }

  ngAfterViewInit() {
    console.log('ngOnInit is called');
    console.log('hello');
    console.log(typeof $.fn.DataTable); // Check if DataTables is loaded
    this.initializeDataTable();
    // this.fetchUserData();
  }

  // fetchUserData() {
  //   console.log('Fetching user data...');
  //   setTimeout(() => {
  //     this.UserList = [
  //       {
  //         user_account_id: '1',
  //         name: 'John',
  //         email: 'john@example.com',
  //         phone: '1234567890',
  //         user_role: 'Admin',
  //         dealer_code: 'DEALER001',
  //       },
  //       {
  //         user_account_id: '2',
  //         name: 'Jane',
  //         email: 'jane@example.com',
  //         phone: '9876543210',
  //         user_role: 'User',
  //         dealer_code: 'DEALER002',
  //       },
  //       // More user data here...
  //     ];
  //     console.log('Fetched User Data:', this.UserList); // Check if data is populated
  //   }, 1000);
  // }

  initializeDataTable() {
    setTimeout(() => {
      let table = $('#example5').DataTable();
      if (table) {
        table.destroy(); // ✅ Destroy previous instance to avoid duplication
      }
      setTimeout(() => {
        $('#example5').DataTable(); // ✅ Reinitialize DataTable
      }, 100);
    }, 100);
  }

  private handleQueryParams() {
    this.route.queryParams.subscribe((params) => {
      this.dealer_name = params['dealer_name'];
      console.log('Dealer Name : ', this.dealer_name);
    });
  }

  private handleRouteData() {
    this.route.data.subscribe((data) => {
      this.dealerData = data['dealerData'];
      if (this.dealerData) {
        const dealerId = this.dealerData.data.dealer.dealer_id;
        this.getAllUser(dealerId);
      } else {
        console.log('Dealer Data not available from resolver');
      }
    });
  }

  private handleDealerId(callback: (dealerId: string) => void) {
    this.route.paramMap.subscribe((params) => {
      const dealerId = params.get('dealer_id');
      if (dealerId) {
        callback(dealerId);
      } else if (!this.dealerData) {
        console.error('Dealer ID not found in the URL and no resolver data.');
      }
    });
  }

  // getUser(dealerId: string) {
  //   this.masterSrv.getAllUser(dealerId).subscribe({
  //     next: (res: UserResponse) => {
  //       if (Array.isArray(res.data) && res.data.length > 0) {
  //         this.userList.set(res.data);
  //         this.cdr.markForCheck(); // Trigger change detection
  //       } else {
  //         this.toastr.warning('No users found', 'Information');
  //       }
  //     },
  //     error: (err) => {
  //       this.toastr.error(err.message || 'Failed to fetch users', 'Error');
  //     },
  //   });
  // }
  // getUser(dealerId: string) {
  //   this.masterSrv.getAllUser(dealerId).subscribe({
  //     next: (res: UserResponse) => {
  //       console.log('API Response:', res);

  //       if (Array.isArray(res.data) && res.data.length > 0) {
  //         console.log('Users Found:', res.data);
  //         this.userList = [...res.data]; // ✅ Assign data correctly
  //         this.cdr.detectChanges(); // ✅ Force UI update
  //       } else {
  //         console.warn('No users found!');
  //         this.userList = []; // ✅ Ensure empty array if no users
  //       }
  //     },
  //     error: (err) => {
  //       console.error('API Error:', err);
  //       this.toastr.error(err.message || 'Failed to fetch users', 'Error');
  //     },
  //   });
  // }

  // fetchUsers(): void {
  //   this.apiService.getUsers().subscribe(
  //     (response: UserResponse) => {
  //       console.log('✅ Full API Response:', response);

  //       if (response && response.data) {
  //         this.UserList = response.data;
  //         console.log('✅ UserList Data:', this.UserList); // Debugging
  //       } else {
  //         console.error('❌ Error: response.data is undefined or empty');
  //         this.UserList = [];
  //       }
  //     },
  //     (error: any) => {
  //       console.error('❌ API Error:', error);
  //       this.UserList = [];
  //     }
  //   );
  // }
  // getAllUser(dealerId: string) {
  //   this.masterSrv.getAllUser(dealerId).subscribe({
  //     next: (res: UserResponse) => {
  //       console.log('✅ Full API Response:', res);
  //       console.log('Fetched Users:', res.data); // Log the fetched data
  //       this.UserList = res.data; // Assign the fetched data
  //       console.log('Users:', this.UserList); // Log the UserList after assignment

  //       this.loading = false; // Stop loading indicator

  //       // Ensure UI updates and DataTable initializes properly
  //       this.zone.run(() => {
  //         if (Array.isArray(this.UserList)) {
  //           console.log('✅ Assigned UserList:', this.UserList);
  //           this.cdr.detectChanges(); // Force UI update

  //           setTimeout(() => {
  //             this.initializeDataTable(); // Initialize DataTable after data is set
  //           }, 500);
  //         } else {
  //           console.warn('⚠️ Invalid API Response Format:', res);
  //           this.UserList = [];
  //         }
  //       });
  //     },
  //     error: (err) => {
  //       console.error('❌ API Error:', err);
  //       this.UserList = [];
  //       this.cdr.detectChanges();
  //     },
  //   });
  // }
  getAllUser(dealerId: string) {
    console.log('Calling API with dealerId:', dealerId); // Add this line to check if API call is being made

    this.masterSrv.getAllUser(dealerId).subscribe({
      next: (res: UserResponse) => {
        console.log('✅ Full API Response:', res);
        console.log('Fetched Users:', res.data); // Log the fetched data

        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          this.UserList = res.data;
          console.log('Users List:', this.UserList); // Ensure data is set correctly
          this.loading = false; // Stop loading indicator
        } else {
          console.warn('No users found');
          this.UserList = [];
        }

        // Ensure UI updates and DataTable initializes properly
        this.zone.run(() => {
          if (Array.isArray(this.UserList)) {
            console.log('✅ Assigned UserList:', this.UserList);
            this.cdr.detectChanges(); // Force UI update
            setTimeout(() => {
              this.initializeDataTable(); // Initialize DataTable after data is set
            }, 500);
          } else {
            console.warn('⚠️ Invalid API Response Format:', res);
            this.UserList = [];
          }
        });
      },
      error: (err) => {
        console.error('❌ API Error:', err);
        this.UserList = [];
        this.cdr.detectChanges();
      },
    });
  }

  reinitializeDataTable() {
    setTimeout(() => {
      $('#example5').DataTable().clear().destroy(); // ✅ Clear & destroy
      setTimeout(() => {
        $('#example5').DataTable(); // ✅ Reinitialize
      }, 100);
    }, 200);
  }

  // getUser(dealerId: string): void {
  //   console.log('Fetching user data for dealerId:', dealerId);
  //   this.masterSrv.getAllUser(dealerId).subscribe({
  //     next: (res: UserResponse[]) => {
  //       if (res.length > 0 && res[0].data && res[0].data.dealer && Array.isArray(res[0].data.dealer.rows)) {
  //         this.userList.set(res[0].data.dealer.rows); // ✅ Correct way to update signal
  //         console.log('User data fetchesdsddsd:', this.userList());
  //       } else {
  //         console.error('Invalid data structure:', res);
  //       }
  //     },
  //     error: (err: any) => {
  //       console.error('Error fetching user data:', err);
  //     }
  //   });
  // }

  // getAllLeads(dealerId: string) {
  //   console.log('Fetching user data for dealerId:', dealerId);
  //   this.masterSrv.getAllLead(dealerId).subscribe({
  //     next: (res: Leads[]) => {
  //       this.leadList.set(res);
  //       console.log('User data fetched:', res);
  //     },
  //     error: (err: any) => {
  //       console.error('Error fetching users:', err);
  //     },
  //   });
  // }
  // Assuming you're setting the data correctly in this.leadList
  getAllLeads(dealerId: string) {
    console.log('Calling API with dealerId for leads:', dealerId);
    if (!dealerId) {
      console.warn('dealerId is missing!');
      return;
    }

    this.masterSrv.getAllLead(dealerId).subscribe({
      next: (res: any) => {
        console.log('✅ Full API Response:', res);

        if (res && res.data && res.data.length > 0) {
          this.leadList = res.data; // Access the 'data' field from the response
          console.log('Leads List:', this.leadList); // Ensure data is set correctly
        } else {
          console.warn('No leads found');
          this.leadList = [];
        }
      },
      error: (err) => {
        console.error('❌ API Error:', err);
        this.leadList = [];
      },
    });
  }

  // getAllUsers(user_id:string) {
  //   console.log('Fetching user data for dealerId:', user_id);
  //   this.masterSrv.getAllUser(user_id).subscribe({
  //     next: (res: Users[]) => {
  //       this.UserList.set(res);
  //       console.log('User data fetched:', res);
  //     },
  //     error: (err: any) => {
  //       console.error('Error fetching users:', err);
  //     },
  //   });
  // }

  // getAllEvent(dealerId: string) {
  //   this.masterSrv.getEventsAll(dealerId).subscribe({
  //     next: (res: Events[]) => {
  //       // Now res is of type Leads[]
  //       this.EventList.set(res);
  //       console.log('Leads data fetched:', res);
  //     },
  //     error: (err) => {
  //       alert(err.message || 'An error occurred while fetching leads.');
  //     },
  //   });
  // }
  getAllEvent(dealerId: string) {
    console.log('Calling API with dealerId for leads:', dealerId);
    if (!dealerId) {
      console.warn('dealerId is missing!');
      return;
    }

    this.masterSrv.getEventsAll(dealerId).subscribe({
      next: (res: any) => {
        // You can use `any` temporarily if you're unsure about the exact type
        console.log('✅ Full API Response:', res);

        if (res && res.data && res.data.length > 0) {
          this.EventList = res.data; // Assign the array inside `data` field to EventList
          console.log('Event List:', this.EventList); // Ensure data is set correctly
        } else {
          console.warn('No events found');
          this.EventList = [];
        }
      },
      error: (err) => {
        console.error('❌ API Error:', err);
        this.EventList = [];
      },
    });
  }

  getAllTasks(dealerId: string) {
    console.log('Calling API with dealerId for leads:', dealerId);
    if (!dealerId) {
      console.warn('dealerId is missing!');
      return;
    }

    this.masterSrv.getAllTask(dealerId).subscribe({
      next: (res: any) => {
        // Use TaskResponse instead of TaskResponse[]
        console.log('✅ Full API Response:', res);

        if (res && res.data && res.data.length > 0) {
          this.TaskList = res.data; // Access the 'data' field from the response
          console.log('Task List:', this.TaskList); // Ensure data is set correctly
        } else {
          console.warn('No tasks found');
          this.TaskList = [];
        }
      },
      error: (err) => {
        console.error('❌ API Error:', err);
        this.TaskList = [];
      },
    });
  }

  // getAllTasks(dealerId: string) {
  //   this.masterSrv.getAllTask(dealerId).subscribe({
  //     next: (res: Tasks[]) => {
  //       // Now res is of type Leads[]
  //       this.TaskList.set(res);
  //       console.log('Leads data fetched:', res);
  //     },
  //     error: (err) => {
  //       alert(err.message || 'An error occurred while fetching leads.');
  //     },
  //   });
  // }

  getAllOpp(dealerId: string) {
    this.masterSrv.getAllOpportunities(dealerId).subscribe({
      next: (res: Opportunities[]) => {
        // Now res is of type Leads[]
        this.OpportunityList.set(res);
        console.log('Leads data fetched:', res);
      },
      error: (err) => {
        alert(err.message || 'An error occurred while fetching leads.');
      },
    });
  }

  // refresh

  router = inject(Router);

  // navigateWithReload(path: string) {
  //   this.router.navigateByUrl(path).then(() => {
  //     window.location.reload();
  //   });
  // }
  logUserId(userId: string): void {
    console.log('Navigating to user with ID:', userId);

    if (this.dealerData?.data.dealer?.dealer_id) {
      localStorage.setItem(
        'previousRoute',
        this.dealerData.data.dealer.dealer_id
      );
    } else {
      console.warn('dealer_id is missing, previousRoute not stored.');
    }
  }
}

function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}
