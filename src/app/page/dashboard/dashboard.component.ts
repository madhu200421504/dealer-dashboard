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
  selectedPs1: string = '';
  selectedPs2: string = '';
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

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.fetchUsers();
    this.fetchDashboardData();

    console.log('Loading dashboard metrics with default filter Today');
    this.loadDashboardMetrics('Today');
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
}
