import { HttpInterceptorFn } from '@angular/common/http';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, delay, switchMap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const token = sessionStorage.getItem('token');

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const isUnauthorized =
        error.status === 401 &&
        error.error?.message?.includes('Invalid or expired token');

      if (isUnauthorized) {
        sessionStorage.clear();
        toastr.error('Session expired. Please log in again.', 'Unauthorized');

        // 🔁 Delay redirect so toast is visible
        setTimeout(() => {
          router.navigate(['/login']);
        }, 1000);

        return throwError(() => error); // Still propagate the error
      }

      return throwError(() => error);
    })
  );
};
