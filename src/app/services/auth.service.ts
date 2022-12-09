import { Injectable } from '@angular/core';

import   'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


import { map } from'rxjs/operators';
import { Usuario } from './../models/usuario.model';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: Usuario;

  constructor( public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState> ) { }

    get user() {
      return this._user;
    }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {

      if(fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
          .subscribe( (firestoreUser: any) => {

            const user = Usuario.fromFirebase( firestoreUser );
            this._user = user;
            this.store.dispatch( authActions.setUser({user}) )
          })

      } else {
        this._user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch( authActions.unSetUser());
        this.store.dispatch( ingresoEgresoActions.unSetItems());
      }

    } )
  }

  crearUsuario( nombre:string, email: string, password: string ) {
    return this.auth.createUserWithEmailAndPassword( email, password )
            .then( ({ user}) => {

              const newUser = new Usuario( user.uid, nombre, user.email);

              return this.firestore.doc(`${ user.uid }/usuario`).set({...newUser})

            } )
  }


  loginUsuario( email: string, password: string ) {
    return this.auth.signInWithEmailAndPassword( email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null)
    );
  }

}
