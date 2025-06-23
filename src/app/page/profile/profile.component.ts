import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileResponse, Profile } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  masterSrv = inject(MasterService);

  profile = signal<Profile | null>(null); // ✅ Expecting a single object, not array

  ngOnInit(): void {
    this.getProfileData();
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
}
