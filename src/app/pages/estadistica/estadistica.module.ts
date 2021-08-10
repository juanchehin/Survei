import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticaRoutingModule } from './estadistica-routing.module';
import { RangoComponent } from './rango/rango.component';
import { ReporteComponent } from './reporte/reporte.component';
import { MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule, ChartSimpleModule, WavesModule } from 'ng-uikit-pro-standard'
// import { MdbSelectModule } from 'ng-uikit-pro-standard'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DatepickerModule, WavesModule } from 'ng-uikit-pro-standard'


@NgModule({
  declarations: [RangoComponent, ReporteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EstadisticaRoutingModule,
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    ChartsModule,
    ChartSimpleModule,
    WavesModule    
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [MDBSpinningPreloader],
})
export class EstadisticaModule { }
