import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  
import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component'; 

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,  // Import standalone component
    // SidebarComponent,
     
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,  // Export standalone component
    // SidebarComponent
  ]
})

export class SharedModule { }
