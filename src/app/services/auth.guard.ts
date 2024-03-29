import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
              private router: Router) {}


  canLoad():  Observable<boolean>  {
    return this.authService.isAuth()
    .pipe(
      tap( estado => {//dispara un efecto secudario
        if( !estado ) { this.router.navigate(['/login']) }
      }),
      take(1) //-> pra que exista una sola subscripcion o carga
    );
  }


  canActivate():  Observable<boolean>  {
    return this.authService.isAuth()
    .pipe(
      tap( estado => {//dispara un efecto secudario
        if( !estado ) { this.router.navigate(['/login']) }
      })
    );
  }
  
}
