import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'smartAssists';
  private popStateHandler: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // ✅ Force reload when navigating to the same URL
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    // Only run this code in the browser
    if (isPlatformBrowser(this.platformId)) {
      const stayOnPage = () => {
        if (typeof history !== 'undefined' && typeof location !== 'undefined') {
          history.pushState(null, '', location.href);
        }
      };

      // Push state so back button triggers popstate instead of leaving immediately
      stayOnPage();

      this.popStateHandler = (event: PopStateEvent) => {
        event.preventDefault();

        const confirmLeave = confirm(
          'Are you sure you want to go back? This will log you out.'
        );

        if (confirmLeave) {
          sessionStorage.removeItem('token');
          window.removeEventListener('popstate', this.popStateHandler);
          history.back(); // let navigation happen
        } else {
          // Push a new state so the history pointer returns to current page
          stayOnPage();
        }
      };

      window.addEventListener('popstate', this.popStateHandler);
    }
  }

  ngOnDestroy(): void {
    // ✅ Clean up listener when app unloads
    if (isPlatformBrowser(this.platformId) && this.popStateHandler) {
      window.removeEventListener('popstate', this.popStateHandler);
    }
  }
}
