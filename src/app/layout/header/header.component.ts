import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  OnInit,
  PLATFORM_ID,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Token } from '@angular/compiler';
import { filter, map } from 'rxjs';
import { ContextService } from '../../service/context.service';
import { SidebarService } from '../../service/sidebar.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // corrected `styleUrl` to `styleUrls`
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<void>();
  guestDetails: any;
  isSidebarOpen: boolean = false; // ✅ Initialize with default value

  // isSidebarOpen = true; // ✅ Make sure this matches your sidebar's initial state
  // pageTitle: string = 'Dashboard';
  currentHeading: string = 'Dashboard';
  userName: string = '';
  selectedSection: string = 'home';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private activatedRoute: ActivatedRoute,
    private context: ContextService,
    private cdr: ChangeDetectorRef,
    private sidebarService: SidebarService,
    private userService: UserService // ✅ Inject UserService
  ) { }

  // ngOnInit() {
  //   this.context.onSideBarClick$.subscribe(({ pageTitle }) => {
  //     console.log('Current Heading Updated:', pageTitle);
  //     this.currentHeading = pageTitle;
  //     this.cdr.markForCheck();
  //   });

  //   this.updateTitle();

  //   // header name
  //   this.router.events
  //     .pipe(filter((event) => event instanceof NavigationEnd))
  //     .subscribe(() => this.updateTitle());
  // }
  ngOnInit() {
    // ✅ Get initial state from service
    this.isSidebarOpen = this.sidebarService.currentState;
    console.log('Initial sidebar state:', this.isSidebarOpen);
    this.context.onSideBarClick$.subscribe(({ pageTitle }) => {
      console.log('Current Heading Updated:', pageTitle);
      this.currentHeading = pageTitle;
      this.cdr.markForCheck();
      
    });

    this.updateTitle();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateTitle());

    // ✅ Fix: access 'dealer_name' from res.data
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.userName = res.data?.dealer_name || '';
        console.log('Assigned userName:', this.userName);
        this.cdr.detectChanges(); // ✅ This is crucial
      },
      error: (err) => {
        console.error('Failed to fetch profile', err);
        this.userName = '';
        this.cdr.detectChanges();
      },
    });
  }
  selectSection(section: string): void {
    this.selectedSection = section;
  }
  

  onToggleClick() {
    console.log('Before toggle:', this.isSidebarOpen);
    this.sidebarService.toggleSidebar();
    // ✅ Get updated state from service
    this.isSidebarOpen = this.sidebarService.currentState;
    console.log('After toggle:', this.isSidebarOpen);
    this.cdr.detectChanges();
  }

  private updateTitle(): void {
    const route = this.getDeepestChild(this.activatedRoute);
    // this.pageTitle = route.snapshot.data['title'] || 'Dashboard';
  }

  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    return route.firstChild ? this.getDeepestChild(route.firstChild) : route;
  }

  // logout() {
  //   // if (isPlatformBrowser(this.platformId)) {
  //   // }
  //   sessionStorage.removeItem('token');
  //   this.guestDetails = null;
  // }
  confirmLogout() {
    // Close modal manually if needed (Bootstrap 5 auto closes on button click)
    this.logout(); // Call your existing logout logic
  }
  performLogout(): void {
    const modalElement = document.getElementById('logoutModal');
    if (modalElement) {
      let modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (!modal) {
        modal = new (window as any).bootstrap.Modal(modalElement);
      }
      modal.hide();
    }

    // Show loading toast (optional)
    this.showToast('Logging out...', 'info');

    setTimeout(() => {
      localStorage.removeItem('authToken');
      sessionStorage.clear();

      this.showToast('Successfully logged out!', 'success');

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    }, 1000);
  }

  private showToast(message: string, type: string): void {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.custom-toast-container');
    existingToasts.forEach((toast) => toast.remove());

    const iconMap: { [key: string]: string } = {
      info: '<i class="fas fa-spinner fa-spin"></i>',
      success: '<i class="fas fa-check-circle"></i>',
      error: '<i class="fas fa-times-circle"></i>',
    };

    const colorMap: { [key: string]: string } = {
      info: 'bg-info',
      success: 'bg-success',
      error: 'bg-danger',
    };

    const toastHTML = `
      <div class="custom-toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999;">
        <div class="toast show align-items-center text-white ${colorMap[type]} border-0" role="alert">
          <div class="d-flex">
            <div class="toast-body">
              ${iconMap[type]} ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.closest('.custom-toast-container').remove()"></button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', toastHTML);

    // Auto remove after 3 seconds
    setTimeout(() => {
      const toastContainer = document.querySelector('.custom-toast-container');
      if (toastContainer) {
        toastContainer.remove();
      }
    }, 3000);
  }

  logout(): void {
    console.log('Logging out...'); // Debug log

    sessionStorage.removeItem('token');
    this.guestDetails = null;

    this.router.navigate(['/']); // Navigate to home or login after logout
  }
}
