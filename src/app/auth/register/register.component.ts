import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { AuthService } from './../../services/auth.service';


import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup
  cargando: boolean = false;

  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
    this.registroForm =  this.fb.group({
      nombre:   ['',Validators.required],
      correo:   ['',[Validators.required, Validators.email]],
      password: ['',Validators.required],
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

  get nombre() { return this.registroForm.get('nombre'); }

  crearUsuario() {

    if( this.registroForm.invalid ) { return; }

    // Swal.fire({
    //   title: 'Espere por favor!',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // })

    this.store.dispatch( ui.isLoading())

    const { nombre, correo, password } = this.registroForm.value;

    this.authService.crearUsuario(nombre, correo, password)
        .then( credenciales => {
          console.log(credenciales);
          // Swal.close();
          this.store.dispatch( ui.stopLoading())
          this.router.navigate(['/'])
        } )
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
