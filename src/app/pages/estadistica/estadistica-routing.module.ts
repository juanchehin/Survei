import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RangoComponent } from './rango/rango.component';


const routes: Routes = [
  {
    path:'Estadistica',
    component: RangoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticaRoutingModule { }
