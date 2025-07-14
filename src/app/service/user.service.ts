import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    const token = sessionStorage.getItem('token'); // or localStorage, based on your auth

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      'https://uat.smartassistapp.in/api/dealer/show-profile',
      { headers }
    );
    // 🔁 Replace with your real API URL
  }
}
