import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContextService } from '../../service/context.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  selectedValue: string = '';

  constructor(private router: Router, private context: ContextService) {}

  onRoleChange(role: string, pageTitle: string) {
    this.context.onSideBarClick$.next({ role, pageTitle });
  }

  onTeamChange(role: string, pageTitle: string) {
    this.context.onSideBarClick$.next({ role, pageTitle });
  }

  view(page: any) {
    this.router.navigate(['../Admin/' + page]);
  }

  view2(page: string, status: string, title: string) {
    this.router
      .navigate(['../Admin/' + page, { type: status, title: title }])
      .then(() => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      });
  }
}
