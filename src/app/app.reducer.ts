import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';

export interface AppState {
   ui: ui.State //-> solo se esta haciendo referencia a la interfaz isLoading: boolean
   user: auth.State
}


export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer
}