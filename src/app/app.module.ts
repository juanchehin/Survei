
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';

import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { AppRoutingModule } from './app.routes';
import { PagesModule } from './pages/pages.module';
import { PipesModule } from './pipe/pipes.module';
import { SharedModule } from './shared/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { AuthService } from './pages/core/auth.service';
import { AuthGuard } from './pages/core/auth.guard';
import { TokenStorage } from './pages/core/token.storage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './pages/core/app.interceptor';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    AppRoutingModule,
    PagesModule,
    PipesModule,
    SharedModule
  ],
  providers: [
    MDBSpinningPreloader,
  AuthService,
  AuthGuard,
  TokenStorage,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  }
],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
