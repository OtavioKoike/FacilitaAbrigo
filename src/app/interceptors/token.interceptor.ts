import { API } from './../../../app.api';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly JWT_TOKEN = 'JWT_TOKEN';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(this.JWT_TOKEN)
    const reqUrl = request.url.split('/');
    const apiUrl = API.split('/');

    if(token && (reqUrl[2] === apiUrl[2])){
      const newRequest = request.clone({setHeaders: {'Authorization': `Bearer ${token}`}});
      return next.handle(newRequest)
    }else {
      return next.handle(request)
    }

  }

}
