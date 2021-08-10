/* cSpell:disable */
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './pages/core/login/login.component';
import { AuthGuard } from './pages/core/auth.guard';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },
  {
    path: 'AAC',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children:
      [
        {
          path: 'Incidencia',
          loadChildren: './pages/incidencias/incidencias.module#IncidenciasModule'
        },
        {
          path: 'Datos',
          loadChildren: './pages/estadistica/estadistica.module#EstadisticaModule'
        },
        {
          path: 'Persona',
          loadChildren: './pages/persona/persona.module#PersonaModule'
        },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
