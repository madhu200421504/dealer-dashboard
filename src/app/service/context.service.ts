import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  // nav title
  // public onSideBarClick$ : Subject<string> = new Subject<string>
  onSideBarClick$ = new Subject<{ role: string; pageTitle: string }>();

  // private breadcrumbSubject = new BehaviorSubject<{
  //   name: string;
  //   path: string;
  // } | null>(null);
  // breadcrumb$ = this.breadcrumbSubject.asObservable();

  // updateBreadcrumb(name: string, path: string) {
  //   this.breadcrumbSubject.next({ name, path });
  // }

  // dropdown service
  private selectedOption = signal<string>('users');

  getSelectedOption() {
    return this.selectedOption;
  }

  setSelectedOption(option: string) {
    this.selectedOption.set(option);
  }

  // ✅ Page title stream added
  private pageTitleSubject = new BehaviorSubject<string>('Dashboard');
  pageTitle$ = this.pageTitleSubject.asObservable();

  setPageTitle(title: string) {
    this.pageTitleSubject.next(title);
  }
}
