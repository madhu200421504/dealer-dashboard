// user-selection.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSelectionService {
  private selectedUserSubject = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  setSelectedUser(user: any) {
    this.selectedUserSubject.next(user);
  }

  clearSelectedUser() {
    this.selectedUserSubject.next(null);
  }
}