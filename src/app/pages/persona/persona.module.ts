import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaRoutingModule } from './persona-routing.module';
import { UsuarioComponent } from './usuario/usuario.component';
import {MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


@NgModule({
  declarations: [UsuarioComponent],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    FormsModule,
  ],
  providers: [MDBSpinningPreloader],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PersonaModule { }
