import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
      // ✅ Match the backend's message
      const isTokenInvalid =
        error.status === 401 &&
        error.error?.message?.includes('Invalid or expired token');

      if (isTokenInvalid) {
        sessionStorage.clear(); // ✅ Clear session
        toastr.error('Session expired. Please login again.', 'Unauthorized'); // ✅ Show message

        // ✅ Optional: reload after redirect to ensure clean state
        router.navigate(['/login']).then(() => window.location.reload());
      }

      return throwError(() => error);
    })
  );
};
