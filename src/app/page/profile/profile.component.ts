import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileResponse, Profile } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  masterSrv = inject(MasterService);
  profileImageUrl: string = '/assets/public/images/profile/default.png'; // fallback image

  // profile = signal<Profile | null>(null); // ✅ Expecting a single object, not array
  profile = signal<Profile | null>(null); // ✅ This is correct

  ngOnInit(): void {
    this.getProfileData();
    this.getProfileImage(); // ✅ Add this
  }

  constructor(private http: HttpClient) {}
  isCustomProfileImage(): boolean {
    return this.profileImageUrl !== '/assets/public/images/profile/default.png';
  }

  getProfileData() {
    this.masterSrv.getProfileData().subscribe({
      next: (res: ProfileResponse) => {
        console.log('Fetched Profile Data:', res);
        this.profile.set(res.data); // ✅ `res.data` is a single Profile object
      },
      error: (err) => {
        console.error('Error fetching profile data:', err);
        alert('Failed to fetch profile data.');
      },
    });
  }
  getProfileImage() {
    this.http
      .get<any>('https://uat.smartassistapp.in/api/users/profile/set')
      .subscribe({
        next: (res) => {
          console.log('Fetched Profile Image:', res);
          if (res?.status === 200 && res.data?.image_url) {
            this.profileImageUrl = res.data.image_url;
          } else {
            console.warn('No profile image found, using default.');
            this.profileImageUrl = '/assets/public/images/profile/default.png';
          }
        },
        error: (err) => {
          console.error('Error fetching profile image:', err);
          this.profileImageUrl = '/assets/public/images/profile/default.png';
        },
      });
  }
  // getInitials(name: string): string {
  //   if (!name) return '';
  //   const parts = name.trim().split(' ');
  //   const initials =
  //     parts.length === 1
  //       ? parts[0].charAt(0)
  //       : parts[0].charAt(0) + parts[1].charAt(0);
  //   return initials.toUpperCase();
  // }
  getInitials(name: string): string {
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  }
}
