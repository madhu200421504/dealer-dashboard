import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  signal,
  WritableSignal,
  ChangeDetectorRef,
} from '@angular/core';
import { SimpleChanges, OnChanges } from '@angular/core';

import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import {
  Chart,
  ChartType,
  LineController,
  LineElement,
  registerables,
} from 'chart.js';
import { FormsModule } from '@angular/forms';
import {
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
} from 'chart.js';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { HeaderComponent } from '../../layout/header/header.component';
import {
  ApiResponse,
  DashboardResponse,
  SelectedUser,
  SelectedUserData,
  TestDrive,
  TodayTestDrive,
  User,
  UserPerformance,
} from '../../model/interface/master';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from '../../service/sidebar.service';
import { Subscription } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

// Register all chart components
Chart.register(...registerables);
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip
);

// Define User interface
// interface User {
//   user_id: string;
//   name: string;
//   fname: string;
//   lname: string;
// }
// interface User {
//   user_id: string;
//   name: string;
//   enquiries?: number;
//   testDrives?: number;
//   newOrders?: number;
//   cancellations?: number;
//   netOrders?: number;
//   dealer_id: string;
//   retail?: number;
// }
interface PsUser {
  ps_id: string;
  ps_fname: string;
  ps_lname: string;
  enquiries: number;
  testDrives: number;
  orders: number;
  cancellation: number;
  net_orders: number;
  retail: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = true;
  sidebarSub!: Subscription;
  selectedPSUser: PsUser | null = null;
  isLoadingUsers = false;

  kpis = [
    { name: 'Enquiries', key: 'enquiries' },
    { name: 'Test Drives', key: 'test_drives' },
    { name: 'New Orders', key: 'new_orders' },
    { name: 'Cancellations', key: 'cancellations' },
    { name: 'Net Orders', key: 'net_orders' },
    { name: 'Retail', key: 'retail' },
  ];

  userData: { [key: string]: number } = {
    enquiries: 45,
    test_drives: 30,
    new_orders: 20,
    cancellations: 5,
    net_orders: 15,
    retail: 25,
  };
  comparePerformance: {
    enquiries: number;
    testDrives: number;
    newOrders: number;
    cancellations: number;
    netOrders: number;
    retail: number;
  } | null = null;
  errorMessage = '';
  currentSlide = 0;
  filteredActivities: any[] = []; // ✅ Initialize as empty array

  maxValue = 100;
  kpiData: any = {};
  noResultsFound: boolean = false;
  selectedUsersPerformance: UserPerformance[] = [];
  hourlyChartLabels: string[] = []; // For example: ['Q1', 'Q2', 'Q3', 'Q4']
  hourlyChartData: number[] = []; // Number of calls (for bar height)

  selectedSection: 'home' | 'analysis' = 'home';
  users: User[] = [];
  // selectedUser: (SelectedUser & { name: string }) | null = null; // Extend SelectedUser with name
  selectedUser: any = null;

  selectedUserData: TestDrive[] = [];
  todayTestDrives: TodayTestDrive[] = [];
  // ps1Total = 0;
  // ps2Total = 0;
  clickedUser: any = null;
  callSummaryOrder: any = {}; // or proper type if you know it
  selectedDurationFilter: string = 'MTD'; // for duration box

  currentPageforCompare: number = 1;
  itemsPerPageforCompare: number = 10;
  selectedDuration: string = '1M';
  selectedFilter: string = 'MTD'; // ensure default matches the selectedDuration
  upcomingTestDrives: TestDrive[] = [];
  overdueTestDrives: TestDrive[] = [];
  fullData: ApiResponse['data'] | null = null;
  reservations: any[] = []; // your original data array
  filteredReservations: any[] = []; // the filtered array to bind to the table
  filterOption: 'today' | 'oneWeek' = 'today';
  selectedType: string = ''; // Add this line to define selectedType
  selectedPs2UserId: string = '';
  pageSize: number = 10; // or whatever number of items per page you're showing
  // selectedUserIds: number[] = [];
  selectedUserIds: string[] = []; // ✅ correct
  // hourlyChartLabels: string[] = [];
  // hourlyConnectedCalls: number[] = [];
  // selectedFilter: string = 'enquiries';
  categoryName: string = 'enquiries'; // default category
  selectedPerformanceFilter: string = 'MTD'; // for performance cards

  smData: any[] = []; // 👈 declare the property to avoid the error
  // hourlyChartLabels: string[] = [];
  hourlyAllCalls: number[] = [];
  hourlyConnectedCalls: number[] = [];
  hourlyMissedCalls: number[] = [];
  // hourlyChartLabels: string[] = [];
  callSummaryOrderEnquiry: any = {};

  testDrives: any[] = []; // <-- Declare testDrives here
  dashboardData: any = {
    tableTestDrives_today: [],
    tableTestDrives_oneweek: [],
  };
  isUserSelected = false;
  // ps1Total = 0;
  private hourlyChartInstance: Chart | null = null;
  // visiblePagesForCompare: number[] = [];

  // ps2Total = 0;
  enquiriesCount = 0;
  testDrivesCount = 0;
  newOrdersCount = 0;
  totalPages: number = 1;
  hierarchy: any[] = [];

  enquiriesCountPs2 = 0;
  testDrivesCountPs2 = 0;
  newOrdersCountPs2 = 0;

  ps1Total = 0;
  ps2Total = 0;
  compareSmData: any[] = [];
  currentUserId: string = '';
  currentSmId: string = '';

  // selectedFilter: string = 'MTD'; // ✅ default to MTD
  selectedUserId: string = ''; // Store the selected userId
  ps2Available: boolean = false;
  // enquiriesCount: number = 0;
  // testDrivesCount: number = 0;
  // newOrdersCount: number = 0;
  cancellationsCount: number = 0;
  netOrdersCount: number = 0;
  retailCount: number = 0;

  showUserForm = false;
  dropdownOpen = false;
  hoveredUser: any = null;
  allTestDrives: any[] = []; // To hold all test drive data for the table
  performance: any[] = []; // Your backend data
  searchTextUserDetails: string = '';
  fullUsers: any[] = []; // Full original user list from API
  // ps2Total: number = 0;

  // selectedPs1: any = '';
  // selectedPs2: string = '';
  loading: boolean = true; // <-- declare loading flag
  activeFilter: 'MTD' | 'QTD' | 'YTD' = 'MTD'; // set default selection
  dashboardMetrics: any = {
    enquiries: 0,
    testDrives: 0,
    newOrders: 0,
    cancellations: 0,
    netOrders: 0,
    retail: 0,
    allIndiaBestPerformace: {
      enquiriesCount: 0,
      testDrivesCount: 0,
      newOrdersCount: 0,
      cancellationsCount: 0,
      retailCount: 0,
    },
    allIndiaRank: {
      enquiriesRank: 0,
      testDrivesRank: 0,
      newOrdersRank: 0,
      cancellationsRank: 0,
      retailRank: 0,
    },
  };

  dropdownOpen1 = false;
  dropdownOpen2 = false;
  performanceData: { [userId: string]: any } = {};
  ps1Performance: { [userId: string]: any } = {};

  // selectedPs2: string[] = [];
  selectedPs1: string = '';
  selectedPs1Name: string = '';
  visibleUserCount: number = 15; // Start with 15 users shown
  // users = [...]; // Your full list of users
  showMore = false;
  selectedPs2: string[] = [];
  selectedPs2Names: string[] = [];

  selectedPs2Name: string = '';
  ps1Progress: number = 0;
  ps2Progress: number = 0;
  ps1Value: number = 0;
  ps2Value: number = 0;
  // dropdownOpen2 = false;
  maxCount: number = 100; // Declare maxCount here with an initial value
  // enquiriesCountPs2 = 0;
  // testDrivesCountPs2 = 0;
  // newOrdersCountPs2 = 0;
  cancellationsCountPs2 = 0;
  netOrdersCountPs2 = 0;
  retailCountPs2 = 0;

  isPs2Selected = false;

  searchText: string = ''; // For search functionality
  itemsPerPage: number = 5; // You can adjust this number
  // totalPages: number = 0;
  filteredTableTestDrives: any[] = []; // <--- ADD THIS PROPERTY
  ps1Count = 0;
  ps2Count = 0;
  psList: any[] = [];
  roles: any[] = [];
  selectedPs: string = '';
  selectedRole: string = '';
  showRoleForm: boolean = false;
  selectedColor: string = '';
  selectedSmId: string | null = null;

  // selectedUserId = '';
  isGridView: boolean = true; // Toggle between grid and table view
  userSearchTerm: string = '';
  userSortColumn: string = '';
  userSortDirection: 'asc' | 'desc' = 'asc';
  currentUserPage: number = 1;
  testDriveSearchText: string = ''; // Renamed for clarity (distinguish from user search)
  testDriveCurrentPage: number = 1;
  testDriveItemsPerPage: number = 5;
  testDriveTotalPages: number = 0;
  currentPage = 1;
  testDrivesToday: any[] = [];
  testDrivesOneWeek: any[] = [];
  usersPerPage = 40;
  searchTextToday: string = '';
  todayUsers: any[] = []; // full list of users for Today’s Actions
  filteredTodayUsers: any[] = [];
  filterTodayUsers: any;
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string = '';
  filteredUsers: any[] = [];
  selectedInitial: string | null = null;
  allUsers: any[] = [];
  activeCategory: string = 'enquiries';
  activePeriod: string = 'MTD';

  displayedUsers: any[] = [];
  initialsList: string[] = [];
  showUserModal = false;
  tickedUserInPs1: any = null;
  // showingLimit = 10;
  defaultLimit = 10;
  showingLimit = this.defaultLimit;

  // currentPage = 1;
  // itemsPerPage = 10; // or whatever you use
  // totalItems = this.smData.length; // Should be the total count of your data
  // @Input() selectedUser: any;
  // @Input() selectedSmId: string;
  // filteredUsers: any[] = [];

  // selectedUser: any = null;
  // displayedUsers: any[] = [];
  data: any; // <-- Add this line
  // selectedFilter: string = 'MTD'; // 👈 Default selected
  activeActivity: string = 'Enquiry'; // for Enquiry/Cold Calls
  activeTestDriveStatus: string = 'Upcoming'; // for Upcoming/Completed/Overdue
  selectedOverdueIndex: number = 0;
  selectedTodayIndex: number = 0;
  ps2Performance: { [userId: string]: any } = {};
  selectedTeamId: string | null = null;
  selectedTeam: string | null = null;
  callSummaryCold: any;
  hourlyChartLabelsCold: string[] = [];
  hourlyAllColdCalls: number[] = [];
  hourlyConnectedColdCalls: number[] = [];
  hourlyMissedColdCalls: number[] = [];

  selectedUpcomingIndex: number = 0;
  // selectedOverdueIndex: number = 0;
  groupedUsers: { [key: string]: any[] } = {}; // all grouped by initials
  displayedUserGroups: { [key: string]: any[] } = {}; // for displaying after search
  private _displayedUsers: any[] = [];
  selectedUserDetails: any;
  maxDriveCount: number = 0;
  indexes: number[] = [];
  // defaultLimit = 10;
  Math = Math; // 👈 this line is important

  allActivities: any[] = []; // Holds all test drive activities (Upcoming, Completed, Overdue)

  // activeActivity: string = 'Upcoming'; // default

  uniqueInitials: string[] = []; // ✅ renamed to avoid clash
  avatarColors: string[] = [
    '#E1D5E7', // Light Lavender
    '#CFF4FC', // Light Aqua Blue
    '#F8D7DA', // Light Red
    '#D4EDDA', // Light Green
    '#DDEBF7', // Light Blue
    '#FCE5CD', // Light Peach
    '#EAD1DC', // Light Pink
    '#FFF2CC', // Light Yellow
    '#D9EAD3', // Mint Green
    '#F4CCCC', // Pale Coral
    '#F3F3F3', // Soft Grey
    '#FFE6F0', // Light Rose
  ];

  // searchText: string = '';
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef, // 👈 Add this
    private sidebarService: SidebarService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.onFilterClick('MTD'); // ⬅️ This will simulate clicking the MTD button on load

    this.selectedDuration = '1M';
    this.selectedFilter = 'MTD';

    const defaultUser = this.allUsers?.[0]; // or however you get initial user
    if (defaultUser) {
      this.onUserSelect(defaultUser.ps_id); // ✅ triggers right box update
    }

    const savedUserIds = localStorage.getItem('selectedUserIds');
    const savedPerformance = localStorage.getItem('selectedUsersPerformance');

    if (savedUserIds) {
      this.selectedUserIds = JSON.parse(savedUserIds);
    } else {
      this.selectedUserIds = [];
    }

    if (savedPerformance) {
      this.selectedUsersPerformance = JSON.parse(savedPerformance);
    } else {
      this.selectedUsersPerformance = [];
    }
    // 🔁 Re-fetch performance for saved users
    if (this.selectedUserIds.length && this.selectedFilter) {
      this.selectedUserIds.forEach((userId) => {
        this.fetchUserPerformance(userId, this.selectedFilter)
          .then(() => {
            // Save updated list in localStorage (in case API returns latest)
            localStorage.setItem(
              'selectedUsersPerformance',
              JSON.stringify(this.selectedUsersPerformance)
            );
          })
          .catch((err) => {
            console.error(`Failed to fetch performance for ${userId}`, err);
          });
      });
    }

    if (!this.users || this.users.length === 0) {
      this.fetchAllUsers();
    }

    this.selectedFilter = 'MTD'; // Set default filter
    this.onFilterChange('MTD'); // Trigger logic on load
    this.loadDashboardMetrics('MTD'); // ✅ If this also depends on users

    this.fetchHierarchy();

    this.loadCompareMetrics;

    console.log('✅ DashboardComponent initialized');

    this.sidebarService.isOpen$.subscribe((open) => {
      this.isSidebarOpen = open;
    });

    this.loadTestDriveData();
    this.onFilterOptionChange(); // Apply default filter on load
    this.initializeFilters();

    this.searchText = '';
    this.filteredUsers = []; // start empty
    this.filteredTableTestDrives = this.data.tableTestDrives_today; // Make sure this line exists

    console.log('Loading dashboard metrics with default filter Today');
    this.loadDashboardMetrics('MTD');
    console.log('DashboardComponent loaded');
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const dealerId = user.user_id; // Or 'user_id', if needed

