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
  selectedSection: string = 'home';
  users: User[] = [];
  selectedUserData: any[] = []; // or type it better if you know the structure

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  selectSection(section: string): void {
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
      .get<any>('https://uat.smartassistapp.in/api/dealer/dealer-Home', {
        headers,
      })
      .subscribe({
        next: (res) => {
          console.log('API response:', res);
          this.users = res.data?.user || [];
        },
        error: (err) => {
          console.error('Failed to fetch users:', err);
        },
      });
  }

  showUserDetails(userId: string, name: string) {
    console.log('Clicked user:', userId);

    const token = sessionStorage.getItem('token'); // or localStorage.getItem('token');
    console.log('Token:', token);

    if (!token) {
      console.error('No auth token found');
      return; // Stop the request if no token
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any>(
        `https://uat.smartassistapp.in/api/dealer/dealer-Home?user_id=${userId}`,
        { headers }
      )
      .subscribe({
        next: (res) => {
          const selectedUser = res?.data?.selectedUser;

          this.selectedUserData = [
            ...selectedUser.todayTestDrives,
            ...selectedUser.upcomingTestDrives,
            ...selectedUser.overdueTestDrives,
          ];

          console.log('Selected user test drives:', this.selectedUserData);
        },
        error: (err) => {
          console.error('Failed to fetch user details', err);
        },
      });
  }
}
