import { AuthService } from './../services/auth.service';
import { API } from '../../../app.api';
import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from "@angular/common/http";
import { Observable, throwError, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(
    private injector: Injector,
    private _authService: AuthService
  ){}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if(errorResponse.status === 401 && errorResponse.error.error.name === "TokenExpiredError"){
          const token = localStorage.getItem(this.JWT_TOKEN)
          const reqUrl = request.url.split('/');
          const apiUrl = API.split('/');

          if(token && (reqUrl[2] === apiUrl[2]) && !(reqUrl[5] === 'login')){
            const http = this.injector.get(HttpClient);
            const refresh_token = localStorage.getItem(this.REFRESH_TOKEN);

            return http.post(`${API}/api/usuario/login`, {}, {headers: {'Authorization': `Bearer ${refresh_token}`}}).pipe(
              mergeMap(data => {
                localStorage.setItem(this.JWT_TOKEN, data['token']);
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
