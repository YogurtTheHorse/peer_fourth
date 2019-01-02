import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HelloComponent} from './hello/hello.component';
import { AnotherComponent } from './another/another.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    AnotherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/ear2/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
