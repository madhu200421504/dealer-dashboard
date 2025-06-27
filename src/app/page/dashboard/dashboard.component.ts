import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  signal,
  WritableSignal,
  ChangeDetectorRef,
} from '@angular/core';
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
  SelectedUser,
  SelectedUserData,
  TestDrive,
  TodayTestDrive,
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
interface User {
  user_id: string;
  name: string;
  fname: string;
  lname: string;
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

  maxValue = 100;
  kpiData: any = {};
  noResultsFound: boolean = false;

  selectedSection: 'home' | 'analysis' = 'home';
  users: User[] = [];
  selectedUser: (SelectedUser & { name: string }) | null = null; // Extend SelectedUser with name
  selectedUserData: TestDrive[] = [];
  todayTestDrives: TodayTestDrive[] = [];
  // ps1Total = 0;
  // ps2Total = 0;
  upcomingTestDrives: TestDrive[] = [];
  overdueTestDrives: TestDrive[] = [];
  fullData: ApiResponse['data'] | null = null;
  reservations: any[] = []; // your original data array
  filteredReservations: any[] = []; // the filtered array to bind to the table
  filterOption: 'today' | 'oneWeek' = 'today';
  selectedType: string = ''; // Add this line to define selectedType
  selectedPs2UserId: string = '';
  pageSize: number = 10; // or whatever number of items per page you're showing

  testDrives: any[] = []; // <-- Declare testDrives here
  dashboardData: any = {
    tableTestDrives_today: [],
    tableTestDrives_oneweek: [],
  };
  isUserSelected = false;
  // ps1Total = 0;
  // ps2Total = 0;
  enquiriesCount = 0;
  testDrivesCount = 0;
  newOrdersCount = 0;
  totalPages: number = 1;

  enquiriesCountPs2 = 0;
  testDrivesCountPs2 = 0;
  newOrdersCountPs2 = 0;

  ps1Total = 0;
  ps2Total = 0;

  selectedFilter: string = ''; // Store the selected filter
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
  activeFilter: 'Today' | 'MTD' | 'QTD' | 'YTD' = 'Today'; // default value
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

  displayedUsers: any[] = [];
  initialsList: string[] = [];
  showUserModal = false;
  tickedUserInPs1: any = null;
  // showingLimit = 10;
  defaultLimit = 10;
  showingLimit = this.defaultLimit;
  // filteredUsers: any[] = [];

  // selectedUser: any = null;
  // displayedUsers: any[] = [];
  data: any; // <-- Add this line
  selectedOverdueIndex: number = 0;
  selectedTodayIndex: number = 0;
  ps2Performance: { [userId: string]: any } = {};

  selectedUpcomingIndex: number = 0;
  // selectedOverdueIndex: number = 0;
  groupedUsers: { [key: string]: any[] } = {}; // all grouped by initials
  displayedUserGroups: { [key: string]: any[] } = {}; // for displaying after search
  private _displayedUsers: any[] = [];
  selectedUserDetails: any;
  maxDriveCount: number = 0;
  indexes: number[] = [];
  // defaultLimit = 10;

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
    console.log('✅ DashboardComponent initialized');

    this.sidebarService.isOpen$.subscribe((open) => {
      this.isSidebarOpen = open;
    });
    this.fetchUsers();
    this.fetchDashboardData();
    this.loadTestDriveData();
    this.onFilterOptionChange(); // Apply default filter on load
    this.initializeFilters();

    this.searchText = '';
    this.filteredUsers = []; // start empty
    this.filteredTableTestDrives = this.data.tableTestDrives_today; // Make sure this line exists

    console.log('Loading dashboard metrics with default filter Today');
    this.loadDashboardMetrics('Today');
    console.log('DashboardComponent loaded');

    // Test with a valid user ID (from your API)
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

  selectSection(section: 'home' | 'analysis'): void {
    this.selectedSection = section;
  }
  // getUserInitials(name: string): string {
  //   if (!name) return '';

  //   const words = name.trim().split(' ');
  //   if (words.length === 1) {
  //     return words[0].substring(0, 2).toUpperCase(); // single word, get first 2 chars
  //   }

  //   return (words[0][0] + words[1][0]).toUpperCase(); // first letters of first and last name
  // }
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
  // get displayedUsers(): any[] {
  //   return this._displayedUsers;
  // }

