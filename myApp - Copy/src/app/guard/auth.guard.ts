import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let isExpired = this.checkToken();
    
    if(isExpired){
      this.router.navigate(['/login']);
    }
    
    console.log(isExpired);
    
    return true;

  }

  checkToken(){

    //check if token set
    if (localStorage.getItem("token") === null) {
      return true;
    }

    //check expired token (ref: https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4)
    let token = localStorage.getItem("token");
    let isExpired = Date.now()/1000 < JSON.parse(atob(token.split('.')[1])).exp;

    return !isExpired;

  }
  
}
