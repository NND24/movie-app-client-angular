// auth.interceptor.ts
import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  catchError,
  switchMap,
  throwError,
  BehaviorSubject,
  filter,
  take,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';

const MAX_RETRIES = 3;
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const userService = inject(UserService);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user?.accessToken;

  // Clone request nếu có token
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        // Nếu chưa refresh → thực hiện refresh
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return http
            .get(`${environment.apiUrl}/refresh`, {
              withCredentials: true,
            })
            .pipe(
              switchMap((res: any) => {
                isRefreshing = false;
                const newToken = res.accessToken;

                localStorage.setItem('user', JSON.stringify(res));
                refreshTokenSubject.next(newToken);

                const retryReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`,
                  },
                });

                return next(retryReq);
              }),
              catchError((err) => {
                isRefreshing = false;
                userService.clearUser();
                localStorage.removeItem('user');
                return throwError(() => err);
              })
            );
        } else {
          // Nếu đang refresh thì chờ token mới
          return refreshTokenSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) => {
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return next(retryReq);
            })
          );
        }
      }

      return throwError(() => error);
    })
  );
};
