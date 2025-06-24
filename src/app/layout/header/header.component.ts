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
import { isPlatformBrowser } from '@angular/common';
import { Token } from '@angular/compiler';
import { filter, map } from 'rxjs';
import { ContextService } from '../../service/context.service';
import { SidebarService } from '../../service/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // corrected `styleUrl` to `styleUrls`
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<void>();
  guestDetails: any;
  // pageTitle: string = 'Dashboard';
  currentHeading: string = 'Dashboard';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private activatedRoute: ActivatedRoute,
    private context: ContextService,
    private cdr: ChangeDetectorRef,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.context.onSideBarClick$.subscribe(({ pageTitle }) => {
      console.log('Current Heading Updated:', pageTitle);
      this.currentHeading = pageTitle;
      this.cdr.markForCheck();
    });

    this.updateTitle();

    // header name
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateTitle());
  }

  onToggleClick() {
    console.log('Hamburger clicked'); // 👈 test log
    // this.sidebarToggle.emit();
    this.sidebarService.toggleSidebar();
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

  logout(): void {
    console.log('Logging out...'); // Debug log

    sessionStorage.removeItem('token');
    this.guestDetails = null;

    this.router.navigate(['/']); // Navigate to home or login after logout
  }
}
