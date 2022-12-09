import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppSteteWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs: Subscription;
  constructor(private store: Store<AppSteteWithIngreso>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
   this.ingresosSubs =  this.store.select('ingresosEgresos').subscribe( ({items}) => this.ingresosEgresos = [...items]);
  }

  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe();
  }

  borrar(uid:string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
    .then( ()=> Swal.fire('Borrado', 'Item borrado', 'success') )
    .catch( err => Swal.fire('Borrado', err.message, 'error') )
  }

}
