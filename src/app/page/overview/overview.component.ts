import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { SidebarService } from '../../service/sidebar.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [SharedModule, DashboardComponent, SidebarComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.isOpen$.subscribe((open) => {
      this.isSidebarOpen = open;
    });
  }

  isSidebarOpen = true;

  toggleSidebar() {
    // this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarService.toggleSidebar();
  }
}
