import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smartAssists';
  //  isSidebarOpen = true;

  //  toggleSidebar() {
  //   this.isSidebarOpen = !this.isSidebarOpen;
  //   console.log("Sidebar toggled");
  // }
}
