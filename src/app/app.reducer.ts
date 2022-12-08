import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as  ingresoEgreso  from './ingreso-egreso/ingreso-egreso.reducer';


export interface AppState {
   ui: ui.State //-> solo se esta haciendo referencia a la interfaz isLoading: boolean
   user: auth.State,
   ingresosEgresos: ingresoEgreso.State
}


export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer,
   ingresosEgresos: ingresoEgreso.ingresoEgresoReducer
}