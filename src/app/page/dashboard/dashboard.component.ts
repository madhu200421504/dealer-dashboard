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
import { Chart, ChartType, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import {
  LineController,
  LineElement,
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
  TestDrive,
} from '../../model/interface/master';
import { ActivatedRoute } from '@angular/router';

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

  maxValue = 100;
  kpiData: any = {};

  selectedSection: 'home' | 'analysis' = 'home';
  users: User[] = [];
  selectedUser: (SelectedUser & { name: string }) | null = null; // Extend SelectedUser with name
  selectedUserData: TestDrive[] = [];
  todayTestDrives: TestDrive[] = [];
  upcomingTestDrives: TestDrive[] = [];
  overdueTestDrives: TestDrive[] = [];
  fullData: ApiResponse['data'] | null = null;
  reservations: any[] = []; // your original data array
  filteredReservations: any[] = []; // the filtered array to bind to the table
  filterOption: 'today' | 'oneWeek' | 'all' = 'today'; // Add this line here
  testDrives: any[] = []; // <-- Declare testDrives here
  dashboardData: any = {
    tableTestDrives_today: [],
    tableTestDrives_oneweek: [],
  };
  showUserForm = false;
  dropdownOpen = false;
  hoveredUser: any = null;
  allTestDrives: any[] = []; // To hold all test drive data for the table

  selectedPs1: any = '';
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
  selectedPs2: string[] = [];

  ps1Progress: number = 0;
  ps2Progress: number = 0;
  ps1Value: number = 0;
  ps2Value: number = 0;
  dropdownOpen2 = false;
  maxCount: number = 100; // Declare maxCount here with an initial value

  searchText: string = ''; // For search functionality
  itemsPerPage: number = 5; // You can adjust this number
  // totalPages: number = 0;
  filteredTableTestDrives: any[] = []; // <--- ADD THIS PROPERTY
  ps1Count = 0;
  ps2Count = 0;
  ps2Available: boolean = false; // Holds boolean if PS2 count > 0  maxCount = 100;
  psList: any[] = [];
  roles: any[] = [];
  selectedPs: string = '';
  selectedRole: string = '';
  showRoleForm: boolean = false;
  selectedUserId = '';
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
  usersPerPage = 40;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.fetchUsers();
    this.fetchDashboardData();

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

  selectSection(section: 'home' | 'analysis'): void {
    this.selectedSection = section;
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
      .get<ApiResponse>(
        'https://uat.smartassistapp.in/api/dealer/dealer-Home',
        { headers }
      )
      .subscribe({
        next: (res) => {
          console.log('API response:', res);
          this.users = res.data?.user || [];
          this.fullData = res.data;
        },
        error: (err) => {
          console.error('Failed to fetch users:', err);
        },
      });
  }

  showUserDetails(userId: string, name: string) {
    console.log('Clicked user:', userId);

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
        `https://uat.smartassistapp.in/api/dealer/dealer-Home?user_id=${userId}`,
        { headers }
      )
      .subscribe({
        next: (res) => {
          console.log('Full API response:', res);
          console.log('selectedUser:', res.data.selectedUser);

          const selectedUserFromApi = res?.data?.selectedUser || null;
          if (selectedUserFromApi) {
            this.selectedUser = {
              ...selectedUserFromApi,
              name, // <-- add the user name here explicitly
            };
            this.selectedUserData = [
              ...this.selectedUser.todayTestDrives,
              ...this.selectedUser.upcomingTestDrives,
              ...this.selectedUser.overdueTestDrives,
            ];
          } else {
            this.selectedUser = null;
            this.selectedUserData = [];
          }

          // *** ADD THESE TWO LINES RIGHT HERE ***
          this.fullData = res.data; // save full data to use for filtering
          this.loadFilteredTestDrives(this.filterOption); // load filtered test drives (default 'today')

          if (res.data?.tableTestDrives_today && this.selectedUser) {
            this.loadTestDrives(res.data);
          }
        },
        error: (err) => {
          console.error('Failed to fetch user details', err);
        },
      });
  }
  selectUser(userId: string) {
    this.selectedPs1 = userId; // or selectedUserId depending on your variable name
    console.log('Selected User ID on selectUser:', userId);
    this.fetchCounts(userId);
    this.dropdownOpen = false; // close dropdown after selection
  }

  fetchCounts(userId: string) {
    const url = `https://uat.smartassistapp.in/api/dealer/dealer-analysis?userIds=${userId}`;

    const token = sessionStorage.getItem('token'); // or 'access_token' based on your app
    if (!token) {
      console.error('No token found in sessionStorage');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    console.log('Calling API with URL:', url);

    this.http.get<{ ps1: number; ps2: number }>(url, { headers }).subscribe({
      next: (data) => {
        console.log('API response:', data);
        this.ps1Count = data.ps1;
        this.ps2Count = data.ps2;
        this.ps2Available = this.ps2Count > 0;
        this.maxCount = Math.max(this.ps1Count, this.ps2Count, 100);
      },
      error: (error) => {
        console.error('API error:', error);
      },
    });
  }

  get ps1WidthPercent() {
    return (this.ps1Count / this.maxCount) * 100;
  }

  get ps2WidthPercent() {
    return (this.ps2Count / this.maxCount) * 100;
  }
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
  // Call the API with built userIds parameter
  callApi() {
    const userIdsParam = this.buildUserIdsParam();
    const apiUrl = `https://uat.smartassistapp.in/api/dealer/dealer-analysis?userIds=${encodeURIComponent(
      userIdsParam
    )}`;

    // Get token from sessionStorage
    const token = sessionStorage.getItem('authToken') || '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // adjust if your backend uses a different scheme
      'Content-Type': 'application/json',
    });

    this.http.get(apiUrl, { headers }).subscribe(
      (response) => {
        console.log('API Response:', response);
        // handle response here
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  selectUser2(userId: string) {
    // toggle userId in selectedPs2 array
    const index = this.selectedPs2.indexOf(userId);
    if (index === -1) {
      this.selectedPs2.push(userId);
    } else {
      this.selectedPs2.splice(index, 1);
    }
    this.callApi();
  }
  // Example method to select PS1 user
  selectPs1(userId: string) {
    this.selectedPs1 = userId;
    this.selectedPs2 = []; // Clear PS2 selection when PS1 is selected
    this.callApi();
  }

  selectPs2(userId: string) {
    this.selectedPs2 = [userId]; // Selecting one PS2 user at a time for now
    this.callApi();
  }
  loadTestDrives(data: ApiResponse['data']) {
    if (!this.selectedUser) return;

    const selectedUserName = this.selectedUser.name.toLowerCase();

    // Filter full test drives data for today by assigned_to (case-insensitive)
    this.todayTestDrives = data.tableTestDrives_today.filter(
      (td) => td.assigned_to?.toLowerCase() === selectedUserName
    );

    // Use upcoming test drives from selectedUser (or empty array)
    this.upcomingTestDrives = this.selectedUser.upcomingTestDrives || [];
  }
  loadFilteredTestDrives(filter: 'today' | 'oneWeek' | 'all') {
    if (!this.fullData || !this.selectedUser) {
      this.testDrives = [];
      return;
    }

    const selectedUserName = this.selectedUser.name.toLowerCase();

    if (filter === 'today') {
      this.testDrives = (this.fullData.tableTestDrives_today || []).filter(
        (td) => td.assigned_to?.toLowerCase() === selectedUserName
      );
    } else if (filter === 'oneWeek') {
      this.testDrives = (this.fullData.tableTestDrives_oneweek || []).filter(
        (td) => td.assigned_to?.toLowerCase() === selectedUserName
      );
    } else if (filter === 'all') {
      this.testDrives = [
        ...(this.fullData.tableTestDrives_today || []),
        ...(this.fullData.tableTestDrives_oneweek || []),
      ].filter((td) => td.assigned_to?.toLowerCase() === selectedUserName);
    }
  }
  onFilterChange(newFilter: 'today' | 'oneWeek' | 'all') {
    this.filterOption = newFilter;
    this.loadFilteredTestDrives(this.filterOption);
  }

  onFilterClick(filter: 'Today' | 'MTD' | 'QTD' | 'YTD') {
    this.activeFilter = filter;
    this.loadDashboardMetrics(filter);
  }

  loadUsers() {
    // Example API call based on filterOption
    let apiUrl = '';

    if (this.filterOption === 'today') {
      apiUrl = 'https://your-api.com/users?filter=today';
    } else if (this.filterOption === 'oneWeek') {
      apiUrl = 'https://your-api.com/users?filter=oneWeek';
    } else {
      apiUrl = 'https://your-api.com/users?filter=all';
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
      .get('https://uat.smartassistapp.in/api/dealer/dealer-Home', { headers })
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
      case 'all':
        return [
          ...(this.dashboardData.tableTestDrives_today || []),
          ...(this.dashboardData.tableTestDrives_oneweek || []),
        ];
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

    let url = `https://uat.smartassistapp.in/api/dealer/dealer-analysis`;
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
    let tempTestDrives = [...this.allTestDrives]; // Start with all test drives

    // Apply search filter
    if (this.searchText) {
      const lowerCaseSearchText = this.searchText.toLowerCase();
      tempTestDrives = tempTestDrives.filter(
        (td) =>
          td.subject.toLowerCase().includes(lowerCaseSearchText) ||
          td.name.toLowerCase().includes(lowerCaseSearchText) ||
          td.VIN.toLowerCase().includes(lowerCaseSearchText) ||
          td.PMI.toLowerCase().includes(lowerCaseSearchText) ||
          td.assigned_to.toLowerCase().includes(lowerCaseSearchText)
      );
    }

    // Apply date filter (Today, One Week, All)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 7);

    if (this.filterOption === 'today') {
      tempTestDrives = tempTestDrives.filter((td) => {
        const tdDate = new Date(td.start_date);
        tdDate.setHours(0, 0, 0, 0);
        return tdDate.getTime() === today.getTime();
      });
    } else if (this.filterOption === 'oneWeek') {
      tempTestDrives = tempTestDrives.filter((td) => {
        const tdDate = new Date(td.start_date);
        tdDate.setHours(0, 0, 0, 0);
        return (
          tdDate.getTime() >= today.getTime() &&
          tdDate.getTime() <= oneWeekLater.getTime()
        );
      });
    }
    // 'all' option doesn't require further filtering by date

    this.filteredTableTestDrives = tempTestDrives;
    this.currentPage = 1; // Reset to first page on filter/search change
    // this.calculateTotalPages();
    this.paginateTableData();
  }

  // calculateTotalPages(): void {
  //   this.totalPages = Math.ceil(
  //     this.filteredTableTestDrives.length / this.itemsPerPage
  //   );
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
  get totalPages(): number {
    return Math.ceil(this.users.length / this.usersPerPage);
  }

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
