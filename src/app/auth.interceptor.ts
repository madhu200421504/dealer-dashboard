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

// ✅ Global flag to show only one session expired toast
let isAlreadyHandled = false;

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
      const isTokenInvalid =
        error.status === 401 &&
        error.error?.message?.includes('Invalid or expired token');

      if (isTokenInvalid && !isAlreadyHandled) {
        isAlreadyHandled = true;
        sessionStorage.clear();
        toastr.error('Session expired. Please login again.', 'Unauthorized');

        router.navigate(['/login']).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        });
      }

      // ✅ Prevent showing other errors once session is handled
      if (isAlreadyHandled) {
        return throwError(() => null); // stop further error propagation
      }

      // ✅ Optional: handle other errors normally if session is still valid
      // toastr.error(error.error?.message || 'Something went wrong', 'Error');
      return throwError(() => error);
    })
  );
};
