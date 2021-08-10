import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { LoginComponent } from './core/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app.routes';
import { ToastModule, MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from '../app.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PagesComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    SharedModule
  ],
  providers: [MDBSpinningPreloader],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PagesModule { }
