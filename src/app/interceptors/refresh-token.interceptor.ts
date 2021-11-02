import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from "@angular/common/http";
// Rxjs
import {throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
// Service
import { AuthService } from './../services/auth.service';
// API
import { API } from '../../../app.api';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private _authService: AuthService
  ){}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if(errorResponse.status === 401 && errorResponse.error.error.name === "TokenExpiredError"){
          const token = this._authService.getJwtToken()
          const reqUrl = request.url.split('/');
          const apiUrl = API.split('/');

          if(token && (reqUrl[2] === apiUrl[2]) && !(reqUrl[5] === 'login')){
            const http = this.injector.get(HttpClient);
            const refresh_token = this._authService.getRefreshToken();

            return http.post(`${API}/api/usuario/login`, {}, {headers: {'Authorization': `Bearer ${refresh_token}`}}).pipe(
              mergeMap(data => {
                this._authService.storeJwtToken(data['token'])
                const cloneRequest = request.clone({setHeaders: {'Authorization': `Bearer ${data['token']}`}});
                return next.handle(cloneRequest);
              })
            )
          } else {
            this._authService.doLogoutUser();
          }

        }

        return throwError(errorResponse);
      })
    )

  }

}
