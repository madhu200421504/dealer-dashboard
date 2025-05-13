import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
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
import { FormsModule } from '@angular/forms'; // Add this import
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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  // dashboardData: any;
  // displayedData = [
  //   {
  //     dealer_name: 'Sonali',
  //     dealer_code: 28,
  //     MTD: { value: 5 },
  //     QTD: { value: 8 },
  //     YTD: { value: 12 },
  //     value: 5,
  //     rank: 1,
  //   },
  //   {
  //     dealer_name: 'Mastafa',
  //     dealer_code: 30,
  //     MTD: { value: 3 },
  //     QTD: { value: 7 },
  //     YTD: { value: 10 },
  //     value: 3,
  //     rank: 2,
  //   },
  // ];
  totalLeads = signal<number>(0);
  totalTestDrives = signal<number>(0);
  totalOrders = signal<number>(0);
  prevLeads = signal<number>(0);
  prevTestDrives = signal<number>(0);
  prevOrders = signal<number>(0);
  selectedOption: string = 'leads-MTD'; // Default filter option
  testDrives: number = 0;
  displayedData: any[] = []; // To hold the data to display in the table
  filteredData: any[] = []; // Initially set as an empty array to avoid errors
  mtdTestDrives = signal<number>(0);
  qtdTestDrives = signal<number>(0);

  ytdTestDrives = signal<number>(0);

  mtdOrders = signal<number>(0);
  qtdOrders = signal<number>(0);
  ytdOrders = signal<number>(0);

  mtdLeads = signal<number>(0);
  qtdLeads = signal<number>(0);

  ytdLeads = signal<number>(0);
  selectedPeriod: string = 'MTD'; // default selected period
  dashboardData: any = {}; // empty at start

  sidebarTestDrives = signal<number>(0);
  sidebarOrders = signal<number>(0);
  sidebarLeads = signal<number>(0);
  private pieChartInstance: any;
  leadsData: any = {}; // Holds your backend data
  chart: any; // Reference to the chart
  miniChart: any;
  graphPath: string = ''; // To store the SVG path data
  leadsChange: number = 0;
  testDrivesChange: number = 0;
  ordersChange: number = 0;
  currentLeads: number = 0; // Dynamically set this from your API
  previousLeads: number = 0; // Dynamically set this from your API
  change: number = 0; // Initialize with a default value, such as 0
  doughnutChart: any;

  // selectedOption: string = 'leads'; // Default selected option to show 'leads' data
  maxValue: number = 0;
  // selectedPeriod: string = 'MTD'; // for MTD, QTD, YTD dropdown
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}
  data: any; // To hold your data
  apiUrl: string = 'https://uat.smartassistapp.in/api/dealer/dealer/dashboard';

  dealersData: any[] = []; // Array to hold the dealer data
  ngOnInit() {
    this.fetchDashboardData('MTD');
    this.fetchDashboardData();
    this.maxValue =
      Math.max(...this.displayedData.map((item) => item.value)) || 1;
    this.fetchData();
    console.log('Selected Period:', this.selectedPeriod); // Log the selected period

    this.updateDataBasedOnSelection(); // Load initial data for default dropdown
    this.updateDataBasedOnSelection();
  }

  ngAfterViewInit() {
    // Ensure pie chart is created only once on initial load or when data changes
    if (this.totalTestDrives() && this.totalOrders()) {
      this.createDoughnutChart(this.totalTestDrives(), this.totalOrders()); // 👈 changed
    }
    this.initLineChart();
  }

  // applyFilter(filter: string) {
  //   this.selectedFilter.set(filter);
  //   // this.fetchDashboardDataForTable(filter); // fetch table data if needed

  //   this.fetchDashboardDataForTopCards(filter); // This updates only the top cards.
  // }

  // fetchDashboardData(filter: string = 'MTD') {
  //   const token =
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZTlkNjU5ZC02MDJmLTQwOWMtODY4Yi1iZTk2ZmM2MWEzZDEiLCJyb2xlIjoiU3VwZXJBZG1pbiIsInVzZXJFbWFpbCI6InNvbmFtLmNoYXVkaGFyeUBhcmlhbnRlY2hzb2x1dGlvbnMuY29tIiwiaWF0IjoxNzQ1MTM2NDM3LCJleHAiOjE3NDUxNDAwMzd9.hHojG8I2jM23yYCDUdqadkbsxC8A5OgrVWkh0uKAFmM';
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   this.http
  //     .get(
  //       `https://uat.smartassistapp.in/api/superAdmin/superAdmin-dashboardd?filter=${filter}`,
  //       { headers }
  //     )
  //     .subscribe(
  //       (response: any) => {
  //         if (response && response.status === 200) {
  //           const data = response.data;

  //           // Get filtered values based on selected filter (e.g., MTD, QTD, YTD)
  //           const testDrivesForFilter = data.testDrives[filter]?.value || 0;
  //           const leadsForFilter = data.leads[filter]?.value || 0;
  //           const ordersForFilter = data.orders[filter]?.value || 0;

  //           // Update the signals with filtered data
  //           this.totalLeads.set(leadsForFilter);
  //           this.totalTestDrives.set(testDrivesForFilter);
  //           this.totalOrders.set(ordersForFilter);

  //           // Update the pie chart with new values
  //           this.createPieChart(testDrivesForFilter, ordersForFilter);

  //           // Prepare the data for table display (simulating)
  //           this.displayedData = data.tableData || []; // Assuming `tableData` is part of the response
  //         } else {
  //           console.error(
  //             'Error fetching data:',
  //             response.message || 'Unknown error'
  //           );
  //         }
  //       },
  //       (error) => {
  //         console.error('Error fetching data:', error);
  //       }
  //     );
  // }
  // Inside your fetchDashboardData method
  // Fetch the MTD values and total values properly
  // fetchDashboardData(filter: string = 'leads', period: string = 'MTD') {
  //   const token = sessionStorage.getItem('token');

  //   if (!token) {
  //     console.error('No token found!');
  //     return;
  //   }

  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   this.http
  //     .get(
  //       `https://uat.smartassistapp.in/api/superAdmin/superAdmin-dashboardd?filter=${filter}&period=${period}`,
  //       { headers }
  //     )
  //     .subscribe(
  //       (response: any) => {
  //         console.log('API Response:', response);
  //         console.log('Leads:', response.leads); // To ensure the data structure is correct

  //         // Assign correct values from the API response
  //         this.currentLeads = response.leads.current; // 5 from the API response
  //         this.previousLeads = response.leads.previous; // 0 from the API response

  //         if (response && response.status === 200 && response.data) {
  //           const data = response.data;
  //           const rankings = data.rankings || {};

  //           // Set all MTD, QTD, YTD values correctly
  //           this.mtdLeads.set(data.leads?.MTD?.value || 0);
  //           this.qtdLeads.set(data.leads?.QTD?.value || 0);
  //           this.ytdLeads.set(data.leads?.YTD?.value || 0);

  //           this.mtdTestDrives.set(data.testDrives?.MTD?.value || 0);
  //           this.qtdTestDrives.set(data.testDrives?.QTD?.value || 0);
  //           this.ytdTestDrives.set(data.testDrives?.YTD?.value || 0);

  //           this.mtdOrders.set(data.orders?.MTD?.value || 0);
  //           this.qtdOrders.set(data.orders?.QTD?.value || 0);
  //           this.ytdOrders.set(data.orders?.YTD?.value || 0);

  //           this.prevLeads.set(data.leads?.previous || 0);
  //           this.prevTestDrives.set(data.testDrives?.previous || 0);
  //           this.prevOrders.set(data.orders?.previous || 0);

  //           // Total Values for sidebar & pie
  //           const totalTestDrives = data.totalTestDrives || 0;
  //           const totalOrders = data.totalOrders || 0;
  //           const totalLeads = data.leads?.current || 0;

  //           this.sidebarTestDrives.set(totalTestDrives);
  //           this.sidebarOrders.set(totalOrders);
  //           this.sidebarLeads.set(totalLeads);

  //           this.updatePieChart(totalTestDrives, totalOrders);

  //           // Update table
  //           if (filter === 'testDrives') {
  //             this.displayedData = rankings.testDrives || [];
  //           } else if (filter === 'leads') {
  //             this.displayedData = rankings.leads || [];
  //           } else if (filter === 'orders') {
  //             this.displayedData = rankings.orders || [];
  //           } else {
  //             this.displayedData = data.tableData || [];
  //           }

  //           console.log('Displayed Data:', this.displayedData);

  //           // Max Value
  //           this.maxValue = Math.max(
  //             ...this.displayedData.map((item) => item.value)
  //           );

  //           console.log('Max Value:', this.maxValue);

  //           // Render chart
  //           this.renderChart(data);

  //           // Force change detection
  //           this.cdr.detectChanges();
  //         } else {
  //           console.error(
  //             'Error fetching data:',
  //             response.message || 'Unknown error'
  //           );
  //         }
  //       },
  //       (error) => {
  //         console.error('Error fetching data:', error);
  //       }
  //     );
  // }
  fetchDashboardData(filter: string = 'leads', period: string = 'MTD') {
    const token = sessionStorage.getItem('token');

    if (!token) {
      console.error('No token found!');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get(
        `https://uat.smartassistapp.in/api/dealer/dealer/dashboard?filter=${filter}&period=${period}`,
        { headers }
      )
      .subscribe(
        (response: any) => {
          console.log('API Response:', response);

          // Safe access with fallback values
          const leads = response.leads || {};
          const testDrives = response.testDrives || {};
          const orders = response.orders || {};

          console.log('Leads:', leads);
          this.change = leads.change; // Make sure this is set correctly

          this.currentLeads = leads.current || 0;
          this.previousLeads = leads.previous || 0;

          if (response && response.status === 200 && response.data) {
            const data = response.data;
            const rankings = data.rankings || {};

            this.mtdLeads.set(data.leads?.MTD?.value || 0);
            this.qtdLeads.set(data.leads?.QTD?.value || 0);
            this.ytdLeads.set(data.leads?.YTD?.value || 0);

            this.mtdTestDrives.set(data.testDrives?.MTD?.value || 0);
            this.qtdTestDrives.set(data.testDrives?.QTD?.value || 0);
            this.ytdTestDrives.set(data.testDrives?.YTD?.value || 0);

            this.mtdOrders.set(data.orders?.MTD?.value || 0);
            this.qtdOrders.set(data.orders?.QTD?.value || 0);
            this.ytdOrders.set(data.orders?.YTD?.value || 0);

            this.prevLeads.set(data.leads?.previous || 0);
            this.prevTestDrives.set(data.testDrives?.previous || 0);
            this.prevOrders.set(data.orders?.previous || 0);

            const totalTestDrives = data.totalTestDrives || 0;
            const totalOrders = data.totalOrders || 0;
            const totalLeads = data.leads?.current || 0;

            this.sidebarTestDrives.set(totalTestDrives);
            this.sidebarOrders.set(totalOrders);
            this.sidebarLeads.set(totalLeads);

            this.updatePieChart(totalTestDrives, totalOrders);

            if (filter === 'testDrives') {
              this.displayedData = rankings.testDrives || [];
            } else if (filter === 'leads') {
              this.displayedData = rankings.leads || [];
            } else if (filter === 'orders') {
              this.displayedData = rankings.orders || [];
            } else {
              this.displayedData = data.tableData || [];
            }

            console.log('Displayed Data:', this.displayedData);

            this.maxValue = Math.max(
              ...this.displayedData.map((item) => item.value)
            );
            console.log('Max Value:', this.maxValue);

            this.renderChart(data);
            this.cdr.detectChanges();
          } else {
            console.error(
              'Error fetching data:',
              response.message || 'Unknown error'
            );
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  initLineChart() {
    const ctx: any = document.getElementById('enquiryLineChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'], // sample months
        datasets: [
          {
            data: [3, 5, 7, 4], // Replace with dynamic values if needed
            borderColor: '#4CAF50',
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }, // ✅ Enable this
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      },
    });
  }
  // CODE FOR LINE GRPAH ON THREEE CARDS
  renderChart(data: any): void {
    // Sample data extraction (adjust as per your API response)
    const chartData = {
      labels: ['Leads', 'Test Drives', 'Orders'], // X-Axis labels
      datasets: [
        {
          label: 'MTD Data',
          data: [data.mtdLeads, data.mtdTestDrives, data.mtdOrders], // Y-Axis data
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
          borderColor: ['#FF5733', '#33FF57', '#3357FF'],
          borderWidth: 1,
        },
      ],
    };

    this.chart = new Chart('myColumnChart', {
      type: 'bar', // Change to 'bar' for column chart
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context: any) => `${context.label}: ${context.raw}`,
            },
          },
        },
      },
    });
  }

  fetchData(): void {
    this.http
      .get<any>('https://uat.smartassistapp.in/api/dealer/dealer/dashboard')
      .subscribe(
        (response) => {
          console.log('API Response:', response); // Log the response to check its structure
          if (response?.data) {
            this.data = response.data; // Assign the 'data' part of the response
            console.log('Data after assignment:', this.data); // Check if `this.data` is populated correctly
          } else {
            console.error('No data in response:', response);
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  getLeadChange() {
    console.log('Data:', this.data); // Log the entire data object
    console.log('Lead Change:', this.data?.leads?.change); // Log the specific change value

    if (this.data?.leads?.change) {
      return this.data.leads.change; // This should return 100 based on your API response
    }
    return 0;
  }

  getChangePercentage(): number {
    return this.data?.leads?.change || 0; // Default to 0 if not available
  }

  // Method to return filtered leads (you can adjust this based on your logic)
  // getFilteredLeads(): number {
  //   return this.data ? this.data.leads.current : 0; // Example logic to return leads count
  // }

  // getPercentageChange(): number {
  //   console.log('Current Leads:', this.currentLeads);
  //   console.log('Previous Leads:', this.previousLeads);

  //   // Check if previous leads is 0 to avoid division by zero
  //   if (this.previousLeads === 0) {
  //     if (this.currentLeads === 0) {
  //       return 0; // No change if both are 0
  //     }
  //     return 100; // 100% change if previous leads is 0 and current is non-zero
  //   }

  //   // Calculate the percentage change
  //   const change =
  //     ((this.currentLeads - this.previousLeads) / this.previousLeads) * 100;
  //   return Math.round(change); // Round to nearest integer
  // }
  getLeadPercentageChange(): number {
    console.log(this.dashboardData);
    console.log(this.dashboardData?.leads?.change);

    // Update this to match your actual data structure
    // This could be this.dashboardData.leads.change or whatever matches your structure
    return this.dashboardData?.leads?.change || 0;

    // Alternatively, if you're storing the values separately:
    // return this.leadsChange || 100;
  }

  // loadLeadsData() {
  //   this.http
  //     .get<any>(
  //       'https://uat.smartassistapp.in/api/superAdmin/superAdmin-dashboardd'
  //     )
  //     .subscribe((res) => {
  //       this.leadsData = res.leads;
  //       this.updateMiniChart();
  //     });
  // }

  // initMiniChart() {
  //   const ctx = document.getElementById('miniLeadsChart') as HTMLCanvasElement;
  //   this.miniChart = new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //       labels: ['Prev', 'Now'],
  //       datasets: [
  //         {
  //           data: [0, 0],
  //           borderColor: '#28a745',
  //           backgroundColor: 'transparent',
  //           borderWidth: 2,
  //           tension: 0.4,
  //           pointRadius: 0,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: false,
  //       plugins: {
  //         legend: { display: false },
  //         tooltip: { enabled: false },
  //       },
  //       scales: {
  //         x: { display: false },
  //         y: { display: false },
  //       },
  //     },
  //   });
  // }

  // updateMiniChart() {
  //   const previous = this.leadsData.previous || 0;
  //   const current = this.leadsData.MTD?.value || 0;

  //   this.miniChart.data.datasets[0].data = [previous, current];
  //   this.miniChart.update();
  // }

  // Return the currently selected filter

  // mtdLeads() {
  //   return this.leadsData?.MTD?.value || 0;
  // }

  // prevLeads() {
  //   return this.leadsData?.previous || 0;
  // }

  // getColor(val: number) {
  //   return val > 0 ? 'green' : 'gray';
  // }

  // initLineChart(labels: string[], values: number[]) {
  //   const ctx: any = document.getElementById('enquiryLineChart');

  //   if (this.lineChartInstance) {
  //     this.lineChartInstance.data.labels = labels;
  //     this.lineChartInstance.data.datasets[0].data = values;
  //     this.lineChartInstance.update();
  //   } else {
  //     this.lineChartInstance = new Chart(ctx, {
  //       type: 'line',
  //       data: {
  //         labels,
  //         datasets: [
  //           {
  //             label: 'Leads',
  //             data: values,
  //             borderColor: '#4CAF50',
  //             tension: 0.4,
  //             pointRadius: 3,
  //             borderWidth: 2,
  //           },
  //         ],
  //       },
  //       options: {
  //         responsive: true,
  //         plugins: { legend: { display: true }, tooltip: { enabled: true } },
  //         scales: {
  //           x: { title: { display: true, text: 'Month' } },
  //           y: { title: { display: true, text: 'Leads' } },
  //         },
  //       },
  //     });
  //   }
  // }
  updateData(data: any) {
    switch (this.selectedOption) {
      case 'leads':
        this.displayedData = data.rankings.leads; // Update table data for leads
        break;
      case 'testDrives':
        this.displayedData = data.rankings.testDrives; // Update table data for testDrives
        break;
      case 'orders':
        this.displayedData = data.rankings.orders; // Update table data for orders
        break;
      default:
        this.displayedData = data.rankings.leads; // Default to "leads"
    }

    // Update maxValue for chart rendering (based on displayed data)
    this.maxValue =
      Math.max(...this.displayedData.map((item) => item.value)) || 1;
  }

  getChangeData(
    current: number,
    previous: number
  ): { value: string; color: string } {
    if (previous === null || previous === undefined) {
      return { value: 'No data', color: 'text-muted' };
    }

    if (previous === 0) {
      if (current === 0) {
        return { value: '-0%', color: 'text-danger' }; // Apply text-danger for -0%
      }
      const sign = current > 0 ? '+' : '-';
      const color = current > 0 ? 'text-success' : 'text-danger';
      return { value: `${sign}100%`, color };
    }

    const change = ((current - previous) / previous) * 100;
    const sign = change > 0 ? '+' : change < 0 ? '-' : '';
    const color =
      change > 0 ? 'text-success' : change < 0 ? 'text-danger' : 'text-muted';

    // Modify this part to return '-0%' for 0% change, and apply red color for -0%
    if (change === 0) {
      return { value: '-0%', color: 'text-danger' }; // Apply text-danger for -0%
    }

    return {
      value: `${sign}${Math.abs(change).toFixed(1)}%`,
      color,
    };
  }

  // updateDataBasedOnSelection() {
  //   const [type, range] = this.selectedOption.split('-'); // e.g. "leads", "MTD"

  //   // Retrieve the token from sessionStorage
  //   const token = sessionStorage.getItem('token'); // Correct retrieval of token

  //   if (!token) {
  //     console.error('No token found!');
  //     return;
  //   }

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   this.http
  //     .get<any>(
  //       `https://uat.smartassistapp.in/api/superAdmin/superAdmin-dashboardd/?type=${type}&range=${range}`,
  //       { headers }
  //     )
  //     .subscribe(
  //       (response) => {
  //         console.log('Response received:', response); // Log the full response to see the structure

  //         if (response && response.data) {
  //           // Handle different types of data based on selected option
  //           if (type === 'testDrives') {
  //             this.displayedData = response.data.rankings.testDrives || []; // Use the correct path to testDrives data
  //           } else if (type === 'leads') {
  //             this.displayedData = response.data.rankings.leads || []; // Use leads data
  //           } else if (type === 'orders') {
  //             this.displayedData = response.data.rankings.orders || []; // Use orders data
  //           }
  //         } else {
  //           console.error('No data found in response!');
  //           this.displayedData = []; // Handle case where there's no data
  //         }
  //       },
  //       (error) => {
  //         console.error('Error fetching data:', error);
  //         this.displayedData = []; // Handle error gracefully
  //       }
  //     );
  // }

  getFilteredLeads(): number {
    console.log('Selected Period:', this.selectedPeriod); // Log the selected period

    switch (this.selectedPeriod) {
      case 'MTD':
        return this.mtdLeads();
      case 'QTD':
        return this.qtdLeads();
      case 'YTD':
        return this.ytdLeads();
      default:
        return 0;
    }
  }

  getFilteredTestDrives(): number {
    switch (this.selectedPeriod) {
      case 'MTD':
        return this.mtdTestDrives();
      case 'QTD':
        return this.qtdTestDrives();
      case 'YTD':
        return this.ytdTestDrives();
      default:
        return 0;
    }
  }

  // Logic to get filtered orders based on selected filter
  getFilteredOrders(): number {
    switch (this.selectedPeriod) {
      case 'MTD':
        return this.mtdOrders();
      case 'QTD':
        return this.qtdOrders();
      case 'YTD':
        return this.ytdOrders();
      default:
        return 0;
    }
  }

  // getColor(value: number): string {
  //   return '#007bff'; // Always return blue
  // }

  fetchDashboardDataForTopCards(filter: string) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      console.error('No token found!');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get(
        `https://uat.smartassistapp.in/api/dealer/dealer/dashboard?filter=${filter}`,
        { headers }
      )
      .subscribe(
        (response: any) => {
          if (response && response.status === 200) {
            const data = response.data;

            // Access dynamic values based on the selected filter
            const leadsValue = data.leads?.[filter]?.value || 0;
            const testDrivesValue = data.testDrives?.[filter]?.value || 0;
            const ordersValue = data.orders?.[filter]?.value || 0;

            this.mtdLeads.set(leadsValue);
            this.mtdTestDrives.set(testDrivesValue);
            this.mtdOrders.set(ordersValue);
          } else {
            console.error(
              'Error fetching data:',
              response.message || 'Unknown error'
            );
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  fetchDashboardDataForTable(filter: string) {
    const token = sessionStorage.getItem('token');

    if (!token) {
      console.error('No token found!');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get(
        `https://uat.smartassistapp.in/api/dealer/dealer/dashboard?filter=${filter}`,
        { headers }
      )
      .subscribe(
        (response: any) => {
          if (response && response.status === 200) {
            this.displayedData = response.data.tableData || [];
            this.maxValue =
              Math.max(...this.displayedData.map((item) => item.value)) || 1;
          } else {
            console.error('Failed to fetch table data:', response.message);
          }
        },
        (error) => {
          console.error('Fetch error:', error);
        }
      );
  }
  createDoughnutChart(totalTestDrives: number, totalOrders: number) {
    // Get the canvas element
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;

    // Check if the canvas exists
    if (ctx) {
      // Destroy existing chart if it exists to avoid canvas reuse error
      if (this.doughnutChart) {
        this.doughnutChart.destroy();
      }

      // Create a new chart
      this.doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Test Drives', 'Orders'],
          datasets: [
            {
              data: [totalTestDrives, totalOrders],
              backgroundColor: ['#1E90FF', '#87CEFA'], // Blue shades (adjust as needed)
            },
          ],
        },
        options: {
          responsive: true,
          aspectRatio: 1,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true, // Ensure tooltip is enabled
              callbacks: {
                label: function (tooltipItem) {
                  const value = tooltipItem.raw; // Accessing the raw value of the segment
                  const label = tooltipItem.label; // The label of the segment (Test Drives/Orders)
                  return `${label}: ${value}`; // Format the tooltip as "Label: Value"
                },
              },
            },
          },
        },
      });
    } else {
      console.error('Canvas element with ID "doughnutChart" not found.');
    }
  }

  // getProgressPercentage(value: number, max: number): number {
  //   if (max <= 0) {
  //     console.warn('Invalid maxValue:', max);
  //     return 0;
  //   }
  //   return (value / max) * 100;
  // }

  updatePieChart(testDrives: number, orders: number): void {
    if (this.pieChartInstance) {
      this.pieChartInstance.data.datasets[0].data = [testDrives, orders];
      this.pieChartInstance.update();
    } else {
      this.createDoughnutChart(testDrives, orders);
    }
  }

  // updateSelection(option: string) {
  //   this.selectedOption = option;
  //   this.updateDataBasedOnSelection(); // Method to update your data based on selection
  // }
  // updateDataBasedOnSelection() {
  //   switch (this.selectedOption) {
  //     // Leads cases
  //     case 'leads-MTD':
  //       // Fetch and display MTD data for leads
  //       break;
  //     case 'leads-QTD':
  //       // Fetch and display QTD data for leads
  //       break;

  //     // Test Drives cases
  //     case 'testDrives-MTD':
  //       // Fetch and display MTD data for test drives
  //       break;
  //     case 'testDrives-QTD':
  //       // Fetch and display QTD data for test drives
  //       break;

  //     // Orders cases
  //     case 'orders-MTD':
  //       // Fetch and display MTD data for orders
  //       break;
  //     case 'orders-QTD':
  //       // Fetch and display QTD data for orders
  //       break;

  //     default:
  //       console.error('Invalid selection:', this.selectedOption);
  //   }
  // }
  // getFilteredLeads() {
  //   return this.data?.leads?.MTD?.value ?? 0; // adjust according to your data
  // }

  updateDataBasedOnSelection(): void {
    const [type, range] = this.selectedOption.split('-'); // e.g., "leads", "MTD"

    // Retrieve the token from sessionStorage
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found!');
      return;
    }

    // Set up headers with Authorization token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Make the HTTP GET request to fetch data based on selected filter
    this.http
      .get<any>(
        `https://uat.smartassistapp.in/api/dealer/dealer/dashboard/?type=${type}&range=${range}`,
        { headers }
      )
      .subscribe(
        (response) => {
          console.log('Response received:', response); // Log the full response

          // Check if response contains data
          if (response && response.data) {
            // Handle the response based on type (leads, testDrives, or orders)
            if (type === 'testDrives') {
              this.displayedData = response.data.rankings.testDrives || [];
            } else if (type === 'leads') {
              this.displayedData = response.data.rankings.leads || [];
            } else if (type === 'orders') {
              this.displayedData = response.data.rankings.orders || [];
            }
          } else {
            console.error('No data found in response!');
            this.displayedData = [];
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.displayedData = []; // Handle error gracefully
        }
      );
  }

  // Calculate progress percentage based on value
  getProgressPercentage(value: number, maxValue: number): number {
    return (value / maxValue) * 100;
  }

  // Optionally, you can modify how you color the progress bar based on value
  getColor(rank: number): string {
    return rank <= 3 ? '#28a745' : '#dc3545'; // Green for rank 1, 2, 3, Red for others
  }

  // getLeadChange() {
  //   console.log('DATA:', this.data);

  //   if (
  //     this.data &&
  //     this.data.leads &&
  //     typeof this.data.leads.change === 'number'
  //   ) {
  //     console.log('CHANGE:', this.data.leads.change);
  //     return this.data.leads.change;
  //   }
  //   return 0;
  // }

  // // Method to calculate the progress percentage for the rank bar
  // getProgressPercentage(value: number, maxValue: number) {
  //   return (value / maxValue) * 100;
  // }
  // private createPieChart(totalTestDrives: number, totalOrders: number) {
  //   const pieChartElement = document.getElementById(
  //     'doughnut_chart'
  //   ) as HTMLCanvasElement;

  //   if (pieChartElement) {
  //     // Destroy the previous chart instance if it exists (to prevent re-creating it on every filter change)
  //     if (this.pieChartInstance) {
  //       this.pieChartInstance.destroy();
  //     }

  //     this.pieChartInstance = new Chart(pieChartElement, {
  //       type: 'pie',
  //       data: {
  //         labels: ['Test Drives', 'Orders'],
  //         datasets: [
  //           {
  //             label: 'Total Dashboard Data',
  //             data: [totalTestDrives, totalOrders],
  //             backgroundColor: ['#007bff', '#008080'], // Light Blue and Dark Blue
  //           },
  //         ],
  //       },
  //       options: {
  //         responsive: true,
  //         plugins: {
  //           legend: {
  //             display: true,
  //             position: 'bottom',
  //           },
  //           tooltip: {
  //             callbacks: {
  //               label: function (tooltipItem) {
  //                 return `${tooltipItem.label}: ${tooltipItem.raw}`;
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  //   } else {
  //     console.warn('Canvas element for chart not found');
  //   }
  // }
  // createDoughnutChart(testDrives: number, orders: number) {
  //   const canvas = document.getElementById(
  //     'doughnut_chart'
  //   ) as HTMLCanvasElement;
  //   if (!canvas) {
  //     console.error('Canvas element not found!');
  //     return;
  //   }

  //   const ctx = canvas.getContext('2d');
  //   if (this.pieChartInstance) {
  //     this.pieChartInstance.destroy(); // Prevent overlapping charts
  //   }

  //   this.pieChartInstance = new Chart(ctx!, {
  //     type: 'doughnut',
  //     data: {
  //       labels: ['Test Drives', 'Orders'],
  //       datasets: [
  //         {
  //           data: [testDrives, orders],
  //           backgroundColor: ['#007bff', '#FF6384'],
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: 'bottom',
  //         },
  //       },
  //     },
  //   });
  // }
  // getFilteredLeads(): number {
  //   switch (this.selectedPeriod) {
  //     case 'MTD':
  //       return this.mtdLeads();
  //     case 'QTD':
  //       return this.qtdLeads();
  //     case 'YTD':
  //       return this.ytdLeads();
  //     default:
  //       return 0;
  //   }
  // }

  // Apply the filter and update the selected period
  applyFilter(period: string): void {
    this.selectedPeriod = period;
  }

  // Logic for calculating the color (green for positive, red for negative)
  // getColor(value: number): string {
  //   return value >= 0 ? 'green' : 'red';
  // }

  // Get change data for comparison (e.g., since last month)
  // getChangeData(currentValue: number, prevValue: number) {
  //   const change = currentValue - prevValue;
  //   const changePercentage = ((change / prevValue) * 100).toFixed(2);
  //   return {
  //     color: change >= 0 ? 'green' : 'red',
  //     value: `${change >= 0 ? '+' : ''}${changePercentage}%`,
  //   };
  // }
}
// calculateChange(current: number, previous: number): string {
//   console.log('Current:', current, 'Previous:', previous);

//   // If previous is null or undefined, display "No data"
//   if (previous === null || previous === undefined) {
//     return `<span style='color: grey;'>No data</span>`;
//   }

//   // Handle previous = 0 safely to avoid Infinity
//   if (previous === 0) {
//     if (current === 0) {
//       return `<span style='color: grey;'>0%</span>`;
//     }
//     // If previous is 0 and current is non-zero, treat it as +100% or -100%
//     const sign = current > 0 ? '+' : '-';
//     const color = current > 0 ? 'green' : 'red';
//     return `<span style='color: ${color};'>${sign}100%</span>`;
//   }

//   // Normal percentage calculation (for non-zero previous)
//   const change = ((current - previous) / previous) * 100;
//   const sign = change > 0 ? '+' : change < 0 ? '-' : '';
//   const color = change > 0 ? 'green' : change < 0 ? 'red' : 'grey';

//   return `<span style='color: ${color};'>${sign}${Math.abs(change).toFixed(
//     1
//   )}%</span>`;
// }

// calculateChange(current: number, previous: number): string {
//   console.log('Current:', current, 'Previous:', previous);

//   if (previous === null || previous === undefined) {
//     return `<span style='color: grey;'>No data</span>`;
//   }

//   if (previous === 0) {
//     if (current === 0) {
//       return `<span style='color: grey;'>0%</span>`;
//     }
//     const sign = current > 0 ? '+' : '-'; // sign will be '+'
//     const color = current > 0 ? 'green' : 'red'; // color will be 'green'
//     return `<span style='color: ${color};'>${sign}100%</span>`; // This will return '<span style='color: green;'>+100%</span>'
//   }

//   const change = ((current - previous) / previous) * 100;
//   const sign = change > 0 ? '+' : change < 0 ? '-' : '';
//   const color = change > 0 ? 'green' : change < 0 ? 'red' : 'grey';

//   return `<span style='color: ${color};'>${sign}${Math.abs(change).toFixed(
//     1
//   )}%</span>`;
// }

//   getChangeData(
//     current: number,
//     previous: number
//   ): { value: string; color: string } {
//     if (previous === null || previous === undefined) {
//       return { value: 'No data', color: 'text-muted' };
//     }

//     if (previous === 0) {
//       if (current === 0) {
//         return { value: '0%', color: 'text-muted' };
//       }
//       const sign = current > 0 ? '+' : '-';
//       const color = current > 0 ? 'text-success' : 'text-danger';
//       return { value: `${sign}100%`, color };
//     }

//     const change = ((current - previous) / previous) * 100;
//     const sign = change > 0 ? '+' : change < 0 ? '-' : '';
//     const color =
//       change > 0 ? 'text-success' : change < 0 ? 'text-danger' : 'text-muted';

//     return {
//       value: `${sign}${Math.abs(change).toFixed(1)}%`,
//       color,
//     };
//   }
// }
