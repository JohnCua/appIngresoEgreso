import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import Swal from 'sweetalert2'

import { AuthService } from './../../services/auth.service';


import { AppState } from '../../app.reducer';
import * as ui  from '../../shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;

  uiSubscription: Subscription;

  constructor( private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router
              ) { }

  ngOnInit() {

      this.loginForm = this.fb.group({
          correo: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]]
      })

      this.uiSubscription = this.store.select('ui')
                                      .subscribe( ui => {
                                          this.cargando = ui.isLoading;
                                          console.log('cargando subs');
                                      })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUsuario() {

    if( this.loginForm.invalid) { return; }

    this.store.dispatch( ui.isLoading())

    // Swal.fire({
    //   title: 'Espere por favor!',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })

    const { correo, password } = this.loginForm.value;

    this.authService.loginUsuario(correo, password)
        .then( respuesta => {
          
      
          console.log(respuesta);
          // Swal.close();
          this.store.dispatch( ui.stopLoading())
          this.router.navigate(['/'])

        })
        .catch( err => {
          this.store.dispatch( ui.stopLoading())
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
          })
        } )


  }

}
