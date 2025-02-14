

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  private checkAuthStatus() : boolean | Observable<boolean>{
      return this.authService.checkAuthenticationStatus()
      .pipe(
        tap(isAuthenticated => {
          if(isAuthenticated){
            console.log(isAuthenticated);

            this.router.navigate(['/heroes/list']);
          }
        }),
        map(isAuthenticated => !isAuthenticated)
      );
    }

  public canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    console.log('Method not implemented.');
    return this.checkAuthStatus();
  }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    console.log('Method not implemented.');
    return this.checkAuthStatus();
  }
}
