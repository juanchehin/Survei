import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidenciasRoutingModule } from './incidencias-routing.module';
import { IncidenciaComponent } from './incidencia/incidencia.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipe/pipes.module';
import { MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { AgmCoreModule } from '@agm/core';
import { PrintInicidenciaComponent } from './print-inicidencia/print-inicidencia.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { CrudIncidenciaComponent } from './crud-incidencia/crud-incidencia.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [IncidenciaComponent, PrintInicidenciaComponent, BienvenidoComponent, CrudIncidenciaComponent],
  imports: [
    CommonModule,
    IncidenciasRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    PipesModule,
    NgxPaginationModule,
    // ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
  ],
  providers: [MDBSpinningPreloader],
  schemas: [NO_ERRORS_SCHEMA]
})
export class IncidenciasModule { }