  showUserDetails(userId: string, name: string) {
    console.log('Clicked user:', userId);
    this.selectedUserId = userId;

    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No auth token found');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<ApiResponse>(
        `https://uat.smartassistapp.in/api/dealer/dealer/home/dashboard?user_id=${userId}`,
        { headers }
      )
      .subscribe({
        next: (res) => {
          const selectedUserFromApi = res?.data?.selectedUser || null;

          if (selectedUserFromApi) {
            this.selectedUser = { ...selectedUserFromApi, name };

            // Use test drives directly from API
            this.todayTestDrives = selectedUserFromApi.todayTestDrives || [];
            this.upcomingTestDrives =
              selectedUserFromApi.upcomingTestDrives || [];
            this.overdueTestDrives =
              selectedUserFromApi.overdueTestDrives || [];

            this.selectedUserData = [
              ...this.todayTestDrives,
              ...this.upcomingTestDrives,
              ...this.overdueTestDrives,
            ];
            this.showUserModal = true;
          } else {
            this.selectedUser = null;
            this.todayTestDrives = [];
            this.upcomingTestDrives = [];
            this.overdueTestDrives = [];
            this.selectedUserData = [];
          }

          this.fullData = res.data;
          this.loadFilteredTestDrives(this.filterOption);

          // Remove or comment this if it overwrites test drive data
          // this.loadTestDrives(res.data);
        },
        error: (err) => {
          console.error('Failed to fetch user details', err);
        },
      });
  }

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
  selectUser(userId: string) {
    if (this.selectedPs2.includes(userId)) {
      console.warn('❌ User already selected in PS2, not assigning to PS1');
      return;
    }

    this.selectedPs1 = userId;
    this.dropdownOpen1 = false;

    if (this.activeFilter) {
      this.fetchPs1Data(userId, this.activeFilter); // ✅ PS1-specific method
    }
  }
  fetchPs1Data(userId: string, filterType: string) {
    const url = `https://uat.smartassistapp.in/api/dealer/dealer/analysis/dashboard?userIds=${userId}&type=${filterType}`;
    const token = sessionStorage.getItem('token');
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        const performance = data?.data?.performance?.[0];
        if (performance) {
          this.enquiriesCount = performance.enquiries ?? 0;
          this.testDrivesCount = performance.testDrives ?? 0;
          this.newOrdersCount = performance.newOrders ?? 0;
          this.cancellationsCount = performance.cancellations ?? 0;
          this.netOrdersCount = performance.netOrders ?? 0;
          this.retailCount = performance.retail ?? 0;
        }
      },
      error: (err) => console.error('PS1 API error:', err),
    });
  }
  fetchPs2Data(userId: string, filterType: string) {
    const url = `https://uat.smartassistapp.in/api/dealer/dealer/analysis/dashboard?userIds=${userId}&type=${filterType}`;
    const token = sessionStorage.getItem('token');
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        const performance = data?.data?.performance?.[0];
        if (performance) {
          this.enquiriesCountPs2 = performance.enquiries ?? 0;
          this.testDrivesCountPs2 = performance.testDrives ?? 0;
          this.newOrdersCountPs2 = performance.newOrders ?? 0;
          this.cancellationsCountPs2 = performance.cancellations ?? 0;
          this.netOrdersCountPs2 = performance.netOrders ?? 0;
          this.retailCountPs2 = performance.retail ?? 0;
        }
      },
      error: (err) => console.error('PS2 API error:', err),
    });
  }

  // Function to make the API call based on user and filter
  fetchFilteredData(userId: string, filterType: string) {
    const url = `https://uat.smartassistapp.in/api/dealer/dealer/analysis/dashboard?userIds=${userId}&type=${filterType}`;
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
    const url = `https://uat.smartassistapp.in/api/dealer/dealer/analysis/dashboard?userIds=${user.user_id}&type=${this.selectedFilter}`;
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
  onFilterChange(filter: string) {
    this.selectedFilter = filter;

    // ✅ Update PS1 if selected
    if (this.selectedPs1) {
      this.fetchCounts(this.selectedPs1, filter);
    }

    // ✅ Update PS2 users if selected
    if (this.selectedPs2 && this.selectedPs2.length > 0) {
      this.selectedPs2.forEach((userId) => {
        this.fetchCounts(userId, filter);
      });
    }
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

  // onFilterChange(newFilter: 'today' | 'oneWeek') {
  //   this.filterOption = newFilter;
  //   this.loadFilteredTestDrives(this.filterOption);
  // }

  onFilterClick(filter: 'Today' | 'MTD' | 'QTD' | 'YTD') {
    this.activeFilter = filter;

    // Your existing call
    this.loadDashboardMetrics(filter);

    // ✅ Add this to update PS1 performance data automatically
    if (this.selectedUserId) {
      this.loadCompareMetrics(this.selectedUserId, filter);
    }

    // ✅ Already added: update PS2 performance
    if (this.selectedPs2UserId) {
      this.loadCompareMetrics(this.selectedPs2UserId, filter, true);
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
  loadDashboardMetrics(filter: 'Today' | 'MTD' | 'QTD' | 'YTD') {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    let url = `https://uat.smartassistapp.in/api/dealer/dealer/analysis/dashboard`;
    if (filter !== 'Today') {
      url += `?type=${filter}`;
    }

    this.http.get<any>(url, { headers }).subscribe({
      next: (response) => {
        const data = response?.data || {};

        this.dashboardMetrics = {
          enquiries: data.enquiries || 0,
          testDrives: data.testDrives || 0,
          newOrders: data.newOrders || 0,
          cancellations: data.cancellations || 0,
          netOrders: data.netOrders || 0,
          retail: data.retail || 0,
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
      },
      error: (err) => {
        console.error('Dashboard data fetch error', err);
      },
    });
  }
  // onPsChange() {
  //   this.http
  //     .get<any[]>(
  //       `https://uat.smartassistapp.in/api/dealer/dealer-analysis?ps=${this.selectedPs}`
  //     )
  //     .subscribe((data) => {
  //       this.roles = data;
  //     });
  // }

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
  getUserName(id: any): string {
    const user = this.users.find((u) => u.user_id === id);
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
    }

    this.currentPage = 1;

    // ✅ THIS IS MISSING IN YOUR CODE
    this.totalPages = Math.ceil(
      this.filteredTableTestDrives.length / this.itemsPerPage
    );
  }

  // getPaginatedTableData(): any[] {
  //   // Your existing pagination logic here
  //   return this.filteredTableTestDrives; // Make sure this returns filtered data
  // }

  paginateTableData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    // Update the data source for your table to show only the current page's data
    // For simplicity, let's assume getFilteredTestDrives handles pagination
    // in the HTML directly based on filteredTableTestDrives
  }

  getPaginatedTableData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredTableTestDrives.slice(startIndex, endIndex);
  }
  loadCompareMetrics(userId: string, filter: string, isPs2: boolean = false) {
    const url = `https://uat.smartassistapp.in/api/dealer/dealer/analysis/dashboard?userIds=${userId}&type=${filter}`;
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
          this.currentPage = 1; // reset pagination if applicable
        },
        error: (error) => {
          console.error('API error:', error);
        },
      });
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
