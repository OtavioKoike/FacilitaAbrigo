import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
// RxJs
import { Observable } from 'rxjs';
// Service
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MembroGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.getUser().role !== 2 && this._authService.getUser().role !== 3) {
      this._router.navigate(['menu'])
    }
    return true;
  }

}
