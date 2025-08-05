import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../model/class/profile';
import { MasterService } from '../../service/master.service';
import { HttpClient } from '@angular/common/http';
import { ProfileResponse } from '../../model/interface/master';
import { ContextService } from '../../service/context.service'; // ✅ ADDED

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  masterSrv = inject(MasterService);
  profileImageUrl: string = '/assets/public/images/profile/default.png';
  profile = signal<Profile | null>(null);

  constructor(private http: HttpClient, private context: ContextService) {} // ✅ Injected ContextService

  ngOnInit(): void {
    // ✅ Emit title to header on page load
    this.context.onSideBarClick$.next({
      role: 'profile',
      pageTitle: 'Profile Management',
    });

    this.getProfileData();
    this.getProfileImage();
  }

  isCustomProfileImage(): boolean {
    return this.profileImageUrl !== '/assets/public/images/profile/default.png';
  }

  getProfileData() {
    this.masterSrv.getProfileData().subscribe({
      next: (res: ProfileResponse) => {
        console.log('Fetched Profile Data:', res);
        this.profile.set(res.data);
      },
      error: (err) => {
        console.error('Error fetching profile data:', err);
        alert('Failed to fetch profile data.');
      },
    });
  }

  getProfileImage() {
    this.http
      .get<any>('https://uat.smartassistapp.in/api/superAdmin/show-profile')
      .subscribe({
        next: (res) => {
          console.log('Fetched Profile Image:', res);
          if (res?.status === 200 && res.data?.image_url) {
            this.profileImageUrl = res.data.image_url;
          } else {
            this.profileImageUrl = '/assets/public/images/profile/default.png';
          }
        },
        error: (err) => {
          console.error('Error fetching profile image:', err);
          this.profileImageUrl = '/assets/public/images/profile/default.png';
        },
      });
  }

  getInitials(name: string): string {
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  }
}
