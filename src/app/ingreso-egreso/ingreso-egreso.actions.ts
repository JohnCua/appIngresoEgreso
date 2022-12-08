import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const unSetItems = createAction('[IngresEgreso] unSetItems');

export const setItems = createAction(
    '[IngresEgreso] setItems',
        props<{items: IngresoEgreso[]}>()
    );
