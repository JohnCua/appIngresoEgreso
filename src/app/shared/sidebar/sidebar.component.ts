import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  
  nombre: string = '' ;
  usuarioSubs: Subscription;
  constructor(private authService: AuthService, 
              private router:Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.usuarioSubs = this.store.select('user')
                                  .pipe(
                                    filter( ({user}) => user != null)
                                  )
                                  .subscribe(({user})=> this.nombre = user.nombre);
  }

  ngOnDestroy(): void {
    this.usuarioSubs.unsubscribe();
  }

  logout() {
    this.authService.logout().then(()=> {
      this.router.navigate(['/login'])
    });
  }

}
