import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy} from '@angular/common';

import {ApiService} from './api/api.service';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HelloComponent} from './hello/hello.component';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import {CanvasComponent} from "./canvas/canvas.component";

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/ear2/'},
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
