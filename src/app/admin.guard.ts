import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const jwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');

    if (token) {
      if (!jwtHelper.isTokenExpired(token) && jwtHelper.decodeToken(token).role === 'ROLE_ADMIN') {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
