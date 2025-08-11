import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  OnInit,
  PLATFORM_ID,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { ContextService } from '../../service/context.service';
import { SidebarService } from '../../service/sidebar.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidebarToggle = new EventEmitter<void>();

  private destroy$ = new Subject<void>();

  guestDetails: any;
  isSidebarOpen: boolean = false;
  currentHeading: string = 'Dashboard';
  userName: string = '';
  selectedSection: string = 'home';
  toggleInProgress = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private activatedRoute: ActivatedRoute,
    private context: ContextService,
    private cdr: ChangeDetectorRef,
    private sidebarService: SidebarService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Subscribe to sidebar state changes
    this.sidebarService.isOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpen) => {
        this.isSidebarOpen = isOpen;
        console.log('Sidebar state changed:', isOpen);
        this.cdr.detectChanges(); // <-- Add this line here
      });

    // Subscribe to heading changes
    this.context.onSideBarClick$
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ pageTitle }) => {
        console.log('Current Heading Updated:', pageTitle);
        this.currentHeading = pageTitle;
        this.cdr.detectChanges(); // <-- Add this line here
      });

    // Listen to router events for title updates
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.updateTitle());

    // Initial title update
    this.updateTitle();

    // Fetch user profile
    this.loadUserProfile();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUserProfile(): void {
    this.userService
      .getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.userName = res.data?.dealer_name || '';
          console.log('Assigned userName:', this.userName);
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Failed to fetch profile', err);
          this.userName = '';
          this.cdr.markForCheck();
        },
      });
  }

  selectSection(section: string): void {
    this.selectedSection = section;
  }

  // onToggleClick(): void {
  //   console.log('🔍 Before toggle:', this.isSidebarOpen);
  //   this.sidebarService.toggleSidebar();
  //   // The subscription in ngOnInit() will update isSidebarOpen automatically
  // }
  onToggleClick() {
    if (this.toggleInProgress) return;
    this.toggleInProgress = true;

    this.sidebarService.toggleSidebar();

    setTimeout(() => {
      this.toggleInProgress = false;
    }, 300); // match CSS transition duration
  }

  private updateTitle(): void {
    const route = this.getDeepestChild(this.activatedRoute);
    // You can set title logic here if needed
  }

  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    return route.firstChild ? this.getDeepestChild(route.firstChild) : route;
  }

  confirmLogout(): void {
    this.logout();
  }

  performLogout(): void {
    const modalElement = document.getElementById('logoutModal');
    if (modalElement) {
      modalElement.style.display = 'none';
    }

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
    console.log('Logging out...');

    sessionStorage.removeItem('token');
    this.guestDetails = null;

    this.router.navigate(['/login']);
  }
}
