import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // ✅ fixed typo: styleUrl → styleUrls
})
export class AppComponent {
  title = 'smartAssists';

  constructor(private router: Router) {
    // ✅ Force reload when navigating to the same URL (like /Admin/dashboard)
    this.router.onSameUrlNavigation = 'reload';
  }

  // Uncomment this if sidebar toggle is needed later
  // isSidebarOpen = true;
  // toggleSidebar() {
  //   this.isSidebarOpen = !this.isSidebarOpen;
  //   console.log("Sidebar toggled");
  // }
}
