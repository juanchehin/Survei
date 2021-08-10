import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidenciaComponent } from './incidencia/incidencia.component';
import { PrintInicidenciaComponent } from './print-inicidencia/print-inicidencia.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { CrudIncidenciaComponent } from './crud-incidencia/crud-incidencia.component';


const routes: Routes = [
  {
    path: 'Bienvenido',
    component: BienvenidoComponent
  },
  {
    path: 'Incidencia',
    component: IncidenciaComponent
  },
  {
    path: 'Pdf',
    component: PrintInicidenciaComponent
  },
  {
    path: 'lista-incidencia',
    component: CrudIncidenciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidenciasRoutingModule { }
