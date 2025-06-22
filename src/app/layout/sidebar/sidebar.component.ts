import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContextService } from '../../service/context.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  selectedValue: string = '';
  isMastersOpen = false;

  constructor(private router: Router, private context: ContextService) {}

  onRoleChange(role: string, pageTitle: string) {
    this.context.onSideBarClick$.next({ role, pageTitle });
  }
  onTargetChange(role: string, pageTitle: string) {
    this.context.onSideBarClick$.next({ role, pageTitle });
  }

  onTeamChange(role: string, pageTitle: string) {
    this.context.onSideBarClick$.next({ role, pageTitle });
  }
  
  toggleMastersMenu(): void {
    this.isMastersOpen = !this.isMastersOpen;
  }

  closeMastersMenu(): void {
    this.isMastersOpen = false;
  }

  // toggleMastersMenu() {
  //   this.isMastersOpen = !this.isMastersOpen;
  // }
  view(page: any) {
    this.router.navigate(['../Admin/' + page]);
  }
  closeMastersMenuAndReopen() {
    this.isMastersOpen = false;

    // ⏳ Wait briefly and re-open
    setTimeout(() => {
      this.isMastersOpen = true;
    }, 300); // delay in milliseconds (adjust if needed)
  }

  view2(page: string, status: string, title: string) {
    this.router
      .navigate(['../Admin/' + page, { type: status, title: title }])
      .then(() => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      });
  }
}
