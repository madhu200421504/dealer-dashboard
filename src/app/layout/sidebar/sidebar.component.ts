// // import {
// //   Component,
// //   ChangeDetectionStrategy,
// //   ChangeDetectorRef,
// //   AfterViewInit,
// //   OnDestroy,
// //   OnInit,
// // } from '@angular/core';
// // import { FormsModule } from '@angular/forms';
// // import {
// //   Router,
// //   RouterLink,
// //   RouterModule,
// //   NavigationEnd,
// // } from '@angular/router';
// // import { ContextService } from '../../service/context.service';
// // import { CommonModule } from '@angular/common';
// // import { SidebarService } from '../../service/sidebar.service';
// // import MetisMenu from 'metismenujs';
// // import { Subscription } from 'rxjs';

// // @Component({
// //   selector: 'app-sidebar',
// //   standalone: true,
// //   imports: [FormsModule, RouterLink, CommonModule, RouterModule],
// //   templateUrl: './sidebar.component.html',
// //   styleUrls: ['./sidebar.component.css'],
// //   changeDetection: ChangeDetectionStrategy.OnPush,
// // })
// // export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
// //   activeMenu: string = '';
// //   isMastersOpen = false;
// //   isSidebarOpen: boolean = true;
// //   isMasterMenuOpen = false;

// //   private sidebarSub!: Subscription;
// //   private routerSub!: Subscription;
// //   private metis: any;

// //   constructor(
// //     private router: Router,
// //     private context: ContextService,
// //     private sidebarService: SidebarService,
// //     private cdr: ChangeDetectorRef
// //   ) {}

// //   ngOnInit() {
// //     // Handle sidebar open/close state
// //     this.sidebarSub = this.sidebarService.isOpen$.subscribe((open) => {
// //       this.isSidebarOpen = open;
// //       this.cdr.detectChanges();
// //     });

// //     // Track active route and update page title
// //     this.routerSub = this.router.events.subscribe((event) => {
// //       if (event instanceof NavigationEnd) {
// //         const url = event.urlAfterRedirects;
// //         if (url.includes('/Admin/dashboard')) {
// //           this.setActiveMenu('dashboard', 'Dashboard');
// //         } else if (url.includes('/Admin/user-all')) {
// //           this.setActiveMenu('user-all', 'User Management');
// //         } else if (url.includes('/Admin/role')) {
// //           this.setActiveMenu('role', 'Role Management');
// //         } else if (url.includes('/Admin/team')) {
// //           this.setActiveMenu('team', 'Team Management');
// //         } else if (url.includes('/Admin/vehicle')) {
// //           this.setActiveMenu('vehicle', 'Vehicle Management');
// //         } else if (url.includes('/Admin/target')) {
// //           this.setActiveMenu('target', 'Target Management');
// //         }
// //       }
// //     });
// //   }

// //   ngAfterViewInit(): void {
// //     this.initMetisMenu();
// //   }

// //   ngOnDestroy(): void {
// //     this.routerSub?.unsubscribe();
// //     this.sidebarSub?.unsubscribe();
// //     this.metis?.dispose();
// //   }

// //   private initMetisMenu(): void {
// //     const el = document.getElementById('menu');
// //     if (el) {
// //       this.metis?.dispose();
// //       this.metis = new MetisMenu(el);
// //     }
// //   }

// //   onMenuClick(key: string, pageTitle: string) {
// //     this.setActiveMenu(key, pageTitle);
// //   }

// //   /** Shared logic to activate menu and set page title */
// //   private setActiveMenu(key: string, title: string) {
// //     this.activeMenu = key;
// //     this.context.setPageTitle(title);
// //     this.context.onSideBarClick$.next({ role: key, pageTitle: title });
// //     this.cdr.detectChanges(); // ⬅ force UI refresh with OnPush
// //   }

// //   /** Use in template to apply 'active' class */
// //   isActive(route: string): boolean {
// //     return this.router.url.includes(route);
// //   }
// // }




// import {
//   Component,
//   ChangeDetectionStrategy,
//   ChangeDetectorRef,
//   OnDestroy,
//   OnInit,
// } from '@angular/core';
// import {
//   Router,
//   RouterLink,
//   RouterModule,
//   NavigationEnd,
// } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Subscription } from 'rxjs';
// import { SidebarService } from '../../service/sidebar.service';
// import { ContextService } from '../../service/context.service';

