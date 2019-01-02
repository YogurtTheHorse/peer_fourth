import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/ear2/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
