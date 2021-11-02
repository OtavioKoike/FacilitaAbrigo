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
export class AdminGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  // Não acessar paginas sem estar logado
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.getUser().role !== 1) {
      this.router.navigate(['menu'])
    }
    return true;
  }

}
