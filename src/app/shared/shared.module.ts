import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from '../app.routes';
import { AppComponent } from '../app.component';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    AppRoutingModule
  ],
  exports: [NavbarComponent],
  providers: [MDBSpinningPreloader],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
