// import {
//   Component,
//   ChangeDetectionStrategy,
//   ChangeDetectorRef,
//   AfterViewInit,
//   OnDestroy,
// } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import {
//   Router,
//   RouterLink,
//   RouterModule,
//   NavigationEnd,
// } from '@angular/router';
// import { ContextService } from '../../service/context.service';
// import { CommonModule } from '@angular/common';
// import { SidebarService } from '../../service/sidebar.service';
// import MetisMenu from 'metismenujs';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-sidebar',
//   standalone: true,
//   imports: [FormsModule, RouterLink, CommonModule, RouterModule],
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class SidebarComponent implements AfterViewInit, OnDestroy {
//   selectedValue: string = '';
//   isMastersOpen = false;
//   isSidebarOpen: boolean = true;
//   isMasterMenuOpen = false;
//   private sidebarSub!: Subscription;

//   private metis: any;
//   private routerSub!: Subscription;

//   constructor(
//     private router: Router,
//     private context: ContextService,
//     private sidebarService: SidebarService,
//     private cdr: ChangeDetectorRef
//   ) {}

//   // ngOnInit() {
//   //   this.sidebarService.isOpen$.subscribe((open: boolean) => {
//   //     this.isSidebarOpen = open;
//   //     this.cdr.detectChanges();
//   //   });

//   // }
//   ngOnInit() {
//     this.sidebarSub = this.sidebarService.isOpen$.subscribe((open: boolean) => {
//       this.isSidebarOpen = open;
//       this.cdr.detectChanges();
//     });
//   }

//   ngAfterViewInit(): void {
//     this.initMetisMenu();

//     this.routerSub = this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         setTimeout(() => this.initMetisMenu(), 100); // Re-init menu on route change
//       }
//     });
//   }

//   // ngOnDestroy(): void {
//   //   if (this.routerSub) this.routerSub.unsubscribe();
//   //   if (this.metis) this.metis.dispose();
//   // }
//   ngOnDestroy(): void {
//     if (this.routerSub) this.routerSub.unsubscribe();
//     if (this.sidebarSub) this.sidebarSub.unsubscribe(); // <-- add this
//     if (this.metis) this.metis.dispose();
//   }
//   onProfileChange(path: string, title: string) {
//     this.context.setPageTitle(title); // ✅ globally update page title
//   }

//   private initMetisMenu(): void {
//     const el = document.getElementById('menu');
//     if (el) {
//       if (this.metis) {
//         this.metis.dispose(); // Dispose old instance
//       }
//       this.metis = new MetisMenu(el);
//     }
//   }

//   onRoleChange(role: string, pageTitle: string) {
//     this.context.onSideBarClick$.next({ role, pageTitle });
//   }

//   onTargetChange(role: string, pageTitle: string) {
//     this.context.onSideBarClick$.next({ role, pageTitle });
//   }

//   onTeamChange(role: string, pageTitle: string) {
//     this.context.onSideBarClick$.next({ role, pageTitle });
//   }

//   toggleMastersMenu(): void {
//     this.isMastersOpen = !this.isMastersOpen;
//   }

//   closeMastersMenu(): void {
//     this.isMastersOpen = false;
//   }

//   view(page: any) {
//     this.router.navigate(['../Admin/' + page]);
//   }

//   closeMastersMenuAndReopen() {
//     this.isMastersOpen = false;
//     setTimeout(() => {
//       this.isMastersOpen = true;
//     }, 300);
//   }

//   view2(page: string, status: string, title: string) {
//     this.router
//       .navigate(['../Admin/' + page, { type: status, title: title }])
//       .then(() => {
//         window.scroll({ top: 0, left: 0, behavior: 'smooth' });
//       });
//   }
// }




import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  OnInit, // <-- add OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterModule,
  NavigationEnd,
} from '@angular/router';
import { ContextService } from '../../service/context.service';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../service/sidebar.service';
import MetisMenu from 'metismenujs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  activeMenu: string = ''; // 🔹 track which menu is active
  isMastersOpen = false;
  isSidebarOpen: boolean = true;
  isMasterMenuOpen = false;

  private sidebarSub!: Subscription;
  private metis: any;
  private routerSub!: Subscription;

  constructor(
    private router: Router,
    private context: ContextService,
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // maintain sidebar open state
    this.sidebarSub = this.sidebarService.isOpen$.subscribe((open) => {
      this.isSidebarOpen = open;
      this.cdr.detectChanges();
    });

    // optional: set activeMenu based on current URL on load
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.includes('/Admin/dashboard')) this.activeMenu = 'dashboard';
        else if (url.includes('/Admin/user-all')) this.activeMenu = 'user-all';
        else if (url.includes('/Admin/role')) this.activeMenu = 'role';
        else if (url.includes('/Admin/team')) this.activeMenu = 'team';
        else if (url.includes('/Admin/vehicle')) this.activeMenu = 'vehicle';
        else if (url.includes('/Admin/target')) this.activeMenu = 'target';
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMetisMenu();
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.sidebarSub?.unsubscribe();
    this.metis?.dispose();
  }

  private initMetisMenu(): void {
    const el = document.getElementById('menu');
    if (el) {
      this.metis?.dispose();
      this.metis = new MetisMenu(el);
    }
  }

  /** Called when you click any menu item */
  onMenuClick(key: string, pageTitle: string) {
    // this.activeMenu = key;
    this.context.onSideBarClick$.next({ role: key, pageTitle });
  }

  /** helper for template to check active state */
  // isActive(key: string): boolean {
  //   return this.activeMenu === key;
  // }
  isActive(route: string): boolean {
    return this.router.url.split('?')[0].endsWith(route);
  }
}