      if (dealerId) {
        this.fetchCounts(dealerId);
      } else {
        console.error('Dealer ID not found in user object');
      }
    } else {
      console.error('User not found in sessionStorage');
    }
  }

  ngAfterViewInit() {
    this.renderHourlyChart();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.selectedUser?.ps_id &&
      this.selectedSmId &&
      !this.callSummaryOrder
    ) {
      this.onDurationSelect('1M');
    }
  }
  // ngOnDestroy() {
  //   this.sidebarSub.unsubscribe();
  // }
  ngOnDestroy() {
    if (this.sidebarSub) {
      this.sidebarSub.unsubscribe();
    }
  }
  get firstRowUsers() {
    return this.filteredUsers.slice(0, 10); // assuming 1st row is first 10 users
  }
  onUserClickForCompare(user: any) {
    this.clickedUser = user;
  }
  selectSection(section: 'home' | 'analysis'): void {
    this.selectedSection = section;
  }
  selectPSUser(user: PsUser) {
    this.selectedPSUser = user;
  }
  getUserTotal(user: PsUser | null, metric: keyof PsUser): number {
    return user ? Number(user[metric]) : 0;
  }

  get currentSummary() {
    return this.activeActivity === 'Enquiry'
      ? this.selectedUser?.summaryEnquiry
      : this.selectedUser?.summaryColdCalls;
  }

  // onActivityClick(activity: string): void {
  //   this.activeActivity = activity;
  // }
  // onActivityClick(activity: string): void {
  //   this.activeActivity = activity;
  //   this.updateCallSummaryOrder();
  // }
  onActivityClick(activity: string): void {
    this.activeActivity = activity;

    this.callSummaryOrder =
      activity === 'cold' ? this.callSummaryCold : this.callSummaryOrderEnquiry;

    this.updateCallSummaryOrder();
  }

  updateCallSummaryOrder(): void {
    const summary = this.callSummaryOrder || {};

    const newSummary = {
      all: {
        calls: summary['All Calls']?.calls || 0,
        duration: summary['All Calls']?.duration || '0h 0m 0s',
        clients: summary['All Calls']?.uniqueClients || 0,
      },
      connected: {
        calls: summary['Connected']?.calls || 0,
        duration: summary['Connected']?.duration || '0h 0m 0s',
        clients: summary['Connected']?.uniqueClients || 0,
      },
      missed: {
        calls: summary['Missed']?.calls || 0,
        duration: summary['Missed']?.duration || '0h 0m 0s',
        clients: summary['Missed']?.uniqueClients || 0,
      },
      rejected: {
        calls: summary['Rejected']?.calls || 0,
        duration: summary['Rejected']?.duration || '0h 0m 0s',
        clients: summary['Rejected']?.uniqueClients || 0,
      },
    };

    if (this.activeActivity === 'cold') {
      this.callSummaryCold = newSummary;
      console.log('✅ Updated Cold Call Summary:', newSummary);
    } else {
      this.callSummaryOrderEnquiry = newSummary;
      console.log('✅ Updated Enquiry Summary:', newSummary);
    }
  }

  // get currentSummary() {
  //   return this.activeActivity === 'ColdCalls' ? this.callSummaryCold : this.callSummaryOrder;
  // }
  onTestDriveClick(status: string): void {
    this.activeTestDriveStatus = status;
  }

  onClick(status: string) {
    this.activeTestDriveStatus = status;
    this.filteredActivities = this.allActivities.filter(
      (activity) => activity.status === status
    );
  }
  // getUserInitials(name: string): string {
  //   if (!name) return '';

  //   const words = name.trim().split(' ');
  //   if (words.length === 1) {
  //     return words[0].substring(0, 2).toUpperCase(); // single word, get first 2 chars
  //   }

  //   return (words[0][0] + words[1][0]).toUpperCase(); // first letters of first and last name
  // }

  // showUsers(team: string) {
  //   if (this.selectedTeam === team) {
  //     this.selectedTeam = null; // toggle off if already selected
  //   } else {
  //     this.selectedTeam = team; // otherwise set the selected team
  //   }
  // }
  // showUsers(teamId: string) {
  //   this.selectedTeamId = this.selectedTeamId === teamId ? null : teamId;
  // }

  // selectUserps(psUser: any): void {
  //   console.log('Selected PS:', psUser);

  //   this.selectedUser = {
  //     fname: psUser.ps_fname,
  //     lname: psUser.ps_lname,
  //     name: psUser.ps_fname + ' ' + psUser.ps_lname, // ✅ Required by your type

  //     upcomingTestDrives: [],
  //     completedTestDrives: [],
  //     overdueTestDrives: [],
  //     summaryEnquiry: {
  //       totalConnected: 0,
  //       conversationTime: '0h 0m 0s',
  //       notConnected: 0,
  //       summary: {},
  //       hourlyAnalysis: {},
  //     },
  //     summaryColdCalls: {
  //       totalConnected: 0,
  //       conversationTime: '0h 0m 0s',
  //       notConnected: 0,
  //       summary: {},
  //       hourlyAnalysis: {},
  //     },
  //   };
  // }

  //   showUsers(teamId: string, smId: string): void {
  // this.selectedTeamId = teamId;

  //     if (this.selectedTeamId) {
  //       this.fetchSMData(smId);
  //     }
  //   }
  // showUsers(teamId: string, smId: string): void {
  //   this.selectedTeamId = teamId;
  //   if (this.selectedTeamId) {
  //     this.fetchSMData(smId);
  //   }
  // }
  // showUsers(teamId: string, smId: string): void {
  //   if (this.selectedTeamId === teamId) {
  //     this.selectedTeamId = null;
  //     this.selectedSmId = null;
  //   } else {
  //     this.selectedTeamId = teamId;
  //     this.selectedSmId = smId;
  //     this.fetchSMData(smId);
  //   }
  // }
  showUsers(teamId: string, smId: string): void {
    if (this.selectedTeamId === teamId) {
      // Collapse if already selected
      this.selectedTeamId = null;
      this.selectedSmId = null;
    } else {
      // Open the clicked team
      this.selectedTeamId = teamId;
      this.selectedSmId = smId;

      // Trigger the selected filter (MTD, QTD, YTD) instead of default 'YTD'
      this.fetchSMData(smId, this.selectedFilter);
    }
  }

  // fetchSMData(smId: string): void {
  //   const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer/home-dashboard/new?sm_id=${smId}&type=YTD`;
  //   const token = sessionStorage.getItem('token');

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   this.http.get<any>(apiUrl, { headers }).subscribe({
  //     next: (res) => {
  //       const updatedSm = res.data.smData[0];

  //       // 🔥 Find the team in your current smData list
  //       const index = this.smData.findIndex(
  //         (team) => team.team_id === updatedSm.team_id
  //       );
  //       if (index !== -1) {
  //         // 🔥 Instead of mutating directly, replace the whole object (trigger change detection)
  //         this.smData[index] = {
  //           ...this.smData[index],
  //           ps_list: updatedSm.ps_list,
  //         };

  //         // 👇 Add console here to confirm
  //         console.log(
  //           'Updated smData after injecting ps_list:',
  //           this.smData[index]
  //         );
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching SM data:', err);
  //     },
  //   });
  // }

  // selectCompareUser(userId: string, smId: string): void {
  //   const token = sessionStorage.getItem('token');
  //   const filterType = this.selectedFilter || 'YTD'; // Or MTD, QTD if dynamic

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer/home-dashboard/new?user_id=${userId}&sm_id=${smId}&type=${filterType}`;

  //   this.http.get<any>(apiUrl, { headers }).subscribe({
  //     next: (res) => {
  //       if (res.status === 200 && res.data?.selectedUser) {
  //         this.selectedUser = res.data.selectedUser;
  //         console.log('Selected User:', this.selectedUser);
  //         // Optional: scroll to view or change layout
  //       } else {
  //         console.warn('No selectedUser data in response:', res);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching selected user:', err);
  //     },
  //   });
  // }

  // getTeamTotal(psList: any[], metric: string): number {
  //   return psList.reduce((sum, ps) => sum + (ps[metric] || 0), 0);
  // }
  // onActivityClick(activity: string): void {
  //   this.activeActivity = activity;
  //   console.log('Selected Activity:', activity);
  // }
  // fetchSMData(smId: string, type: string = 'YTD'): void {
  //   const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer/home-dashboard/new?sm_id=${smId}&type=${type}`;
  //   const token = sessionStorage.getItem('token');

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   this.http.get<any>(apiUrl, { headers }).subscribe({
  //     next: (res) => {
  //       const updatedSm = res.data.smData.find((sm: any) => sm.sm_id === smId);

  //       if (!updatedSm) {
  //         console.warn('No matching SM found in API response for sm_id:', smId);
  //         return;
  //       }

  //       const index = this.smData.findIndex((sm: any) => sm.sm_id === smId);

  //       if (index !== -1) {
  //         this.smData[index] = {
  //           ...this.smData[index],
  //           ps_list: updatedSm.ps_list,
  //         };

  //         console.log('✅ Updated SM with ps_list:', this.smData[index]);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('❌ Error fetching SM data:', err);
  //     },
  //   });
  // }
  fetchSMData(smId: string, type: string = 'YTD'): void {
    const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer/home-dashboard/new?sm_id=${smId}&type=${type}`;
    const token = sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<any>(apiUrl, { headers }).subscribe({
      next: (res) => {
        const updatedSm = res.data.smData.find((sm: any) => sm.sm_id === smId);

        if (!updatedSm) {
          console.warn('No matching SM found in API response for sm_id:', smId);
          return;
        }

        const index = this.smData.findIndex((sm: any) => sm.sm_id === smId);

        if (index !== -1) {
          // Update ALL properties, not just ps_list
          this.smData[index] = {
            ...this.smData[index],
            enquiries: updatedSm.enquiries,
            testDrives: updatedSm.testDrives,
            orders: updatedSm.orders,
            cancellations: updatedSm.cancellations,
            net_orders: updatedSm.net_orders,
            retail: updatedSm.retail,
            ps_list: updatedSm.ps_list,
          };
          // this.totalItems = this.smData.length;

          // if (this.selectedTeamId === updatedSm.team_id) {
          //   this.selectedUsersPerformance = updatedSm.ps_list || [];
          //   this.totalItems = this.selectedUsersPerformance.length;
          //   this.currentPageforCompare = 1; // Reset to first page
          // }

          console.log('✅ Updated SM with all data:', this.smData[index]);
        }
      },
      error: (err) => {
        console.error('❌ Error fetching SM data:', err);
      },
    });
  }
  isUserInTable(userId: string): boolean {
    return this.selectedUsersPerformance.some((u) => u.userId === userId);
  }
  get totalItems(): number {
    return this.smData?.length || 0;
  }
  goToPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // selectCompareUser(userId: string, smId: string): void {
  //   console.log('📌 selectCompareUser called with:', { userId, smId });

  //   if (!userId || !smId) {
  //     console.warn('User ID or SM ID is missing', { userId, smId });
  //     return;
  //   }

  //   const token = sessionStorage.getItem('token');
  //   const filterType = this.selectedFilter || 'YTD';

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer/home-dashboard/new?user_id=${userId}&sm_id=${smId}&type=${filterType}`;

  //   this.http.get<any>(apiUrl, { headers }).subscribe({
  //     next: (res) => {
  //       if (res.status === 200 && res.data) {
  //         const userData = res.data;

  //         this.selectedUser = {
  //           ps_id: userId, // <-- this was missing

  //           fname: userData.selectedUser?.fname || '',
  //           lname: userData.selectedUser?.lname || '',
  //           upcomingTestDrives: userData.selectedUser?.upcomingTestDrives || [],
  //           completedTestDrives:
  //             userData.selectedUser?.completedTestDrives || [],
  //           overdueTestDrives: userData.selectedUser?.overdueTestDrives || [],
  //           summaryEnquiry: userData.selectedUser?.summaryEnquiry || {},
  //           summaryColdCalls: userData.selectedUser?.summaryColdCalls || {},
  //         };

  //         this.compareSmData = userData.smData;
  //         console.log('✅ Selected User:', this.selectedUser);
  //         console.log('✅ Compare SM Data:', this.compareSmData);
  //       } else {
  //         console.warn('⚠️ Incomplete response:', res);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('❌ Error fetching selected user:', err);
  //     },
  //   });
  // }

  // getTeamTotal(psList: any[], key: string): number {
  //   if (!psList || psList.length === 0) return 0;

  //   return psList.reduce((total, user) => {
  //     const value = Number(user[key]) || 0;
  //     return total + value;
  //   }, 0);
  // }
  // selectCompareUser(userId: string, smId: string): void {
  //   console.log('📌 selectCompareUser called with:', { userId, smId });

  //   if (!userId || !smId) {
  //     console.warn('User ID or SM ID is missing', { userId, smId });
  //     return;
  //   }

  //   this.selectedDuration = '1M'; // default for right box
  //   this.selectedFilter = 'MTD'; // default for chart

  //   const token = sessionStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer/home-dashboard/new?user_id=${userId}&sm_id=${smId}&type=${this.selectedFilter}`;

  //   this.http.get<any>(apiUrl, { headers }).subscribe({
  //     next: (res) => {
  //       if (res.status === 200 && res.data) {
  //         const userData = res.data;

  //         const summaryEnquiry = userData.selectedUser?.summaryEnquiry || {};
  //         const enquirySummaryRaw = summaryEnquiry.summary || {};
  //         const hourlyAnalysisData = summaryEnquiry.hourlyAnalysis || {};

  //         // ✅ Assign selected user data
  //         this.selectedUser = {
  //           ps_id: userId,
  //           fname: userData.selectedUser?.fname || '',
  //           lname: userData.selectedUser?.lname || '',
  //           upcomingTestDrives: userData.selectedUser?.upcomingTestDrives || [],
  //           completedTestDrives:
  //             userData.selectedUser?.completedTestDrives || [],
  //           overdueTestDrives: userData.selectedUser?.overdueTestDrives || [],
  //           summaryEnquiry,
  //           summaryColdCalls: userData.selectedUser?.summaryColdCalls || {},
  //         };

  //         this.compareSmData = userData.smData;

  //         // ✅ Set callSummaryOrder for right-side box
  //         this.callSummaryOrder = {
  //           all: {
  //             calls: enquirySummaryRaw['All Calls']?.calls || 0,
  //             duration: enquirySummaryRaw['All Calls']?.duration || '0h 0m 0s',
  //             clients: enquirySummaryRaw['All Calls']?.uniqueClients || 0,
  //           },
  //           connected: {
  //             calls: enquirySummaryRaw['Connected']?.calls || 0,
  //             duration: enquirySummaryRaw['Connected']?.duration || '0h 0m 0s',
  //             clients: enquirySummaryRaw['Connected']?.uniqueClients || 0,
  //           },
  //           missed: {
  //             calls: enquirySummaryRaw['Missed']?.calls || 0,
  //             duration: enquirySummaryRaw['Missed']?.duration || '0h 0m 0s',
  //             clients: enquirySummaryRaw['Missed']?.uniqueClients || 0,
  //           },
  //           rejected: {
  //             calls: enquirySummaryRaw['Rejected']?.calls || 0,
  //             duration: enquirySummaryRaw['Rejected']?.duration || '0h 0m 0s',
  //             clients: enquirySummaryRaw['Rejected']?.uniqueClients || 0,
  //           },
  //         };

  //         // ✅ Prepare chart for weekly (MTD) format
  //         // ✅ Prepare chart for weekly (MTD) format
  //         this.hourlyChartLabels = Object.keys(hourlyAnalysisData);

  //         this.hourlyAllCalls = this.hourlyChartLabels.map(
  //           (key) => hourlyAnalysisData[key]?.AllCalls?.calls || 0
  //         );

  //         this.hourlyConnectedCalls = this.hourlyChartLabels.map(
  //           (key) => hourlyAnalysisData[key]?.Connected?.calls || 0
  //         );

  //         this.hourlyMissedCalls = this.hourlyChartLabels.map(
  //           (key) => hourlyAnalysisData[key]?.missedCalls || 0
  //         );

  //         // ✅ First detect DOM updates for *ngIf-bound canvas
  //         this.cdr.detectChanges();

  //         // ✅ Then render the chart
  //         this.renderHourlyChart();

  //         console.log('✅ Selected User:', this.selectedUser);
  //         console.log('📞 Call Summary Order:', this.callSummaryOrder);
  //         console.log('📊 Chart Labels:', this.hourlyChartLabels);
  //       } else {
  //         console.warn('⚠️ Incomplete response:', res);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('❌ Error fetching selected user:', err);
  //     },
  //   });
  // }
  // selectCompareUser(userId: string, smId: string): void {
  //   console.log('📌 selectCompareUser called with:', { userId, smId });

  //   if (!userId || !smId) {
  //     console.warn('User ID or SM ID is missing', { userId, smId });
  //     return;
  //   }

  //   this.selectedDuration = '1M'; // default for right box
  //   // this.selectedFilter = 'MTD'; // default for chart

  //   const token = sessionStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer/home-dashboard/new?user_id=${userId}&sm_id=${smId}&type=${this.selectedFilter}`;

  //   this.http.get<any>(apiUrl, { headers }).subscribe({
  //     next: (res) => {
  //       if (res.status === 200 && res.data) {
  //         const userData = res.data;

  //         // ✅ Add this block here to extract stats from ps_list
  //         let matchedUserStats: any = {};
  //         for (const sm of userData.smData || []) {
  //           const ps = sm.ps_list?.find((p: any) => p.ps_id === userId);
  //           if (ps) {
  //             matchedUserStats = ps;
  //             break;
  //           }
  //         }

  //         const summaryEnquiry = userData.selectedUser?.summaryEnquiry || {};
  //         const enquirySummaryRaw = summaryEnquiry.summary || {};
  //         const hourlyAnalysisData = summaryEnquiry.hourlyAnalysis || {};

  //         this.selectedUser = {
  //           ps_id: userId,
  //           fname: userData.selectedUser?.fname || '',
  //           lname: userData.selectedUser?.lname || '',
  //           upcomingTestDrives: userData.selectedUser?.upcomingTestDrives || [],
  //           completedTestDrives:
  //             userData.selectedUser?.completedTestDrives || [],
  //           overdueTestDrives: userData.selectedUser?.overdueTestDrives || [],
  //           summaryEnquiry,
  //           summaryColdCalls: userData.selectedUser?.summaryColdCalls || {},

  //           performance: userData.selectedUser?.performance || {},

  //           // ✅ Add the metrics from matchedUserStats
  //           enquiries: matchedUserStats?.enquiries || 0,
  //           testDrives: matchedUserStats?.testDrives || 0,
  //           orders: matchedUserStats?.orders || 0,
  //           cancellation: matchedUserStats?.cancellation || 0,
  //           net_orders: matchedUserStats?.net_orders || 0,
  //           retail: matchedUserStats?.retail || 0,
  //         };

  //         this.compareSmData = userData.smData;

  //         this.callSummaryOrder = {
  //           all: {
  //             calls: enquirySummaryRaw['All Calls']?.calls || 0,
  //             duration: enquirySummaryRaw['All Calls']?.duration || '0h 0m 0s',
  //             clients: enquirySummaryRaw['All Calls']?.uniqueClients || 0,
  //           },
  //           connected: {
  //             calls: enquirySummaryRaw['Connected']?.calls || 0,
  //             duration: enquirySummaryRaw['Connected']?.duration || '0h 0m 0s',
  //             clients: enquirySummaryRaw['Connected']?.uniqueClients || 0,
  //           },
  //           missed: {
  //             calls: enquirySummaryRaw['Missed']?.calls || 0,
  //             duration: enquirySummaryRaw['Missed']?.duration || '0h 0m 0s',
  //             clients: enquirySummaryRaw['Missed']?.uniqueClients || 0,
  //           },
  //           rejected: {
  //             calls: enquirySummaryRaw['Rejected']?.calls || 0,
  //             duration: enquirySummaryRaw['Rejected']?.duration || '0h 0m 0s',
  //             clients: enquirySummaryRaw['Rejected']?.uniqueClients || 0,
  //           },
  //         };

  //         this.hourlyChartLabels = Object.keys(hourlyAnalysisData);
  //         this.hourlyAllCalls = this.hourlyChartLabels.map(
  //           (key) => hourlyAnalysisData[key]?.AllCalls?.calls || 0
  //         );
  //         this.hourlyConnectedCalls = this.hourlyChartLabels.map(
  //           (key) => hourlyAnalysisData[key]?.Connected?.calls || 0
  //         );
  //         this.hourlyMissedCalls = this.hourlyChartLabels.map(
  //           (key) => hourlyAnalysisData[key]?.missedCalls || 0
  //         );

  //         this.cdr.detectChanges();
  //         this.renderHourlyChart();

  //         console.log('✅ Selected User:', this.selectedUser);
  //         console.log('📞 Call Summary Order:', this.callSummaryOrder);
  //         console.log('📊 Chart Labels:', this.hourlyChartLabels);
  //       } else {
  //         console.warn('⚠️ Incomplete response:', res);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('❌ Error fetching selected user:', err);
  //     },
  //   });
  // }
  get callSummaryToDisplay() {
    return this.selectedFilter === 'Cold Calls'
      ? this.callSummaryCold
      : this.callSummaryOrder;
  }

  selectCompareUser(userId: string, smId: string): void {
    console.log('📌 selectCompareUser called with:', { userId, smId });

    if (!userId || !smId) {
      console.warn('User ID or SM ID is missing', { userId, smId });
      return;
    }

    this.selectedDuration = '1M';

    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer/home-dashboard/new?user_id=${userId}&sm_id=${smId}&type=${this.selectedFilter}`;

    this.http.get<any>(apiUrl, { headers }).subscribe({
      next: (res) => {
        if (res.status === 200 && res.data) {
          const userData = res.data;

          // Match ps_id in smData.ps_list
          let matchedUserStats: any = {};
          for (const sm of userData.smData || []) {
            const ps = sm.ps_list?.find((p: any) => p.ps_id === userId);
            if (ps) {
              matchedUserStats = ps;
              break;
            }
          }

          const summaryEnquiry = userData.selectedUser?.summaryEnquiry || {};
          const enquirySummaryRaw = summaryEnquiry.summary || {};
          const hourlyAnalysisData = summaryEnquiry.hourlyAnalysis || {};

          const summaryColdCalls =
            userData.selectedUser?.summaryColdCalls || {};
          const coldCallSummaryRaw = summaryColdCalls.summary || {};
          const coldHourlyAnalysis = summaryColdCalls.hourlyAnalysis || {};

          this.selectedUser = {
            ps_id: userId,
            fname: userData.selectedUser?.fname || '',
            lname: userData.selectedUser?.lname || '',
            upcomingTestDrives: userData.selectedUser?.upcomingTestDrives || [],
            completedTestDrives:
              userData.selectedUser?.completedTestDrives || [],
            overdueTestDrives: userData.selectedUser?.overdueTestDrives || [],
            summaryEnquiry,
            summaryColdCalls,
            performance: userData.selectedUser?.performance || {},

            enquiries: matchedUserStats?.enquiries || 0,
            testDrives: matchedUserStats?.testDrives || 0,
            orders: matchedUserStats?.orders || 0,
            cancellation: matchedUserStats?.cancellation || 0,
            net_orders: matchedUserStats?.net_orders || 0,
            retail: matchedUserStats?.retail || 0,
          };

          this.compareSmData = userData.smData;

          // 🔷 Cold Call Summary
          this.callSummaryCold = {
            all: {
              calls: coldCallSummaryRaw['All Calls']?.calls || 0,
              duration: coldCallSummaryRaw['All Calls']?.duration || '0h 0m 0s',
              clients: coldCallSummaryRaw['All Calls']?.uniqueClients || 0,
            },
            connected: {
              calls: coldCallSummaryRaw['Connected']?.calls || 0,
              duration: coldCallSummaryRaw['Connected']?.duration || '0h 0m 0s',
              clients: coldCallSummaryRaw['Connected']?.uniqueClients || 0,
            },
            missed: {
              calls: coldCallSummaryRaw['Missed']?.calls || 0,
              duration: coldCallSummaryRaw['Missed']?.duration || '0h 0m 0s',
              clients: coldCallSummaryRaw['Missed']?.uniqueClients || 0,
            },
            rejected: {
              calls: coldCallSummaryRaw['Rejected']?.calls || 0,
              duration: coldCallSummaryRaw['Rejected']?.duration || '0h 0m 0s',
              clients: coldCallSummaryRaw['Rejected']?.uniqueClients || 0,
            },
          };
          console.log(
            '✅ Assigned callSummaryColddddddddddddd:',
            this.callSummaryCold
          );

          // 🔷 Enquiry Summary
          this.callSummaryOrderEnquiry = {
            all: {
              calls: enquirySummaryRaw['All Calls']?.calls || 0,
              duration: enquirySummaryRaw['All Calls']?.duration || '0h 0m 0s',
              clients: enquirySummaryRaw['All Calls']?.uniqueClients || 0,
            },
            connected: {
              calls: enquirySummaryRaw['Connected']?.calls || 0,
              duration: enquirySummaryRaw['Connected']?.duration || '0h 0m 0s',
              clients: enquirySummaryRaw['Connected']?.uniqueClients || 0,
            },
            missed: {
              calls: enquirySummaryRaw['Missed']?.calls || 0,
              duration: enquirySummaryRaw['Missed']?.duration || '0h 0m 0s',
              clients: enquirySummaryRaw['Missed']?.uniqueClients || 0,
            },
            rejected: {
              calls: enquirySummaryRaw['Rejected']?.calls || 0,
              duration: enquirySummaryRaw['Rejected']?.duration || '0h 0m 0s',
              clients: enquirySummaryRaw['Rejected']?.uniqueClients || 0,
            },
          };

          // ✅ MAIN FIX: Update the actual variable bound to the UI
          this.callSummaryOrder =
            this.activeActivity === 'cold'
              ? this.callSummaryCold
              : this.callSummaryOrderEnquiry;

          // 🔷 Enquiry Hourly Chart
          this.hourlyChartLabels = Object.keys(hourlyAnalysisData);
          this.hourlyAllCalls = this.hourlyChartLabels.map(
            (key) => hourlyAnalysisData[key]?.AllCalls?.calls || 0
          );
          this.hourlyConnectedCalls = this.hourlyChartLabels.map(
            (key) => hourlyAnalysisData[key]?.Connected?.calls || 0
          );
          this.hourlyMissedCalls = this.hourlyChartLabels.map(
            (key) => hourlyAnalysisData[key]?.missedCalls || 0
          );

          // 🔷 Cold Call Hourly Chart
          this.hourlyChartLabelsCold = Object.keys(coldHourlyAnalysis);
          this.hourlyAllColdCalls = this.hourlyChartLabelsCold.map(
            (key) => coldHourlyAnalysis[key]?.AllCalls?.calls || 0
          );
          this.hourlyConnectedColdCalls = this.hourlyChartLabelsCold.map(
            (key) => coldHourlyAnalysis[key]?.Connected?.calls || 0
          );
          this.hourlyMissedColdCalls = this.hourlyChartLabelsCold.map(
            (key) => coldHourlyAnalysis[key]?.missedCalls || 0
          );

          this.cdr.detectChanges();
          this.renderHourlyChart();

          console.log('✅ Selected User:', this.selectedUser);
          console.log('📞 Enquiry Summary:', this.callSummaryOrderEnquiry);
          console.log('📞 Cold Call Summary:', this.callSummaryCold);
          console.log('📊 Enquiry Labels:', this.hourlyChartLabels);
          console.log('📊 Cold Call Labels:', this.hourlyChartLabelsCold);

          this.updateCallSummaryOrder(); // ✅ Ensure table re-renders if needed
        } else {
          console.warn('⚠️ Incomplete response:', res);
        }
      },
      error: (err) => {
        console.error('❌ Error fetching selected user:', err);
      },
    });
  }

  getTeamTotal(psList: any[], key: string): number {
    if (!psList || psList.length === 0) return 0;

    console.log('Key:', key);
    console.log('psList sample:', psList[0]); // Check the first item

    return psList.reduce((total, user) => {
      const value = Number(user[key]) || 0;
      return total + value;
    }, 0);
  }
  // getUserTotal(user: any, key: string): number {
  //   if (!user) return 0;
  //   return this.getTeamTotal([user], key); // Reuse getTeamTotal logic
  // }
  // toggleDropdown() {
  //   this.dropdownOpen = !this.dropdownOpen;
  // }
  // toggleDropdown() {
  //   this.dropdownOpen = !this.dropdownOpen;
  //   if (this.dropdownOpen && this.users.length === 0) {
  //     this.fetchAllUsers();
  //   }
  // }
  toggleDropdown() {
    if (this.users.length === 0) {
      this.isLoadingUsers = true;
      this.fetchAllUsers();
    } else {
      this.dropdownOpen = !this.dropdownOpen;
    }
  }
  getColor(index: number): { background: string; text: string } {
    const colorPairs = [
      { background: '#E2E0F5', text: '#4B3C9B' }, // Lavender bg, dark purple
      { background: '#C4FEFB', text: '#007A78' }, // Aqua bg, teal
      { background: '#FED1CF', text: '#C9302C' }, // Light red bg, deep red
      { background: '#E3FFDF', text: '#3E8E41' }, // Light green bg, green
      { background: '#CFDFFE', text: '#2C4DB2' }, // Blue bg, navy
      { background: '#FFEDFE', text: '#AF4C96' }, // Peach bg, deep pink
      { background: '#EAD1DC', text: '#9C2550' }, // Pink bg, magenta
      { background: '#FFF2CC', text: '#B58900' }, // Yellow bg, gold
      { background: '#D9EAD3', text: '#3B7A2A' }, // Mint green, green
      { background: '#F4CCCC', text: '#990000' }, // Coral bg, dark red
      { background: '#F3F3F3', text: '#4D4D4D' }, // Grey bg, dark grey
      { background: '#FFE6F0', text: '#C2185B' }, // Rose bg, berry pink
    ];

    return colorPairs[index % colorPairs.length];
  }

  getSelectedUserName(): string {
    const selected = this.users.find(
      (user) => user.user_id === this.selectedUserId
    );
    return selected ? selected.name : '';
  }
  formatUserName(name: string): string {
    return name.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
  // onUserSelect(userId: number): void {
  //   if (!this.selectedUserIds.includes(userId)) {
  //     this.selectedUserIds.push(userId);
  //   }
  // }
  // onUserSelect(userId: number): void {
  //   const userIdStr = userId.toString(); // or `${userId}`

  //   if (!this.selectedUserIds.includes(userIdStr)) {
  //     this.selectedUserIds.push(userIdStr);
  //   }
  // }

  onUserSelect(userId: number): void {
    const userIdStr = userId.toString();

    // Add to selectedUserIds only if not already added
    if (!this.selectedUserIds.includes(userIdStr)) {
      this.selectedUserIds.push(userIdStr);
    }

    // ⬇️ Set selectedUser and fetch data for the right box
    const selected = this.allUsers.find((user) => user.ps_id === userIdStr);
    if (selected) {
      this.selectedUser = selected;
      this.fetchSelectedUserData(); // 👈 This ensures right box data loads
    } else {
      console.warn('User not found in allUsers for ID:', userIdStr);
    }
  }

  getColorForUser(name: string): string {
    const colors = [
      '#bfdcfc',

      '#6A994E',
      '#26EEE4',
      '#F0D096',
      '#B9A5FF',
      '#E3FFDF',
      '#C59CFF',
      '#9CED97',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

  selectDealer(user: any) {
    this.selectedUserId = user.user_id;
    this.dropdownOpen = false;
  }

  isSelected(team: string): boolean {
    return this.selectedTeam === team;
  }

  //   selectname(user: SelectedUser) {
  //   this.selectedUser = user;
  // }

  selectname(user: any) {
    this.selectedUser = user;
    console.log('Selected User:', this.selectedUser); // ✅ Debug check
  }

  backToDashboard() {
    this.selectedUser = null;
  }
  getUserInitials(name: string): string {
    if (!name) return '';
    return name.trim().charAt(0).toUpperCase();
  }
  // Get unique initials from all users
  getUniqueInitials(): string[] {
    const initials = this.allUsers.map((user) =>
      this.getUserInitials(user.name)
    );
    return [...new Set(initials)];
  }
  // selectFilter(filter: string): void {
  //   this.selectedFilter = filter;
  // }

  selectCategory(category: string): void {
    this.categoryName = category;
  }
  generateInitialsList() {
    const initialsSet = new Set<string>();
    this.displayedUsers.forEach((user) => {
      const initial = this.getUserInitials(user.name);
      if (initial) {
        initialsSet.add(initial.toUpperCase());
      }
    });
    this.initialsList = Array.from(initialsSet).sort();
  }

  groupUsersByInitial() {
    this.groupedUsers = {};
    this.allUsers.forEach((user) => {
      const initial = user.name?.charAt(0)?.toUpperCase() || '';
      if (!this.groupedUsers[initial]) {
        this.groupedUsers[initial] = [];
      }
      this.groupedUsers[initial].push(user);
    });
  }

  // This function triggers on initial click
  // filterByInitial(initial: string): void {
  //   if (this.selectedInitial === initial) {
  //     // Re-clicked same letter → clear selection & hide user list
  //     this.selectedInitial = null;
  //     this.filteredUsers = [];
  //     console.log('🚫 Filter cleared. User list hidden.');
  //   } else {
  //     // New initial selected → apply filter
  //     this.selectedInitial = initial;
  //     this.filteredUsers = this.displayedUsers.filter((user) =>
  //       user.name?.toLowerCase().startsWith(initial.toLowerCase())
  //     );
  //     console.log(`🔍 Showing users with: ${initial}`);
  //   }
  //   this.applyTableFilters();
  // }
  // filterByInitial(initial: string): void {
  //   if (this.selectedInitial === initial) {
  //     this.selectedInitial = null;
  //   } else {
  //     this.selectedInitial = initial;
  //   }
  //   this.applyTableFilters();
  // }

  updatePagination(): void {
    this.totalPages = Math.ceil(
      this.filteredTableTestDrives.length / this.itemsPerPage
    );
  }

  filterByInitial(initial: string) {
    if (this.selectedInitial === initial) {
      // If clicking the same initial again, toggle off
      this.selectedInitial = '';
      this.filteredUsers = [];
      this.selectedColor = '';
    } else {
      // Normal filtering
      this.selectedInitial = initial;

      const index = this.initialsList.indexOf(initial);
      this.selectedColor = this.avatarColors[index % this.avatarColors.length];

      this.filteredUsers = this.allUsers.filter(
        (user) => user.name && user.name.charAt(0).toUpperCase() === initial
      );
    }
  }

  clearInitialFilter(): void {
    this.filteredUsers = [...this.displayedUsers]; // Reset to all users
  }

  // openUserModal(user: any): void {
  //   this.selectedUser = user;
  //   this.showUserModal = true;
  // }
  openUserModal(user: any): void {
    console.log('Clicked user:', user?.id);

    // 👉 Make second API call first
    this.http
      .get(
        `https://uat.smartassistapp.in/api/dealer/dealer/home/dashboard?user_id=${user.id}`
      )
      .subscribe((response: any) => {
        const data = response.selectedUser || {};

        this.todayTestDrives = data.todayTestDrives || [];
        this.upcomingTestDrives = data.upcomingTestDrives || [];
        this.overdueTestDrives = data.overdueTestDrives || [];

        console.log('✅ Today:', this.todayTestDrives);
        console.log('✅ Upcoming:', this.upcomingTestDrives);
        console.log('✅ Overdue:', this.overdueTestDrives);

        this.selectedUser = user;
        this.showUserModal = true;
      });
  }

  closeModal(): void {
    this.showUserModal = false;
  }
  resetFilter() {
    this.displayedUsers = [...this.allUsers];
    this.selectedInitial = '';
  }

  // toggleShowItems() {
  //   if (this.showingLimit >= this.filteredUsers.length) {
  //     this.showingLimit = this.defaultLimit;
  //   } else {
  //     this.showingLimit += 10;
  //     if (this.showingLimit > this.filteredUsers.length) {
  //       this.showingLimit = this.filteredUsers.length;
  //     }
  //   }
  // }

  toggleShowItems() {
    console.log('Clicked show more/less');
    console.log(
      'Before:',
      this.showingLimit,
      'Total:',
      this.initialsList.length
    );
    if (this.showingLimit >= this.initialsList.length) {
      this.showingLimit = this.defaultLimit;
    } else {
      this.showingLimit += this.defaultLimit;
    }
    console.log('After:', this.showingLimit);
  }

  fetchUsers(): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found in sessionStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any>(
        'https://uat.smartassistapp.in/api/dealer/dealer/home/dashboard',
        { headers }
      )
      .subscribe({ 
        next: (res) => {
          console.log('API response:', res);
          this.allUsers = res.data?.user || [];

          this.displayedUsers = [...this.allUsers]; // (optional if used elsewhere)
          this.generateInitialsList(); // ✅ Generate initials after data is loaded
        },
        error: (err) => {
          console.error('Failed to fetch users:', err);
        },
      });
  }

  // get displayedUsers() {
  //   if (this.showMore) {
  //     return this.users;
  //   }
  //   return this.users.slice(0, 10); // Show only first 10 users initially
  // }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  getInitial(name: string): string {
    return name?.trim().charAt(0).toUpperCase() || '?';
  }

  showMoreUsers(): void {
    const nextChunk = 15; // Number of users to load each time
    if (this.visibleUserCount + nextChunk <= this.paginatedUsers.length) {
      this.visibleUserCount += nextChunk;
    } else {
      this.visibleUserCount = this.paginatedUsers.length;
    }
  }

  // get paginatedUsersPerformance() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   return this.selectedUsersPerformance.slice(startIndex, endIndex);
  // }

  // get totalPagesforCompare() {
  //   return Math.ceil(this.selectedUsersPerformance.length / this.itemsPerPage);
  // }

  // get paginatedUsersPerformance() {
  //   const startIndex =
  //     (this.currentPageforCompare - 1) * this.itemsPerPageforCompare;
  //   const endIndex = startIndex + this.itemsPerPageforCompare;
  //   return this.selectedUsersPerformance.slice(startIndex, endIndex);
  // }

  // get totalPagesForCompare(): number {
  //   return Math.ceil(
  //     this.selectedUsersPerformance.length / this.itemsPerPageforCompare
  //   );
  // }

  get totalPagesForCompare(): number {
    if (this.selectedUsersPerformance.length === 0) {
      return 1; // Return 1 so that currentPageforCompare (1) === totalPagesForCompare (1)
    }
    return Math.ceil(
      this.selectedUsersPerformance.length / this.itemsPerPageforCompare
    );
  }

  // get visiblePagesForCompare(): number[] {
  //   const pages: number[] = [];
  //   for (let i = 1; i <= this.totalPagesForCompare; i++) {
  //     pages.push(i);
  //   }
  //   return pages;
  // }
  get visiblePagesForCompare(): number[] {
    // Don't show any page numbers when there's no data
    if (this.selectedUsersPerformance.length === 0) {
      return [];
    }

    const pages: number[] = [];
    for (let i = 1; i <= this.totalPagesForCompare; i++) {
      pages.push(i);
    }
    return pages;
  }

  changeComparePage(page: number): void {
    if (page >= 1 && page <= this.totalPagesForCompare) {
      this.currentPageforCompare = page;
    }
  }
  // get totalPagesForCompare(): number {
  //   return Math.ceil(this.selectedUsersPerformance.length / 10);
  // }
  // get visiblePagesForCompare(): number[] {
  //   const total = this.totalPagesForCompare;
  //   const current = this.currentPageforCompare;
  //   const visible: number[] = [];

  //   let start = current - 1;
  //   let end = current + 1;

  //   if (start < 1) {
  //     start = 1;
  //     end = Math.min(3, total);
  //   }

  //   if (end > total) {
  //     end = total;
  //     start = Math.max(1, total - 2);
  //   }

  //   for (let i = start; i <= end; i++) {
  //     visible.push(i);
  //   }

  //   return visible;
  // }
  // changeComparePage(page: number): void {
  //   if (page < 1 || page > this.totalPagesForCompare) return;
  //   this.currentPageforCompare = page;
  // }

  // get comparePaginatedUsers() {
  //   const start = (this.currentPageforCompare - 1) * this.itemsPerPage;
  //   const end = start + this.itemsPerPage;
  //   return this.selectedUsersPerformance.slice(start, end);
  // }

  // get displayedUsers(): any[] {
  //   return this._displayedUsers;
  // }

  // showUserDetails(userId: string, name: string) {
  //   console.log('Clicked user:', userId);
  //   this.selectedUserId = userId;

  //   const token = sessionStorage.getItem('token');
  //   if (!token) {
  //     console.error('No auth token found');
  //     return;
  //   }

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   this.http
  //     .get<ApiResponse>(
  //       `https://uat.smartassistapp.in/api/dealer/dealer/home/dashboard?user_id=${userId}`,
  //       { headers }
  //     )
  //     .subscribe({
  //       next: (res) => {
  //         const selectedUserFromApi = res?.data?.selectedUser || null;

  //         if (selectedUserFromApi) {
  //           this.selectedUser = { ...selectedUserFromApi, name };

  //           // Use test drives directly from API
  //           this.todayTestDrives = selectedUserFromApi.todayTestDrives || [];
  //           this.upcomingTestDrives =
  //             selectedUserFromApi.upcomingTestDrives || [];
  //           this.overdueTestDrives =
  //             selectedUserFromApi.overdueTestDrives || [];
  //             this.selectedTodayIndex = 0;
  //             this.selectedUpcomingIndex = 0;
  //             this.selectedOverdueIndex = 0;

  //           this.selectedUserData = [
  //             ...this.todayTestDrives,
  //             ...this.upcomingTestDrives,
  //             ...this.overdueTestDrives,
  //           ];
  //           this.showUserModal = true;
  //         } else {
  //           this.selectedUser = null;
  //           this.todayTestDrives = [];
  //           this.upcomingTestDrives = [];
  //           this.overdueTestDrives = [];
  //           this.selectedUserData = [];
  //         }

  //         this.fullData = res.data;
  //         this.loadFilteredTestDrives(this.filterOption);

  //         // Remove or comment this if it overwrites test drive data
  //         // this.loadTestDrives(res.data);
  //       },
  //       error: (err) => {
  //         console.error('Failed to fetch user details', err);
  //       },
  //     });
  // }
  getSmDataByTeamId(teamId: string): any {
    return this.smData.find((sm) => sm.team_id === teamId);
  }

  // PLS REFER TO THIS AFTERQWADS MADHU PLS
  // showUserDetails(userId: string, name: string) {
  //   console.log('🔍 Clicked user:', userId);
  //   this.selectedUserId = userId;

  //   const token = sessionStorage.getItem('token');
  //   if (!token) {
  //     console.error('❌ No auth token found');
  //     return;
  //   }

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   this.http
  //     .get<ApiResponse>(
  //       `https://uat.smartassistapp.in/api/dealer/dealer/home/dashboard?user_id=${userId}`,
  //       { headers }
  //     )
  //     .subscribe({
  //       next: (res) => {
  //         const selectedUserFromApi = res?.data?.selectedUser || null;

  //         console.log('📦 Full API Response:', res);

  //         if (selectedUserFromApi) {
  //           this.selectedUser = { ...selectedUserFromApi, name };

  //           this.todayTestDrives = selectedUserFromApi.todayTestDrives || [];
  //           this.upcomingTestDrives =
  //             selectedUserFromApi.upcomingTestDrives || [];
  //           this.overdueTestDrives =
  //             selectedUserFromApi.overdueTestDrives || [];

  //           this.selectedTodayIndex = this.todayTestDrives.length > 0 ? 0 : -1;
  //           this.selectedUpcomingIndex =
  //             this.upcomingTestDrives.length > 0 ? 0 : -1;
  //           this.selectedOverdueIndex =
  //             this.overdueTestDrives.length > 0 ? 0 : -1;

  //           console.log('✅ Today Test Drives:', this.todayTestDrives);
  //           console.log('✅ Upcoming Test Drives:', this.upcomingTestDrives);
  //           console.log('✅ Overdue Test Drives:', this.overdueTestDrives);

  //           // Log individual subject to check if it exists
  //           console.log(
  //             '🔍 First Today Subject:',
  //             this.todayTestDrives?.[0]?.subject
  //           );
  //           console.log(
  //             '🔍 First Upcoming Subject:',
  //             this.upcomingTestDrives?.[0]?.subject
  //           );
  //           console.log(
  //             '🔍 First Overdue Subject:',
  //             this.overdueTestDrives?.[0]?.subject
  //           );

  //           this.selectedUserData = [
  //             ...this.todayTestDrives,
  //             ...this.upcomingTestDrives,
  //             ...this.overdueTestDrives,
  //           ];
  //           this.showUserModal = true;
  //         } else {
  //           console.warn('⚠️ selectedUserFromApi is null');
  //           this.selectedUser = null;
  //           this.todayTestDrives = [];
  //           this.upcomingTestDrives = [];
  //           this.overdueTestDrives = [];
  //           this.selectedUserData = [];
  //         }

  //         this.fullData = res.data;
  //         this.loadFilteredTestDrives(this.filterOption);
  //       },
  //       error: (err) => {
  //         console.error('❌ Failed to fetch user details', err);
  //       },
  //     });
  // }

  // fetchUsersFromAPI() {
  //   const token = sessionStorage.getItem('token');
  //   if (!token) {
  //     console.warn('No token found in sessionStorage');
  //     return;
  //   }

  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const url =
  //     'https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?type=MTD';

  //   this.http.get<any>(url, { headers }).subscribe({
  //     next: (res) => {
  //       console.log('API response:', res);

  //       if (Array.isArray(res?.data?.users) && res.data.users.length > 0) {
  //         this.users = res.data.users.map((user: any) => {
  //           const nameParts = user.name?.split(' ') || [];
  //           return {
  //             user_id: user.user_id,
  //             name: user.name,
  //             dealer_id: user.dealer_id,
  //             fname: nameParts[0] || user.name,
  //             lname: nameParts.slice(1).join(' ') || '',
  //           };
  //         });

  //         console.log('Mapped users:', this.users);
  //       } else {
  //         console.warn('No users found');
  //         this.users = [];
  //       }
  //     },
  //     error: (err) => {
  //       console.error('API error:', err);
  //     },
  //   });
  // }
  // selectUser(userId: string) {
  //   this.selectedPs1 = userId;
  //   console.log('Selected User ID on selectUser:', userId);
  //   this.fetchCounts(userId);
  //   this.dropdownOpen = false;
  // }
  // onFilterClick(filter: string) {
  //   this.activeFilter = filter;
  //   console.log('Selected filter:', this.activeFilter);

  //   if (this.selectedPs1) {
  //     this.fetchFilteredData(this.selectedPs1, this.activeFilter);
  //   }
  // }

  // Function to handle user (PS1) selection
  // Inside your component
  // selectUser(userId: string) {
  //   if (this.selectedPs2.includes(userId)) {
  //     console.warn('❌ User already selected in PS2, not assigning to PS1');
  //     return;
  //   }

  //   this.selectedPs1 = userId;
  //   this.dropdownOpen1 = false;

  //   if (this.activeFilter) {
  //     this.fetchPs1Data(userId, this.activeFilter); // ✅ PS1-specific method
  //   }
  // }
  // selectUser(userId: string) {
  //   if (this.selectedUsersPerformance.some((u) => u.userId === userId)) {
  //     return;
  //   }

  //   this.dropdownOpen1 = false;

  //   if (this.activeFilter) {
  //     this.fetchUserPerformance(userId, this.activeFilter)
  //       .then(() => {
  //         // ✅ Just save performance data in localStorage (token stays in sessionStorage)
  //         localStorage.setItem(
  //           'selectedUsersPerformance',
  //           JSON.stringify(this.selectedUsersPerformance)
  //         );
  //       })
  //       .catch((err) => {
  //         console.error('Error fetching user performance:', err);
  //       });
  //   }
  // }

  // fetchUsersFromAPI() {
  //   const token = sessionStorage.getItem('token');

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   this.http
  //     .get<any>(
  //       'https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?type=MTD',
  //       { headers }
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         console.log('API Responsemmmmmmmmmmmmmmm:', response.data.users[0]);
  //         if (response && response.data && response.data.users) {
  //           this.users = response.data.users;
  //           // console.log('api res for compare:',response)
  //           sessionStorage.setItem('cachedUsers', JSON.stringify(this.users));
  //         } else {
  //           console.warn('API response does not contain users array');
  //         }
  //       },
  //       error: (error) => {
  //         console.error('API Error:', error);
  //       },
  //     });
  // }

  // selectUser(userId: string) {
  //   console.log('User selected:', userId);
  //   this.selectedUserId = userId; // ✅ Add this line

  //   if (this.selectedUsersPerformance.some((u) => u.userId === userId)) {
  //     return;
  //   }

  //   if (this.activeFilter) {
  //     this.fetchUserPerformance(userId, this.activeFilter)
  //       .then(() => {
  //         sessionStorage.setItem(
  //           'selectedUsersPerformance',
  //           JSON.stringify(this.selectedUsersPerformance)
  //         );
  //       })
  //       .catch((err) => {
  //         console.error('Error fetching user performance:', err);
  //       });
  //   }
  // }
  // selectUser(userId: string): void {
  //   const index = this.selectedUserIds.indexOf(userId);

  //   if (index > -1) {
  //     // Already selected, so deselect
  //     this.selectedUserIds.splice(index, 1);
  //   } else {
  //     // Not selected, so add to list
  //     this.selectedUserIds.push(userId);
  //   }

  //   // ✅ Save updated list to localStorage
  //   localStorage.setItem(
  //     'selectedUserIds',
  //     JSON.stringify(this.selectedUserIds)
  //   );

  //   // Only fetch if not already present
  //   const alreadyFetched = this.selectedUsersPerformance.some(
  //     (u) => u.userId === userId
  //   );

  //   if (!alreadyFetched && this.activeFilter) {
  //     this.fetchUserPerformance(userId, this.activeFilter)
  //       .then(() => {
  //         localStorage.setItem(
  //           'selectedUsersPerformance',
  //           JSON.stringify(this.selectedUsersPerformance)
  //         );
  //       })
  //       .catch((err) => {
  //         console.error('Error fetching user performance:', err);
  //       });
  //   }
  // }
  selectUser(userId: string): void {
    const index = this.selectedUserIds.indexOf(userId);

    if (index > -1) {
      this.selectedUserIds.splice(index, 1);
    } else {
      this.selectedUserIds.push(userId);
    }

    localStorage.setItem(
      'selectedUserIds',
      JSON.stringify(this.selectedUserIds)
    );

    const alreadyFetched = this.selectedUsersPerformance.some(
      (u) => u.userId === userId
    );

    if (!alreadyFetched && this.activeFilter) {
      this.fetchUserPerformance(userId, this.activeFilter)
        .then(() => {
          localStorage.setItem(
            'selectedUsersPerformance',
            JSON.stringify(this.selectedUsersPerformance)
          );

          // ✅ Call duration select after user is set
          this.selectedDuration = '1M';
          this.onDurationSelect(this.selectedDuration);
        })
        .catch((err) => {
          console.error('Error fetching user performance:', err);
        });
    }
  }
  fetchUserPerformance(userId: string, filterType: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?userIds=${userId}&type=${filterType}`;
      const token = sessionStorage.getItem('token');

      if (!token) {
        console.error('No token found in sessionStorage');
        reject('No token found');
        return;
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.http.get<any>(url, { headers }).subscribe({
        next: (res) => {
          // Store users from response if not already present
          if (res?.data?.users && res.data.users.length > 0) {
            for (const u of res.data.users) {
              if (
                !this.users.find((existing) => existing.user_id === u.user_id)
              ) {
                this.users.push(u);
              }
            }
          }

          // Handle performance data (can have multiple users)
          const performances = res?.data?.performance || [];

          for (const performance of performances) {
            const user = this.users.find(
              (u) => u.user_id === performance.user_id
            );

            if (user) {
              const userPerf = {
                userId: performance.user_id,
                name: user.name || 'Unknown',
                enquiries: performance.enquiries ?? 0,
                testDrives: performance.testDrives ?? 0,
                newOrders: performance.newOrders ?? 0,
                cancellations: performance.cancellations ?? 0,
                netOrders: performance.netOrders ?? 0,
                retail: performance.retail ?? 0,
              };

              // ✅ Replace existing entry if already present
              const existingIndex = this.selectedUsersPerformance.findIndex(
                (u) => u.userId === userPerf.userId
              );

              if (existingIndex > -1) {
                this.selectedUsersPerformance[existingIndex] = userPerf;
              } else {
                this.selectedUsersPerformance.push(userPerf);
              }
            }
          }

          resolve();
        },

        error: (err) => {
          console.error('Performance fetch error:', err);
          reject(err);
        },
      });
    });
  }

  fetchAllUsers(type: 'MTD' | 'QTD' | 'YTD' = 'MTD'): void {
    const token = sessionStorage.getItem('token');

    if (!token) {
      console.warn('⚠️ No token found in sessionStorage.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<DashboardResponse>(
        `https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?type=${type}`,
        { headers }
      )
      .subscribe({
        next: (res) => {
          console.log('✅ API fetchAllUsers response:', res);
          if (res?.data?.users?.rows?.length) {
            this.users = [...res.data.users.rows]; // ✅ Now you get the actual user list
            // this.dropdownOpen = true;
            console.log('👥 Loaded users:', this.users);
          } else {
            console.warn('⚠️ No users found in API response.');
            this.users = [];
          }
        },
        error: (err) => {
          console.error('❌ Error fetching users:', err);
          this.users = []; // Clear users on error
        },
      });
  }

  // loadCompareUsers() {
  //   const allUserIds = this.users.map((u) => u.user_id); // assuming `this.users` is filled
  //   this.selectedUsersPerformance = []; // clear before refill

  //   const promises = allUserIds.map((userId) =>
  //     this.fetchUserPerformance(userId, this.activeFilter)
  //   );

  //   Promise.all(promises).then(() => {
  //     console.log(
  //       'All user performances loaded:',
  //       this.selectedUsersPerformance
  //     );
  //   });
  // }

  // loadDashboardData() {
  //   const token = sessionStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   this.http
  //     .get<any>(
  //       'https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?type=MTD',
  //       {
  //         headers,
  //       }
  //     )
  //     .subscribe({
  //       next: (res) => {
  //         console.log('Dashboard response:', res);
  //         this.users = res?.data?.users ?? []; // ✅ correct path
  //         console.log('Loaded users:', this.users);
  //       },
  //       error: (err) => {
  //         console.error('Failed to load dashboard data', err);
  //       },
  //     });
  // }

  // fetchPs1Data(userId: string, filterType: string) {
  //   const url = `https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?userIds=${userId}&type=${filterType}`;
  //   const token = sessionStorage.getItem('token');
  //   if (!token) return;

  //   const headers = { Authorization: `Bearer ${token}` };

  //   this.http.get<any>(url, { headers }).subscribe({
  //     next: (data) => {
  //       const performance = data?.data?.performance?.[0];
  //       if (performance) {
  //         this.enquiriesCount = performance.enquiries ?? 0;
  //         this.testDrivesCount = performance.testDrives ?? 0;
  //         this.newOrdersCount = performance.newOrders ?? 0;
  //         this.cancellationsCount = performance.cancellations ?? 0;
  //         this.netOrdersCount = performance.netOrders ?? 0;
  //         this.retailCount = performance.retail ?? 0;
  //       }
  //     },
  //     error: (err) => console.error('PS1 API error:', err),
  //   });
  // }
  // fetchPs2Data(userId: string, filterType: string) {
  //   const url = `https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?userIds=${userId}&type=${filterType}`;
  //   const token = sessionStorage.getItem('token');
  //   if (!token) return;

  //   const headers = { Authorization: `Bearer ${token}` };

  //   this.http.get<any>(url, { headers }).subscribe({
  //     next: (data) => {
  //       const performance = data?.data?.performance?.[0];
  //       if (performance) {
  //         this.enquiriesCountPs2 = performance.enquiries ?? 0;
  //         this.testDrivesCountPs2 = performance.testDrives ?? 0;
  //         this.newOrdersCountPs2 = performance.newOrders ?? 0;
  //         this.cancellationsCountPs2 = performance.cancellations ?? 0;
  //         this.netOrdersCountPs2 = performance.netOrders ?? 0;
  //         this.retailCountPs2 = performance.retail ?? 0;
  //       }
  //     },
  //     error: (err) => console.error('PS2 API error:', err),
  //   });
  // }

  // Function to make the API call based on user and filter

  // fetchUserPerformance(userId: string, filterType: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     const url = `https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?userIds=${userId}&type=${filterType}`;
  //     const token = sessionStorage.getItem('token');

  //     if (!token) {
  //       console.error('No token found in sessionStorage');
  //       reject('No token found');
  //       return;
  //     }

  //     const headers = new HttpHeaders({
  //       Authorization: `Bearer ${token}`,
  //     });

  //     this.http.get<any>(url, { headers }).subscribe({
  //       next: (res) => {
  //         const performance = res?.data?.performance?.[0];
  //         const user = this.users.find((u) => u.user_id === userId);

  //         if (user && performance) {
  //           const userPerf = {
  //             userId,
  //             name: user.name,
  //             enquiries: performance.enquiries ?? 0,
  //             testDrives: performance.testDrives ?? 0,
  //             newOrders: performance.newOrders ?? 0,
  //             cancellations: performance.cancellations ?? 0,
  //             netOrders: performance.netOrders ?? 0,
  //             retail: performance.retail ?? 0,
  //           };

  //           this.selectedUsersPerformance.push(userPerf);

  //           sessionStorage.setItem(
  //             'selectedUsersPerformance',
  //             JSON.stringify(this.selectedUsersPerformance)
  //           );
  //         }

  //         resolve();
  //       },
  //       error: (err) => {
  //         console.error('Performance fetch error:', err);
  //         reject(err);
  //       },
  //     });
  //   });
  // }

  // onDurationSelect(duration: string): void {
  //   this.selectedDuration = duration;
  //   this.fetchSelectedUserData();
  // }

  // onDurationSelect(duration: string): void {
  //   this.selectedDuration = duration;
  //   this.fetchSelectedUserData(); // ✅ fixed
  // }
  // onDurationSelect(duration: string): void {
  //   this.selectedDuration = duration;

  //   switch (duration) {
  //     case '1D':
  //       this.selectedFilter = 'DAY';
  //       break;
  //     case '1W':
  //       this.selectedFilter = 'WEEK';
  //       break;
  //     case '1M':
  //       this.selectedFilter = 'MTD';
  //       break;
  //     case '1Q':
  //       this.selectedFilter = 'QTD';
  //       break;
  //     case '1Y':
  //       this.selectedFilter = 'YTD';
  //       break;
  //     default:
  //       this.selectedFilter = 'MTD';
  //   }

  //   console.log('✅ Filter Set:', this.selectedFilter);
  //   this.fetchSelectedUserData();
  // }

  isSummaryLoading: boolean = false;
  
  onDurationSelect(duration: string): void {
    this.selectedDuration = duration;

    switch (duration) {
      case '1D':
        this.selectedFilter = 'DAY';
        break;
      case '1W':
        this.selectedFilter = 'WEEK';
        break;
      case '1M':
        this.selectedFilter = 'MTD';
        break;
      case '1Q':
        this.selectedFilter = 'QTD';
        break;
      case '1Y':
        this.selectedFilter = 'YTD';
        break;
      default:
        this.selectedFilter = 'MTD';
    }

    console.log('✅ Filter Set:', this.selectedFilter);

    // Only fetch summary-related data
    this.fetchCallSummaryData(); // <- this function should fetch only summaryEnquiry/summaryColdCalls
  }

  // selectCompareUserps(psUser: any, smId: string): void {
  //   this.selectedUser = psUser;
  //   this.selectedSmId = smId;

  //   this.fetchSelectedUserData(); // Initial fetch with default or selected duration
  // }
  selectCompareUserps(psUser: any, smId: string): void {
    this.selectedUser = {
      ps_id: psUser.ps_id, // ✅ Use explicitly
      fname: psUser.ps_fname,
      lname: psUser.ps_lname,
      upcomingTestDrives: [],
      completedTestDrives: [],
      overdueTestDrives: [],
      summaryEnquiry: {
        totalConnected: 0,
        conversationTime: '0h 0m 0s',
        notConnected: 0,
        summary: {},
        hourlyAnalysis: {},
      },
    };

    this.selectedSmId = smId;
    this.selectedDuration = this.selectedDuration || '1D';
    this.fetchSelectedUserData();
  }

  // fetchSelectedUserData(): void {
  //   const userId = this.selectedUser?.ps_id;
  //   const smId = this.selectedSmId;

  //   if (!userId || !smId) {
  //     console.warn('User ID or SM ID missing for fetch', { userId, smId });
  //     return;
  //   }

  //   const token = sessionStorage.getItem('token');
  //   const filterType = this.selectedFilter || 'YTD';

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer/home-dashboard/new?user_id=${userId}&sm_id=${smId}&type=${filterType}`;

  //   this.http.get<any>(apiUrl, { headers }).subscribe({
  //     next: (res) => {
  //       if (res.status === 200 && res.data) {
  //         const userData = res.data;

  //         // 🧠 Preserve the summaryEnquiry + summaryColdCalls
  //         const summaryEnquiry = userData.selectedUser?.summaryEnquiry || {};

  //         const summaryColdCalls =
  //           userData.selectedUser?.summaryColdCalls || {};
  //         const enquirySummaryRaw = summaryEnquiry.summary || {};

  //         // ✅ Normalize for HTML template
  //         this.callSummaryOrder = {
  //           all: {
  //             calls: enquirySummaryRaw['All Calls']?.calls || 0,
  //             duration: enquirySummaryRaw['All Calls']?.duration || '0h 0m 0s',
  //             clients: enquirySummaryRaw['All Calls']?.uniqueClients || 0,
  //           },
  //           connected: {
  //             calls: enquirySummaryRaw['Connected']?.calls || 0,
  //             duration: enquirySummaryRaw['Connected']?.duration || '0h 0m 0s',
  //             clients: enquirySummaryRaw['Connected']?.uniqueClients || 0,
  //           },
  //           missed: {
  //             calls: enquirySummaryRaw['Missed']?.calls || 0,
  //             duration: enquirySummaryRaw['Missed']?.duration || '0h 0m 0s',
  //             clients: enquirySummaryRaw['Missed']?.uniqueClients || 0,
  //           },
  //           rejected: {
  //             calls: enquirySummaryRaw['Rejected']?.calls || 0,
  //             duration: enquirySummaryRaw['Rejected']?.duration || '0h 0m 0s',
  //             clients: enquirySummaryRaw['Rejected']?.uniqueClients || 0,
  //           },
  //         };

  //         // 👤 Assign selected user details
  //         this.selectedUser = {
  //           ps_id: userId,
  //           fname: userData.selectedUser?.fname || '',
  //           lname: userData.selectedUser?.lname || '',
  //           upcomingTestDrives: userData.selectedUser?.upcomingTestDrives || [],
  //           completedTestDrives:
  //             userData.selectedUser?.completedTestDrives || [],
  //           overdueTestDrives: userData.selectedUser?.overdueTestDrives || [],
  //           summaryEnquiry,
  //           summaryColdCalls,
  //         };

  //         this.compareSmData = userData.smData;

  //         console.log('✅ Selected User:', this.selectedUser);
  //         console.log('📞 Call Summary Order:', this.callSummaryOrder);
  //         console.log('✅ Compare SM Data:', this.compareSmData);
  //       } else {
  //         console.warn('⚠️ Incomplete response:', res);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('❌ Error fetching selected user:', err);
  //     },
  //   });
  // }

  fetchCallSummaryData(): void {
    const userId = this.selectedUser?.ps_id;
    const smId = this.selectedSmId;

    if (!userId || !smId) {
      console.warn('User ID or SM ID missing for call summary fetch', {
        userId,
        smId,
      });
      return;
    }

    const token = sessionStorage.getItem('token');
    const filterType = this.selectedFilter || 'MTD';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer/home-dashboard/new?user_id=${userId}&sm_id=${smId}&type=${filterType}`;

    this.http.get<any>(apiUrl, { headers }).subscribe({
      next: (res) => {
        if (res.status === 200 && res.data) {
          const userData = res.data;

          const summaryEnquiry = userData.selectedUser?.summaryEnquiry || {};
          const summaryColdCalls =
            userData.selectedUser?.summaryColdCalls || {};
          const isColdCall = this.activeActivity === 'ColdCalls';

          const summaryRaw = isColdCall
            ? summaryColdCalls.summary || {}
            : summaryEnquiry.summary || {};
          // const hourlyAnalysisData = summaryEnquiry.hourlyAnalysis || {};
          const hourlyAnalysisData = isColdCall
            ? summaryColdCalls.hourlyAnalysis || {}
            : summaryEnquiry.hourlyAnalysis || {};

          // ✅ Only update call summary object
          this.callSummaryOrder = {
            all: {
              calls: summaryRaw['All Calls']?.calls || 0,
              duration: summaryRaw['All Calls']?.duration || '0h 0m 0s',
              clients: summaryRaw['All Calls']?.uniqueClients || 0,
            },
            connected: {
              calls: summaryRaw['Connected']?.calls || 0,
              duration: summaryRaw['Connected']?.duration || '0h 0m 0s',
              clients: summaryRaw['Connected']?.uniqueClients || 0,
            },
            missed: {
              calls: summaryRaw['Missed']?.calls || 0,
              duration: summaryRaw['Missed']?.duration || '0h 0m 0s',
              clients: summaryRaw['Missed']?.uniqueClients || 0,
            },
            rejected: {
              calls: summaryRaw['Rejected']?.calls || 0,
              duration: summaryRaw['Rejected']?.duration || '0h 0m 0s',
              clients: summaryRaw['Rejected']?.uniqueClients || 0,
            },
          };

          // ✅ Merge updated summaries only — don't touch performance
          this.selectedUser = {
            ...this.selectedUser,
            summaryEnquiry,
            summaryColdCalls,
          };

          // Update hourly chart data
          this.hourlyChartLabels = Object.keys(hourlyAnalysisData);

          this.hourlyAllCalls = this.hourlyChartLabels.map(
            (key) => hourlyAnalysisData[key]?.AllCalls?.calls || 0
          );

          this.hourlyConnectedCalls = this.hourlyChartLabels.map(
            (key) => hourlyAnalysisData[key]?.Connected?.calls || 0
          );

          this.hourlyMissedCalls = this.hourlyChartLabels.map(
            (key) => hourlyAnalysisData[key]?.missedCalls || 0
          );

          this.cdr.detectChanges();
          this.renderHourlyChart();

          console.log('✅ Call Summary Updated:', this.callSummaryOrder);
        } else {
          console.warn('⚠️ Incomplete call summary response:', res);
        }
      },
      error: (err) => {
        console.error('❌ Error fetching call summary data:', err);
      },
    });
  }

  fetchSelectedUserData(): void {
    const duration = this.selectedDuration || '1M';

    const userId = this.selectedUser?.ps_id;
    const smId = this.selectedSmId;

    if (!userId || !smId) {
      console.warn('User ID or SM ID missing for fetch', { userId, smId });
      return;
    }

    const token = sessionStorage.getItem('token');
    const filterType = this.selectedFilter || 'MTD';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer/home-dashboard/new?user_id=${userId}&sm_id=${smId}&type=${filterType}`;

    this.http.get<any>(apiUrl, { headers }).subscribe({
      next: (res) => {
        if (res.status === 200 && res.data) {
          const userData = res.data;

          const summaryEnquiry = userData.selectedUser?.summaryEnquiry || {};
          const summaryColdCalls =
            userData.selectedUser?.summaryColdCalls || {};
          const enquirySummaryRaw = summaryEnquiry.summary || {};
          const hourlyAnalysisData = summaryEnquiry.hourlyAnalysis || {};

          this.callSummaryOrder = {
            all: {
              calls: enquirySummaryRaw['All Calls']?.calls || 0,
              duration: enquirySummaryRaw['All Calls']?.duration || '0h 0m 0s',
              clients: enquirySummaryRaw['All Calls']?.uniqueClients || 0,
            },
            connected: {
              calls: enquirySummaryRaw['Connected']?.calls || 0,
              duration: enquirySummaryRaw['Connected']?.duration || '0h 0m 0s',
              clients: enquirySummaryRaw['Connected']?.uniqueClients || 0,
            },
            missed: {
              calls: enquirySummaryRaw['Missed']?.calls || 0,
              duration: enquirySummaryRaw['Missed']?.duration || '0h 0m 0s',
              clients: enquirySummaryRaw['Missed']?.uniqueClients || 0,
            },
            rejected: {
              calls: enquirySummaryRaw['Rejected']?.calls || 0,
              duration: enquirySummaryRaw['Rejected']?.duration || '0h 0m 0s',
              clients: enquirySummaryRaw['Rejected']?.uniqueClients || 0,
            },
          };
          console.log(
            '🎯 Performanceeeeee:',
            userData.selectedUser?.performance
          );

          this.selectedUser = {
            ...this.selectedUser,
            ps_id: userId,
            fname: userData.selectedUser?.fname || '',
            lname: userData.selectedUser?.lname || '',
            upcomingTestDrives: userData.selectedUser?.upcomingTestDrives || [],
            completedTestDrives:
              userData.selectedUser?.completedTestDrives || [],
            overdueTestDrives: userData.selectedUser?.overdueTestDrives || [],
            summaryEnquiry,
            summaryColdCalls,
            performance: userData.selectedUser?.performance || {},
          };
          console.log('🔁 After assignment:', this.selectedUser);

          // ✅ Added logs for debugging
          console.log('🎯 Performance:', userData.selectedUser?.performance);
          console.log('🔁 After assignment:', this.selectedUser);

          this.compareSmData = userData.smData;

          console.log('📞 Call Summary Order:', this.callSummaryOrder);
          console.log('✅ Compare SM Data:', this.compareSmData);

          this.hourlyChartLabels = Object.keys(hourlyAnalysisData);

          this.hourlyAllCalls = this.hourlyChartLabels.map(
            (key) => hourlyAnalysisData[key]?.AllCalls?.calls || 0
          );

          this.hourlyConnectedCalls = this.hourlyChartLabels.map(
            (key) => hourlyAnalysisData[key]?.Connected?.calls || 0
          );

          this.hourlyMissedCalls = this.hourlyChartLabels.map(
            (key) => hourlyAnalysisData[key]?.missedCalls || 0
          );

          this.cdr.detectChanges();
          this.renderHourlyChart();
        } else {
          console.warn('⚠️ Incomplete response:', res);
        }
      },
      error: (err) => {
        console.error('❌ Error fetching selected user:', err);
      },
    });
  }

  // renderHourlyChart(): void {
  //   const ctx = (
  //     document.getElementById('hourlyChart') as HTMLCanvasElement
  //   )?.getContext('2d');
  //   if (!ctx) return;

  //   // 🔥 Destroy previous instance to avoid overlaps
  //   if (this.hourlyChartInstance) {
  //     this.hourlyChartInstance.destroy();
  //   }

  //   // ✅ Create and save new instance
  //   this.hourlyChartInstance = new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //       labels: this.hourlyChartLabels,
  //       datasets: [
  //         {
  //           label: 'All Calls',
  //           data: this.hourlyAllCalls,
  //           borderColor: '#3498db',
  //           backgroundColor: 'rgba(52, 152, 219, 0.2)',
  //           fill: true,
  //           tension: 0.3,
  //         },
  //         {
  //           label: 'Connected',
  //           data: this.hourlyConnectedCalls,
  //           borderColor: '#2ecc71',
  //           backgroundColor: 'rgba(46, 204, 113, 0.2)',
  //           fill: true,
  //           tension: 0.3,
  //         },
  //         {
  //           label: 'Missed',
  //           data: this.hourlyMissedCalls,
  //           borderColor: '#e74c3c',
  //           backgroundColor: 'rgba(231, 76, 60, 0.2)',
  //           fill: true,
  //           tension: 0.3,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: { position: 'top' },
  //       },
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           title: { display: true, text: 'Number of Calls' },
  //         },
  //         x: {
  //           title: { display: true, text: 'Time Block' },
  //         },
  //       },
  //     },
  //   });
  // }
  renderHourlyChart(): void {
    if (this.hourlyChartInstance) {
      this.hourlyChartInstance.destroy();
    }

    const canvas = document.getElementById('hourlyChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    this.hourlyChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.hourlyChartLabels,
        datasets: [
          {
            label: 'All Calls',
            data: this.hourlyAllCalls,
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgba(0, 123, 255, 1)',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Connected Calls',
            data: this.hourlyConnectedCalls,
            backgroundColor: 'rgba(40, 167, 69, 0.2)',
            borderColor: 'rgba(40, 167, 69, 1)',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Missed Calls',
            data: this.hourlyMissedCalls,
            backgroundColor: 'rgba(220, 53, 69, 0.2)',
            borderColor: 'rgba(220, 53, 69, 1)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              boxWidth: 10,
              font: { size: 10 },
            },
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: { stacked: false },
          y: { stacked: false },
        },
      },
    });
  }

  fetchFilteredData(userId: string, filterType: string) {
    const url = `https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?userIds=${userId}&type=${filterType}`;
    const token = sessionStorage.getItem('token');

    if (!token) {
      console.error('No token found in sessionStorage');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    console.log('Calling API with URL:', url);

    // Making the API call
    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        // Log the API response for debugging
        console.log('API response:', data);

        if (data && data.data) {
          const dashboardData = data.data;

          // ✅ Correctly map KPI values from performance[0]
          const performance = dashboardData.performance?.[0];
          if (performance) {
            this.enquiriesCount = performance.enquiries ?? 0;
            this.testDrivesCount = performance.testDrives ?? 0;
            this.newOrdersCount = performance.newOrders ?? 0;
            this.cancellationsCount = performance.cancellations ?? 0;
            this.netOrdersCount = performance.netOrders ?? 0;
            this.retailCount = performance.retail ?? 0;

            this.isUserSelected = true; // Important!
            this.cdr.detectChanges(); // Force refresh if needed
          } else {
            console.warn('No performance data found');
            this.enquiriesCount = 0;
            this.testDrivesCount = 0;
            this.newOrdersCount = 0;
            this.cancellationsCount = 0;
            this.netOrdersCount = 0;
            this.retailCount = 0;
          }

          // Logging the values for debugging
          console.log('Enquiries:', this.enquiriesCount);
          console.log('Test Drives:', this.testDrivesCount);
          console.log('New Orders:', this.newOrdersCount);
          console.log('Cancellations:', this.cancellationsCount);
          console.log('Net Orders:', this.netOrdersCount);
          console.log('Retail:', this.retailCount);

          // Optionally log best performance
          const bestPerformance = dashboardData.allIndiaBestPerformace;
          if (bestPerformance) {
            console.log('Best performance data:', bestPerformance);
          }
        } else {
          console.error('No valid dashboard data found');
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  isUserDisabledInPs2(userId: string): boolean {
    return this.selectedPs1 === userId; // Now comparing both as strings
  }

  onSelectPs2(user: any): void {
    console.log('PS2 user selected:', user);

    // If PS1 is already selected, don't allow selection of the same user in PS2
    if (this.selectedPs1 === user.user_id) {
      console.log('User is already selected in PS1, cannot select in PS2');
      return; // Prevent selection if the same user is in PS1
    }

    // Set the selected user for PS2
    this.selectedPs2 = [user.user_id]; // Only one user can be selected in PS2 at a time
    this.selectedPs2Names = [user.name]; // Store user name for display in PS2 dropdown

    // Track which user should be ticked in PS1 based on PS2 selection
    this.tickedUserInPs1 = user; // Mark this user as the ticked one in PS1 dropdown

    console.log('Updated selected user in PS2:', this.selectedPs2);

    // Fetching data for PS2 as per the selected user
    const url = `https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?userIds=${user.user_id}&type=${this.selectedFilter}`;
    console.log('Fetching PS2 data from URL:', url); // Log URL for debugging

    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found in sessionStorage');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make API call to fetch PS2 data
    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        console.log('API response for PS2:', data);

        const performance = data?.data?.performance?.[0];
        if (performance) {
          this.enquiriesCountPs2 = performance.enquiries ?? 0;
          this.testDrivesCountPs2 = performance.testDrives ?? 0;
          this.ps2Total = this.enquiriesCountPs2; // for bar % if needed

          console.log('PS2 Enquiries:', this.enquiriesCountPs2);
          console.log('PS2 Test Drives:', this.testDrivesCountPs2);
        } else {
          console.warn('No performance data found for PS2');
          this.enquiriesCountPs2 = 0;
          this.testDrivesCountPs2 = 0;
          this.ps2Total = 0;
        }
      },
      error: (err) => {
        console.error('Failed to fetch PS2 data', err);
      },
    });
  }

  showMoreItems() {
    this.showingLimit += 10;
  }
  isPs1User(userId: string): boolean {
    return this.selectedPs1 === userId;
  }
  // handlePs2Click(user: any): void {
  //   if (!this.isPs1User(user.user_id)) {
  //     this.selectedPs2 = [user.user_id]; // or handle multiple
  //     this.selectedPs2Names = [user.name];
  //     this.dropdownOpen2 = false;

  //     if (this.activeFilter) {
  //       this.fetchPs2Data(user.user_id, this.activeFilter); // ✅ correct method
  //     }
  //   }
  // }
  getCallIcon(type: string): string {
    switch (type) {
      case 'All Calls':
        return 'fas fa-phone-alt';
      case 'Connected':
        return 'fas fa-check-circle';
      case 'Missed':
        return 'fas fa-times-circle';
      case 'Rejected':
        return 'fas fa-ban';
      default:
        return 'fas fa-question-circle';
    }
  }

  getCallColor(type: string): string {
    switch (type) {
      case 'All Calls':
        return '#3498db';
      case 'Connected':
        return '#2ecc71';
      case 'Missed':
        return '#e74c3c';
      case 'Rejected':
        return '#9e9e9e';
      default:
        return '#000000';
    }
  }

  handlePs2Click(user: any): void {
    if (!this.isPs1User(user.user_id)) {
      this.selectedPs2 = [user.user_id];
      this.selectedPs2Names = [user.name];
      this.dropdownOpen2 = false;

      // ✅ Set selected PS2 user ID so filter updates also work
      this.selectedPs2UserId = user.user_id;

      if (this.activeFilter) {
        this.loadCompareMetrics(user.user_id, this.activeFilter, true);
      }
    }
  }

  isUserSelectedInPs2(userId: string): boolean {
    return this.selectedPs2.includes(userId);
  }

  // Click handler for PS1 dropdown
  // handlePs1Click(user: any): void {
  //   if (!this.isUserSelectedInPs2(user.user_id)) {
  //     this.selectUser(user.user_id); // ✅ Only call if not already selected in PS2
  //     this.dropdownOpen1 = false;
  //   } else {
  //     console.log('User is already in PS2, not selecting for PS1');
  //   }
  // }
  handlePs1Click(user: any): void {
    this.selectedPs1 = user.user_id; // ✅ this was missing
    this.selectedUserId = user.user_id; // ✅ needed for filter-based updates
    this.dropdownOpen1 = false;

    if (this.activeFilter) {
      this.loadCompareMetrics(user.user_id, this.activeFilter);
    }
  }

  // Function to make the API call based on user and filter
  // fetchFilteredData(userId: string, filterType: string) {
  //   const url = `https://uat.smartassistapp.in/api/dealer/dealer/analysis/dashboard?userIds=${userId}&type=${filterType}`;
  //   const token = sessionStorage.getItem('token');

  //   if (!token) {
  //     console.error('No token found in sessionStorage');
  //     return;
  //   }

  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   };

  //   console.log('Calling API with URL:', url);

  //   // Making the API call
  //   this.http.get<any>(url, { headers }).subscribe({
  //     next: (data) => {
  //       // Log the API response for debugging
  //       console.log('API response:', data);

  //       if (data && data.data) {
  //         const dashboardData = data.data;

  //         // ✅ Correctly map KPI values from performance[0]
  //         const performance = dashboardData.performance?.[0];
  //         if (performance) {
  //           this.enquiriesCount = performance.enquiries ?? 0;
  //           this.testDrivesCount = performance.testDrives ?? 0;
  //           this.newOrdersCount = performance.newOrders ?? 0;
  //           this.cancellationsCount = performance.cancellations ?? 0;
  //           this.netOrdersCount = performance.netOrders ?? 0;
  //           this.retailCount = performance.retail ?? 0;

  //           this.isUserSelected = true; // Important!
  //           this.cdr.detectChanges(); // Force refresh if needed
  //         } else {
  //           console.warn('No performance data found');
  //           this.enquiriesCount = 0;
  //           this.testDrivesCount = 0;
  //           this.newOrdersCount = 0;
  //           this.cancellationsCount = 0;
  //           this.netOrdersCount = 0;
  //           this.retailCount = 0;
  //         }

  //         // Logging the values for debugging
  //         console.log('Enquiries:', this.enquiriesCount);
  //         console.log('Test Drives:', this.testDrivesCount);
  //         console.log('New Orders:', this.newOrdersCount);
  //         console.log('Cancellations:', this.cancellationsCount);
  //         console.log('Net Orders:', this.netOrdersCount);
  //         console.log('Retail:', this.retailCount);

  //         // Optionally log best performance
  //         const bestPerformance = dashboardData.allIndiaBestPerformace;
  //         if (bestPerformance) {
  //           console.log('Best performance data:', bestPerformance);
  //         }
  //       } else {
  //         console.error('No valid dashboard data found');
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error fetching data:', error);
  //     },
  //   });
  // }

  // fetchCounts(userId: string, filterType: string = '') {
  //   let url = `https://uat.smartassistapp.in/api/dealer/dealer/analysis/dashboard?userIds=${userId}`;

  //   if (filterType) {
  //     url += `&type=${filterType}`;
  //   }

  //   const token = sessionStorage.getItem('token');
  //   if (!token) {
  //     console.error('No token found in sessionStorage');
  //     return;
  //   }

  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   };

  //   console.log('Calling API with URL:', url);

  //   this.http.get<any>(url, { headers }).subscribe({
  //     next: (response) => {
  //       console.log('API response:', response);

  //       const data = response.data;

  //       // ✅ Corrected assignments
  //       this.ps1Count = data.enquiries;
  //       this.ps2Count = data.testDrives;

  //       this.ps2Available = this.ps2Count > 0;
  //       this.maxCount = Math.max(this.ps1Count, this.ps2Count, 100);
  //     },
  //     error: (error) => {
  //       console.error('API error:', error);
  //     },
  //   });
  // }
  fetchCounts(userId: string, filterType: string = '') {
    let url = `https://uat.smartassistapp.in/api/dealer/dealer/analysis/dashboard?userIds=${userId}`;

    if (filterType) {
      url += `&type=${filterType}`;
    }

    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found in sessionStorage');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    console.log('Calling API with URL:', url);

    this.http.get<any>(url, { headers }).subscribe({
      next: (response) => {
        console.log('API response:', response);

        const data = response.data;

        // ✅ Your existing assignments
        this.ps1Count = data.enquiries;
        this.ps2Count = data.testDrives;

        this.ps2Available = this.ps2Count > 0;
        this.maxCount = Math.max(this.ps1Count, this.ps2Count, 100);

        // ✅ ✨ ADD THIS: Update Compare Performance table data
        if (this.selectedPs1 === userId) {
          this.ps1Performance[userId] = data;
        }

        if (this.selectedPs2.includes(userId)) {
          this.ps2Performance[userId] = data;
        }
      },
      error: (error) => {
        console.error('API error:', error);
      },
    });
  }

  // Method to handle the user selection
  // onUserChange(userId: string) {
  //   this.selectedUserId = userId; // Store the selected userId
  //   this.fetchCounts(userId, this.selectedFilter); // Call API with selected user and filter
  // }

  // Method to handle filter selection
  // onFilterChange(filter: string) {
  //   this.selectedFilter = filter;

  //   // ✅ Update PS1 if selected
  //   if (this.selectedPs1) {
  //     this.fetchCounts(this.selectedPs1, filter);
  //   }

  //   // ✅ Update PS2 users if selected
  //   if (this.selectedPs2 && this.selectedPs2.length > 0) {
  //     this.selectedPs2.forEach((userId) => {
  //       this.fetchCounts(userId, filter);
  //     });
  //   }
  // }
  // onFilterChange(filterType: string): void {
  //   this.selectedFilter = filterType;

  //   if (this.selectedTeamId && this.selectedSmId) {
  //     this.fetchSMData(this.selectedSmId, filterType);
  //   }

  //   console.log('🟡 Filter changed to:', filterType);
  // }
  onFilterChange(filterType: string): void {
    this.selectedFilter = filterType;

    this.smData.forEach((sm) => {
      this.fetchSMData(sm.sm_id, filterType);
    });

    console.log('🟡 Filter changed to:', filterType);
  }

  onUserChange(userId: string, filterType: string) {
    this.isUserSelected = true;
    this.fetchFilteredData(userId, filterType);
  }

  // get ps1WidthPercent() {
  //   return (this.ps1Count / this.maxCount) * 100;
  // }

  // get ps2WidthPercent() {
  //   return (this.ps2Count / this.maxCount) * 100;
  // }
  // get ps1Total() {
  //   return this.performance.reduce((sum, item) => sum + item.enquiries, 0);
  // }

  // get ps2Total() {
  //   return this.performance.reduce((sum, item) => sum + item.testDrives, 0);
  // }

  // Calculate width percentages based on backend data
  // get ps1WidthPercent() {
  //   // Method 1: Based on maximum expected value
  //   const maxExpectedValue = 100; // Set your maximum expected count
  //   const percentage = (this.ps1Total / maxExpectedValue) * 100;
  //   return Math.min(percentage, 100); // Cap at 100%
  // }

  // get ps2WidthPercent() {
  //   const maxExpectedValue = 100; // Same as PS1
  //   const percentage = (this.ps2Total / maxExpectedValue) * 100;
  //   return Math.min(percentage, 100);
  // }
  // filteredUsers = [...this.users];
  get ps1WidthPercent(): number {
    const total = this.ps1Total + this.ps2Total;
    if (total === 0) return 0;
    return (this.ps1Total / total) * 100;
  }

  get ps2WidthPercent(): number {
    const total = this.ps1Total + this.ps2Total;
    if (total === 0) return 0;
    return (this.ps2Total / total) * 100;
  }
  get testDrivesProgressWidth(): number {
    if (!this.testDrivesCount || this.testDrivesCount === 0) {
      return 0;
    }

    // Set max target for Test Drives only
    const maxTarget = 10; // When count reaches 10, bar will be 100% wide

    // Calculate percentage (ensure it doesn't exceed 100%)
    return Math.min((this.testDrivesCount / maxTarget) * 100, 100);
  }

  // Only for Test Drives PS2 bar width (if you have PS2 for test drives)
  get testDrivesPs2ProgressWidth(): number {
    if (!this.ps2Total || this.ps2Total === 0) {
      return 0;
    }

    const maxTarget = 10; // Same target as PS1

    return Math.min((this.ps2Total / maxTarget) * 100, 100);
  }
  // applyTableFilters() {
  //   const search = this.searchText.trim().toLowerCase();
  //   if (!search) {
  //     this.filteredUsers = [...this.users];
  //   } else {
  //     this.filteredUsers = this.users.filter((user) =>
  //       user.name.toLowerCase().includes(search)
  //     );
  //   }
  // }

  // Method to build userIds param string (duplicates allowed)
  buildUserIdsParam(): string {
    const userIds = [];

    // Add PS1 user ID if selected
    if (this.selectedPs1) {
      userIds.push(this.selectedPs1);
    }

    // Add PS2 user IDs if selected
    if (this.selectedPs2 && this.selectedPs2.length > 0) {
      userIds.push(...this.selectedPs2);
    }

    // Join all user IDs with comma, duplicates will stay if any
    return userIds.join(',');
  }

  calculateWidthPercent(value: number): number {
    const max = Math.max(this.enquiriesCount, this.enquiriesCountPs2, 1); // avoid divide by 0
    return (value / max) * 100;
  }

  // Call the API with built userIds parameter
  // Call the API with built userIds parameter
  callApi() {
    const userIdsParam = this.buildUserIdsParam(); // your method to get comma-separated user IDs
    const filterType = this.selectedFilter || 'MTD'; // default filter type if not set

    const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer/analysis/dashboard?userIds=${encodeURIComponent(
      userIdsParam
    )}&type=${encodeURIComponent(filterType)}`;

    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found in sessionStorage');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    console.log('Calling API URL:', apiUrl);

    this.http.get<any>(apiUrl, { headers }).subscribe({
      next: (data) => {
        console.log('API response:', data);
        const performances = data?.data?.performance;

        // ✅ Handle PS1 data
        if (performances?.length > 0) {
          const ps1Data = performances[0];
          this.enquiriesCount = ps1Data.enquiries ?? 0;
          this.testDrivesCount = ps1Data.testDrives ?? 0;
          this.newOrdersCount = ps1Data.newOrders ?? 0;

          // Optional: ps1Total if used in other calculations
          this.ps1Total = this.enquiriesCount; // or other logic
        } else {
          this.enquiriesCount = 0;
          this.testDrivesCount = 0;
          this.newOrdersCount = 0;
          this.ps1Total = 0;
        }

        // ✅ Handle PS2 data
        if (performances?.length > 1 && this.selectedPs2.length > 0) {
          const ps2Data = performances[1];
          this.enquiriesCountPs2 = ps2Data.enquiries ?? 0;
          this.testDrivesCountPs2 = ps2Data.testDrives ?? 0;
          this.newOrdersCountPs2 = ps2Data.newOrders ?? 0;

          this.ps2Total = this.enquiriesCountPs2; // or other logic
        } else {
          this.enquiriesCountPs2 = 0;
          this.testDrivesCountPs2 = 0;
          this.newOrdersCountPs2 = 0;
          this.ps2Total = 0;
        }
      },
      error: (error) => {
        console.error('API call error:', error);
      },
    });
  }

  selectUser2(userId: string, userName: string) {
    const index = this.selectedPs2.indexOf(userId);

    if (index === -1) {
      this.selectedPs2.push(userId);
      this.selectedPs2Names.push(userName); // ← also push name
    } else {
      this.selectedPs2.splice(index, 1);

      // Remove the name at the same index
      const nameIndex = this.selectedPs2Names.indexOf(userName);
      if (nameIndex !== -1) {
        this.selectedPs2Names.splice(nameIndex, 1);
      }
    }

    this.callApi(); // optional, if needed to refetch data
  }

  // Example method to select PS1 user
  // selectPs1(userId: string, name: string) {
  //   this.selectedPs1 = userId;
  //   this.selectedPs1Name = name;
  //   this.selectedPs2 = '';
  //   this.selectedPs2Name = '';
  //   this.callApi();
  // }
  selectPs1(userId: string, name: string) {
    this.selectedPs1 = userId;
    this.selectedPs1Name = name;

    // Clear PS2 selections when PS1 is changed
    this.selectedPs2 = [];
    this.selectedPs2Names = [];

    this.callApi();
  }

  // PS2 selection
  // selectPs2(userId: string, name: string) {
  //   this.selectedPs2 = userId;
  //   this.selectedPs2Name = name;
  //   this.callApi();
  // }
  selectPs2(userId: string, name: string) {
    this.selectedPs2 = [userId]; // replace selection with only this user
    this.selectedPs2Names = [name]; // replace selected names with only this name
    this.callApi();
  }

  loadTestDrives(data: ApiResponse['data']) {
    if (!this.selectedUser) return;
    const selectedUserName = this.selectedUser.name.toLowerCase();

    // Filter today's test drives for the user
    this.todayTestDrives = data.tableTestDrives_today.filter(
      (td) => td.assigned_to?.toLowerCase() === selectedUserName
    );

    // Also load into main testDrives array for UI display
    this.testDrives = [...this.todayTestDrives];

    // Optional: reset page to 1 if paginating
    this.currentPage = 1;

    // Load upcoming if needed
    this.upcomingTestDrives = this.selectedUser.upcomingTestDrives || [];
  }

  loadFilteredTestDrives(filter: 'today' | 'oneWeek') {
    if (!this.fullData || !this.selectedUser) {
      this.testDrives = [];
      this.filteredTableTestDrives = [];
      return;
    }

    const selectedUserName = this.selectedUser.name.toLowerCase();

    switch (filter) {
      case 'today':
        this.testDrives = [...(this.fullData.tableTestDrives_today || [])];
        break;

      case 'oneWeek':
        this.testDrives = [...(this.fullData.tableTestDrives_oneweek || [])];
        break;

      default:
        this.testDrives = [];
    }

    // Sync data with the table
    this.filteredTableTestDrives = [...this.testDrives];
    this.currentPage = 1;
  }

  // applyTableFilters() {
  //   this.loadFilteredTestDrives(this.filterOption);
  //   this.currentPage = 1;
  // }

  // onFilterClick(filter: 'MTD' | 'QTD' | 'YTD') {
  //   this.activeFilter = filter;

  //   this.loadDashboardMetrics(filter);

  //   if (this.selectedUserId) {
  //     this.loadCompareMetrics(this.selectedUserId, filter);
  //   }

  //   if (this.selectedPs2UserId) {
  //     this.loadCompareMetrics(this.selectedPs2UserId, filter, true);
  //   }
  // }
  onFilterClick(filter: 'MTD' | 'QTD' | 'YTD') {
    this.activeFilter = filter;

    // Update top cards
    this.loadDashboardMetrics(filter);

    // 🔁 Re-fetch compare performance for all users currently in comparison
    this.selectedUsersPerformance.forEach((user) => {
      this.loadCompareMetrics(user.userId, filter);
    });

    // PS2 (if used separately)
    if (this.selectedPs2UserId) {
      this.loadCompareMetrics(this.selectedPs2UserId, filter, true);
    }
    // Reapply selectedUserId (dropdown user) after filter change
    if (this.selectedUserId) {
      this.loadCompareMetrics(this.selectedUserId, filter);
    }
  }

  loadUsers() {
    // Example API call based on filterOption
    let apiUrl = '';

    if (this.filterOption === 'today') {
      apiUrl = 'https://your-api.com/users?filter=today';
    } else if (this.filterOption === 'oneWeek') {
      apiUrl = 'https://your-api.com/users?filter=oneWeek';
    }

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.users = data; // update users array for the table
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchDashboardData() {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get('https://uat.smartassistapp.in/api/dealer/dealer/home/dashboard', {
        headers,
      })
      .subscribe({
        next: (response: any) => {
          console.log('Dashboard API response:', response);
          this.dashboardData = response.data;
        },
        error: (err) => {
          console.error('Error fetching dashboard data', err);
        },
      });
  }
  getActiveTestDriveList(): any[] {
    if (!this.selectedUser) return [];

    switch (this.activeTestDriveStatus) {
      case 'Upcoming':
        return this.selectedUser.upcomingTestDrives || [];
      case 'Completed':
        return this.selectedUser.completedTestDrives || [];
      case 'Overdue':
        return this.selectedUser.overdueTestDrives || [];
      default:
        return [];
    }
  }

  getFilteredTestDrives() {
    switch (this.filterOption) {
      case 'today':
        return this.dashboardData.tableTestDrives_today || [];
      case 'oneWeek':
        return this.dashboardData.tableTestDrives_oneweek || [];
      // case 'all':
      //   return [
      //     ...(this.dashboardData.tableTestDrives_today || []),
      //     ...(this.dashboardData.tableTestDrives_oneweek || []),
      //   ];
      default:
        return [];
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
  // loadDashboardMetrics(filter: 'MTD' | 'QTD' | 'YTD') {
  //   const token = sessionStorage.getItem('token');
  //   if (!token) {
  //     console.error('Token not found');
  //     return;
  //   }

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   const url = `https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?type=${filter}`;

  //   this.http.get<any>(url, { headers }).subscribe({
  //     next: (response) => {
  //       const data = response?.data || {};

  //       // Update main metrics
  //       this.dashboardMetrics = {
  //         enquiries: data.enquiries || 0,
  //         testDrives: data.testDrives || 0,
  //         newOrders: data.newOrders || 0,
  //         cancellations: data.cancellations || 0,
  //         netOrders: data.netOrders || 0,
  //         retail: data.retail || 0,
  //         performance: (data.performance || []).map((user: any) => ({
  //           userId: user.user_id,
  //           name: user.name || '',
  //           enquiries: user.enquiries || 0,
  //           testDrives: user.testDrives || 0,
  //           newOrders: user.newOrders || 0,
  //           cancellations: user.cancellations || 0,
  //           netOrders: user.netOrders || 0,
  //           retail: user.retail || 0,
  //         })),
  //         allIndiaBestPerformace: data.allIndiaBestPerformace || {
  //           enquiriesCount: 0,
  //           testDrivesCount: 0,
  //           newOrdersCount: 0,
  //           cancellationsCount: 0,
  //           retailCount: 0,
  //         },
  //         allIndiaRank: data.allIndiaRank || {
  //           enquiriesRank: 0,
  //           testDrivesRank: 0,
  //           newOrdersRank: 0,
  //           cancellationsRank: 0,
  //           retailRank: 0,
  //         },
  //       };

  //       // 🔁 Update the table data used in UI
  //       // this.selectedUsersPerformance = this.dashboardMetrics.performance;
  //     },
  //     error: (err) => {
  //       console.error('Dashboard data fetch error', err);
  //     },
  //   });
  // }

  // onPsChange() {
  //   this.http
  //     .get<any[]>(
  //       `https://uat.smartassistapp.in/api/dealer/dealer-analysis?ps=${this.selectedPs}`
  //     )
  //     .subscribe((data) => {
  //       this.roles = data;
  //     });
  // }
  loadDashboardMetrics(filter: 'MTD' | 'QTD' | 'YTD') {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // 👇 Get selected user IDs from your current selection (ensure this.selectedUserIds exists and is up to date)
    const selectedUserIds = this.selectedUserIds?.length
      ? this.selectedUserIds.join(',')
      : '';

    // 👇 Append userIds to the API URL if any are selected
    // const url = `https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?type=${filter}`;
    const url = `https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?type=${filter}${
      selectedUserIds ? `&userIds=${selectedUserIds}` : ''
    }`;

    this.http.get<any>(url, { headers }).subscribe({
      next: (response) => {
        const data = response?.data || {};

        // Update main metrics
        this.dashboardMetrics = {
          enquiries: data.enquiries || 0,
          testDrives: data.testDrives || 0,
          newOrders: data.newOrders || 0,
          cancellations: data.cancellations || 0,
          netOrders: data.netOrders || 0,
          retail: data.retail || 0,
          performance: (data.performance || []).map((user: any) => ({
            userId: user.user_id,
            name: user.name || '',
            enquiries: user.enquiries || 0,
            testDrives: user.testDrives || 0,
            newOrders: user.newOrders || 0,
            cancellations: user.cancellations || 0,
            netOrders: user.netOrders || 0,
            retail: user.retail || 0,
          })),
          allIndiaBestPerformace: data.allIndiaBestPerformace || {
            enquiriesCount: 0,
            testDrivesCount: 0,
            newOrdersCount: 0,
            cancellationsCount: 0,
            retailCount: 0,
          },
          allIndiaRank: data.allIndiaRank || {
            enquiriesRank: 0,
            testDrivesRank: 0,
            newOrdersRank: 0,
            cancellationsRank: 0,
            retailRank: 0,
          },
        };

        // ✅ Update table data used in UI
        this.selectedUsersPerformance = this.dashboardMetrics.performance;
      },
      error: (err) => {
        console.error('Dashboard data fetch error', err);
      },
    });
  }

  onPs1Change() {
    if (!this.selectedPs1) {
      this.showRoleForm = false;
      this.roles = [];
      return;
    }

    // Fetch roles based on selected PS1
    this.http
      .get<any[]>(`https://your-api.com/api/roles?ps=${this.selectedPs1}`)
      .subscribe((data) => {
        this.roles = data;
        this.showRoleForm = true; // show form once roles arrive
      });
  }
  // onUserSelect(user: any) {
  //   this.selectedUser = user;
  //   this.showUserForm = false; // close modal on user select (optional)
  // }
  // getUserName(id: any): string {
  //   const user = this.users.find((u) => u.user_id === id);
  //   return user ? user.name : '';
  // }
  getUserName(id: any): string {
    if (!this.users || !Array.isArray(this.users)) return '';
    const user = this.users.find((u) => u.user_id.trim() === id.trim());
    return user ? user.name : '';
  }

  // selectUser(user: any): void {
  //   this.selectedPs1 = user.user_id;
  //   this.dropdownOpen = false;
  //   console.log('Selected User ID (PS1):', user.user_id); // 👈 logs the user ID
  // }
  // selectUser2(user: any) {
  //   this.selectedPs2 = user.user_id;
  //   this.dropdownOpen2 = false;
  //   console.log('Selected User ID (PS1):', user.user_id); // 👈 logs the user ID
  // }
  getKpiPercentage(key: string): number {
    const value = this.userData[key] || 0;
    return this.maxValue ? (value / this.maxValue) * 100 : 0;
  }
  //

  // Method to get KPI data for specific user and metric
  getKpiData(userId: any, kpiType: string): number {
    if (!userId || !this.kpiData[userId]) return 0;
    return this.kpiData[userId][kpiType] || 0;
  }

  // Load users from your API/service
  // loadUsers(): void {

  //   this.users = [
  //     { user_id: 1, name: 'John Doe' },
  //     { user_id: 2, name: 'Jane Smith' },
  //     { user_id: 3, name: 'Mike Johnson' },
  //   ];
  // }

  // Load KPI data for all users or initialize
  loadKpiData(): void {
    // Replace this with your actual API call
    // this.kpiService.getAllKpiData().subscribe(data => {
    //   this.kpiData = data;
    // });

    // Example data structure
    this.kpiData = {
      1: {
        enquiries: 25,
        testDrives: 15,
        newOrders: 12,
        cancellations: 3,
        netOrders: 9,
        retail: 8,
      },
      2: {
        enquiries: 30,
        testDrives: 20,
        newOrders: 18,
        cancellations: 2,
        netOrders: 16,
        retail: 14,
      },
      3: {
        enquiries: 18,
        testDrives: 10,
        newOrders: 8,
        cancellations: 1,
        netOrders: 7,
        retail: 6,
      },
    };
  }

  // Load KPI data for specific user (when user is selected)
  loadKpiDataForUser(userId: any): void {
    // Replace this with your actual API call
    // this.kpiService.getKpiDataForUser(userId).subscribe(data => {
    //   this.kpiData[userId] = data;
    // });

    // If data is not already loaded, you can fetch it here
    if (!this.kpiData[userId]) {
      // Make API call to fetch data for this specific user
      console.log(`Loading KPI data for user: ${userId}`);
    }
  }

  // Optional: Method to close dropdowns when clicking outside
  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: Event): void {
  //   const target = event.target as Element;
  //   if (!target.closest('.performance-panel')) {
  //     this.dropdownOpen = false;
  //     this.dropdownOpen2 = false;
  //   }
  // }

  // showUserDetails(userId: string, userName: string): void {
  //   const user = this.users.find((u) => u.user_id === userId);
  //   if (user) {
  //     this.selectedUser = { ...user, name: userName }; // Ensure name is correctly set
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0); // Normalize to start of day

  //     this.todayTestDrives = user.testDrives.filter((td: any) => {
  //       const tdDate = new Date(td.start_date);
  //       tdDate.setHours(0, 0, 0, 0);
  //       return tdDate.getTime() === today.getTime();
  //     });

  //     this.upcomingTestDrives = user.testDrives.filter((td: any) => {
  //       const tdDate = new Date(td.start_date);
  //       tdDate.setHours(0, 0, 0, 0);
  //       return tdDate.getTime() > today.getTime();
  //     });

  //     // For overdue test drives, filter and add to selectedUser
  //     this.selectedUser.overdueTestDrives = user.testDrives.filter(
  //       (td: any) => {
  //         const tdDate = new Date(td.start_date);
  //         tdDate.setHours(0, 0, 0, 0);
  //         return tdDate.getTime() < today.getTime();
  //       }
  //     );
  //   }
  // }
  applyTableFilters(): void {
    console.log('🔥 applyTableFilters called');
    console.log('searchText:', this.searchText);

    // 🔄 Handle test drive filters (today / oneWeek)
    let baseTestDrives: any[] = [];
    if (this.filterOption === 'today') {
      baseTestDrives = this.fullData?.tableTestDrives_today || [];
    } else if (this.filterOption === 'oneWeek') {
      baseTestDrives = this.fullData?.tableTestDrives_oneweek || [];
    }

    const selectedUserName = this.selectedUser?.name?.toLowerCase() || '';
    if (selectedUserName && !this.searchText && !this.selectedInitial) {
      baseTestDrives = baseTestDrives.filter(
        (td) => td.assigned_to?.toLowerCase() === selectedUserName
      );
    }

    this.testDrives = [...baseTestDrives];
    this.allTestDrives = [...baseTestDrives];

    // 🧠 Text search on test drives
    let tempTestDrives = [...this.allTestDrives];
    if (this.searchText) {
      const lowerSearch = this.searchText.toLowerCase();
      tempTestDrives = tempTestDrives.filter(
        (td) =>
          td.subject?.toLowerCase().includes(lowerSearch) ||
          td.name?.toLowerCase().includes(lowerSearch) ||
          td.VIN?.toLowerCase().includes(lowerSearch) ||
          td.PMI?.toLowerCase().includes(lowerSearch) ||
          td.assigned_to?.toLowerCase().includes(lowerSearch)
      );
    }

    this.filteredTableTestDrives = tempTestDrives;
    this.currentPage = 1;

    // ✅ Filter users based on initial and/or search text
    const searchLower = this.searchText?.toLowerCase() || '';
    const selectedInitial = this.selectedInitial?.toLowerCase() || '';

    // If we have a search text or initial, filter users accordingly
    if (searchLower || selectedInitial) {
      this.filteredUsers = this.allUsers.filter((user) => {
        const name = user.name?.toLowerCase() || '';
        return (
          (!selectedInitial || name.startsWith(selectedInitial)) &&
          (!searchLower || name.includes(searchLower))
        );
      });

      // Check if no users are found
      this.noResultsFound = this.filteredUsers.length === 0;
    } else {
      // If no search or initial filter is applied, show all users
      this.filteredUsers = [...this.allUsers];
      this.noResultsFound = false;
    }

    console.log('Filtered Users:', this.filteredUsers);
  }
  capitalizeAndFormatName(name: string): string {
    if (!name) return '';
    return name
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  }
  // fetchHierarchy() {
  //   const token = sessionStorage.getItem('token'); // 👈 get token from session storage

  //   if (!token) {
  //     console.error('Token not found in session storage');
  //     return;
  //   }

  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   };

  //   this.http
  //     .get('https://uat.smartassistapp.in/api/dealer/dealer/home/dashboard', {
  //       headers,
  //     })
  //     .subscribe({
  //       next: (res: any) => {
  //         if (res.status === 200 && res.data?.hierarchy) {
  //           this.hierarchy = res.data.hierarchy;
  //           console.log('Hierarchy:', this.hierarchy);
  //         } else {
  //           console.error('Unexpected response:', res);
  //         }
  //       },
  //       error: (err) => {
  //         console.error('HTTP error:', err);
  //       },
  //     });
  // }

  // calculateTotalPages(): void {
  //   this.totalPages = Math.ceil(
  //     this.filteredTableTestDrives.length / this.itemsPerPage
  //   );
  // }
  // onFilterOptionChange(): void {
  //   if (this.filterOption === 'today') {
  //     this.filteredTableTestDrives = [...this.testDrivesToday];
  //   } else if (this.filterOption === 'oneWeek') {
  //     this.filteredTableTestDrives = [...this.testDrivesOneWeek];
  //   }

  //   // Reset pagination (optional)
  //   this.currentPage = 1;
  // }

  fetchHierarchy() {
    const token = sessionStorage.getItem('token'); // 👈 get token from session storage

    if (!token) {
      console.error('Token not found in session storage');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // ✅ Use the selected filter dynamically, fallback to 'MTD' if not set
    const filterType = this.selectedFilter || 'MTD';

    this.http
      .get(
        `https://uat.smartassistapp.in/api/dealer/dealer/home-dashboard/new?type=${filterType}`,
        {
          headers,
        }
      )
      .subscribe({
        next: (res: any) => {
          if (res.status === 200 && res.data?.smData) {
            // this.hierarchy = res.data.smData;
            this.smData = res.data.smData;

            console.log('Updated hierarchy (from smData):', this.hierarchy);
          } else {
            console.error('Unexpected response:', res);
          }
        },

        error: (err) => {
          console.error('HTTP error:', err);
        },
      });
  }

  initializeFilters(): void {
    // Set default filter option and apply it
    this.filterOption = 'today';
    this.onFilterOptionChange();
  }

  // onFilterOptionChange(): void {
  //   if (this.filterOption === 'today') {
  //     this.filteredTableTestDrives = [...this.testDrivesToday];
  //   } else if (this.filterOption === 'oneWeek') {
  //     this.filteredTableTestDrives = [...this.testDrivesOneWeek];
  //   }

  //   this.currentPage = 1;
  // }

  onFilterOptionChange(): void {
    if (this.filterOption === 'today') {
      this.filteredTableTestDrives = [...this.testDrivesToday];
    } else if (this.filterOption === 'oneWeek') {
      this.filteredTableTestDrives = [...this.testDrivesOneWeek];
    } else {
      // this.filteredTableTestDrives = [...this.testDrivesAll]; // optional fallback
    }

    this.currentPage = 1; // ✅ always reset
  }

  // getPaginatedTableData(): any[] {
  //   // Your existing pagination logic here
  //   return this.filteredTableTestDrives; // Make sure this returns filtered data
  // }

  // paginateTableData(): void {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;

  // }
  get paginatedUsersPerformance(): any[] {
    const startIndex = (this.currentPageforCompare - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.selectedUsersPerformance.slice(startIndex, endIndex);
  }

  getPaginatedTableData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredTableTestDrives.slice(startIndex, endIndex);
  }

  loadCompareMetrics(userId: string, filter: string, isPs2: boolean = false) {
    const url = `https://uat.smartassistapp.in/api/dealer/dealer/updatedAnalysis/dashboard?userIds=${userId}&type=${filter}`;
    const token = sessionStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    this.http
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe(
        (res: any) => {
          const performance = res?.data?.performance?.[0];
          if (performance) {
            if (isPs2) {
              this.enquiriesCountPs2 = performance.enquiries;
              this.testDrivesCountPs2 = performance.testDrives;
              this.newOrdersCountPs2 = performance.newOrders;
              this.cancellationsCountPs2 = performance.cancellations;
              this.netOrdersCountPs2 = performance.netOrders;
              this.retailCountPs2 = performance.retail;
            } else {
              this.enquiriesCount = performance.enquiries;
              this.testDrivesCount = performance.testDrives;
              this.newOrdersCount = performance.newOrders;
              this.cancellationsCount = performance.cancellations;
              this.netOrdersCount = performance.netOrders;
              this.retailCount = performance.retail;
            }
          }
        },
        (error) => {
          console.error('Compare API error:', error);
        }
      );
  }

  loadTestDriveData() {
    const token = sessionStorage.getItem('token'); // or use localStorage if needed

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any>(
        'https://uat.smartassistapp.in/api/dealer/dealer/home/dashboard',
        { headers }
      )
      .subscribe({
        next: (response) => {
          console.log('API response for table:', response);

          this.testDrivesToday = response.data.tableTestDrives_today || [];
          this.testDrivesOneWeek = response.data.tableTestDrives_oneweek || [];

          this.allTestDrives = [
            ...this.testDrivesToday,
            ...this.testDrivesOneWeek,
          ];

          this.fullUsers = response.data.user || [];
          this.users = [...this.fullUsers];

          // ✅ Set default filter to Today
          this.filterOption = 'today';
          this.filteredTableTestDrives = [...this.testDrivesToday];

          // ✅ Reset pagination
          this.currentPage = 1;

          // ✅ 🔥 CRITICAL: update total pages
          this.totalPages = Math.ceil(
            this.filteredTableTestDrives.length / this.itemsPerPage
          );
        },
        error: (error) => {
          console.error('API error:', error);
        },
      });
  }
  changeCategory(category: string): void {
    this.activeCategory = category;
    // Call API or load data dynamically if needed
  }

  // changePeriod(period: string): void {
  //   this.activePeriod = period;
  // }
  // changePeriod(period: string): void {
  //   this.activePeriod = period;
  //   this.selectedPerformanceFilter = period;

  //   this.fetchSelectedUserData(); // 🔥 This is the only thing you need
  // }

  changePeriod(period: string): void {
    this.activePeriod = period;
    this.selectedPerformanceFilter = period;

    this.fetchPerformanceData(); // 🔥 only for performance
  }

  // Navigation for pagination
  // goToPage(page: number): void {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.currentPage = page;
  //   }
  // }

  // nextPage(): void {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //   }
  // }

  // prevPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //   }
  // }

  //

  fetchPerformanceData(): void {
    const userId = this.selectedUser?.ps_id;
    const smId = this.selectedSmId;
    const token = sessionStorage.getItem('token');

    if (!userId || !smId) return;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer/home-dashboard/new?user_id=${userId}&sm_id=${smId}&type=${this.selectedPerformanceFilter}`;

    this.http.get<any>(apiUrl, { headers }).subscribe({
      next: (res) => {
        if (res.status === 200 && res.data?.selectedUser?.performance) {
          this.selectedUser.performance = res.data.selectedUser.performance;
        }
      },
      error: (err) => {
        console.error('Error fetching performance:', err);
      },
    });
  }

  kpiMaxValues: { [key: string]: number } = {
    enquiries: 20, // Example: If the maximum enquiries any user can have is 20
    testDrives: 15, // Example: If max test drives is 15
    newOrders: 10,
    cancellations: 5,
    netOrders: 10,
    retail: 8,
  };

  getProgressBarWidth(value: number, kpi: string): number {
    const maxValue = this.kpiMaxValues[kpi] || 1; // Get the max value for this KPI, default to 1 to prevent division by zero
    if (value === undefined || value === null || value <= 0) {
      return 0; // If value is not set or zero/negative, bar width is 0
    }

    // Calculate percentage based on max value
    const percentage = (value / maxValue) * 100;
    // Cap at 100% to ensure bars don't exceed their container
    return Math.min(percentage, 100);
  }
  getProgressWidth(
    selectedUser: any,
    kpiType: string,
    otherUser: any,
    otherKpiType: string
  ): number {
    const currentValue = this.getKpiData(selectedUser, kpiType) || 0;
    const otherValue = this.getKpiData(otherUser, otherKpiType) || 0;

    const maxValue = Math.max(currentValue, otherValue);

    if (maxValue === 0) return 0;

    return (currentValue / maxValue) * 100;
  }
  // TODAY ATIONS
  // get totalPages(): number {
  //   return Math.ceil(this.users.length / this.usersPerPage);
  // }
  // get totalPages(): number {
  //   return Math.ceil(this.smData.length / this.pageSize);
  // }

  get pagesToShow(): (number | string)[] {
    const pages = [];
    const maxToShow = 5;
    if (this.totalPages <= maxToShow) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(
          1,
          '...',
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages
        );
      } else {
        pages.push(1, '...', this.currentPage, '...', this.totalPages);
      }
    }
    return pages;
  }

  goToPreviousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToPage(page: any) {
    if (typeof page === 'number') this.currentPage = page;
  }
  get paginatedSmData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.smData.slice(startIndex, endIndex);
  }

  // goToPreviousPage() {
  //   if (this.currentPage > 1) this.currentPage--;
  // }

  // goToNextPage() {
  //   if (this.currentPage < this.totalPages) this.currentPage++;
  // }

  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    return this.users.slice(startIndex, startIndex + this.usersPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