// @Component({
//   selector: 'app-sidebar',
//   standalone: true,
//   imports: [FormsModule, RouterLink, RouterModule, CommonModule],
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class SidebarComponent implements OnInit, OnDestroy {
//   activeMenu: string = '';
//   isSidebarOpen: boolean = true;
//   private sidebarSub!: Subscription;
//   private routerSub!: Subscription;

//   menuItems = [
//     { key: 'dashboard', label: 'Dashboard', route: '/Admin/dashboard' },
//     { key: 'user-all', label: 'User Management', route: '/Admin/user-all' },
//     { key: 'role', label: 'Role Management', route: '/Admin/role' },
//     { key: 'team', label: 'Team Management', route: '/Admin/team' },
//     { key: 'vehicle', label: 'Vehicle Management', route: '/Admin/vehicle' },
//     { key: 'target', label: 'Set Targets', route: '/Admin/target' },
//   ];

//   constructor(
//     private router: Router,
//     private context: ContextService,
//     private sidebarService: SidebarService,
//     private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.sidebarSub = this.sidebarService.isOpen$.subscribe((open) => {
//       this.isSidebarOpen = open;
//       this.cdr.detectChanges();
//     });

//     this.setActiveFromUrl(this.router.url); // initial set

//     this.routerSub = this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         this.setActiveFromUrl(event.urlAfterRedirects); // update on navigation
//         this.cdr.detectChanges(); // force UI update for OnPush
//       }
//     });
//   }

//   ngOnDestroy(): void {
//     this.sidebarSub?.unsubscribe();
//     this.routerSub?.unsubscribe();
//   }

//   private setActiveFromUrl(url: string) {
//     const found = this.menuItems.find((item) => url.includes(item.route));
//     if (found && this.activeMenu !== found.key) {
//       this.activeMenu = found.key;
//       this.context.setPageTitle(found.label);
//       this.context.onSideBarClick$.next({
//         role: found.key,
//         pageTitle: found.label,
//       });
//       this.cdr.detectChanges();
//     }
//   }

//   onMenuClick(item: any): void {
//     this.activeMenu = item.key;
//     this.context.setPageTitle(item.label);
//     this.context.onSideBarClick$.next({
//       role: item.key,
//       pageTitle: item.label,
//     });
//   }

  
//   isActive(key: string): boolean {
//     return this.activeMenu === key;
//   }
// }



import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
  NavigationEnd,
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../service/sidebar.service';
import { ContextService } from '../../service/context.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  activeMenu: string = '';
  isSidebarOpen: boolean = true;
  private sidebarSub!: Subscription;
  private routerSub!: Subscription;

  menuItems = [
    { key: 'dashboard', label: 'Dashboard', route: '/Admin/dashboard' },
    { key: 'user-all', label: 'User Management', route: '/Admin/user-all' },
    { key: 'role', label: 'Role Management', route: '/Admin/role' },
    { key: 'team', label: 'Team Management', route: '/Admin/team' },
    { key: 'vehicle', label: 'Vehicle Management', route: '/Admin/vehicle' },
    { key: 'target', label: 'Set Targets', route: '/Admin/target' },
  ];

  constructor(
    private router: Router,
    private context: ContextService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.sidebarSub = this.sidebarService.isOpen$.subscribe((open) => {
      this.isSidebarOpen = open;
    });

    // Set initial active state
    this.updateActiveFromUrl(this.router.url);

    // Listen to route changes ONLY
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveFromUrl(event.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy(): void {
    this.sidebarSub?.unsubscribe();
    this.routerSub?.unsubscribe();
  }

  private updateActiveFromUrl(url: string): void {
    console.log('Updating active from URL:', url); // Debug log

    const found = this.menuItems.find((item) => url.includes(item.route));
    if (found && this.activeMenu !== found.key) {
      console.log('Setting active menu to:', found.key); // Debug log
      this.activeMenu = found.key;
      this.context.setPageTitle(found.label);
      this.context.onSideBarClick$.next({
        role: found.key,
        pageTitle: found.label,
      });
    }
  }

  // Remove onMenuClick - let router handle everything
  // The routerLink will trigger navigation, which will trigger updateActiveFromUrl

  isActive(key: string): boolean {
    return this.activeMenu === key;
  }
}